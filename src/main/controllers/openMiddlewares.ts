
import { Request, Response, NextFunction } from 'express';
import connectionPool from '../../pg_init';
import axios, { AxiosResponse } from 'axios';
import { validDataResult } from '../interfaces/entities';
import dataModel from '../models/data.model';
import sendGrid from '@sendgrid/mail';
import {
    constructMessageLayout
} from '../view/messageTemplate';

const validateParams = async (
    req : Request,
    res: Response,
    next : NextFunction
) =>{
    const { año, departamento } = req.body;
    const validParams = [
        'año',
        'departamento',
    ]
    año && departamento ? next() : res.status(422).json({message: 'Error, missing param', validParams});
}

const retrieveOpenData = async (
    req : Request,
    res: Response,
    next : NextFunction
) =>{
    try {
        const { APP_TOKEN } = process.env;
        const { año: year, departamento: dpto } = req.body;
        
        const request : AxiosResponse = await axios.get(
            `https://www.datos.gov.co/resource/rggv-qcwf.json?a_o=${year}&departamento=${dpto}`, {
            headers: {
                'X-App-Token': APP_TOKEN
            }
        }).catch((error) => {throw Error(error)});
        const finalData = request.data;
        const mappedData = finalData.map((all : any) : validDataResult => {
            return {
                department: all.departamento,
                description: all.descripci_n,
                email: all.correo_electronico,
                name: all.raz_n_social,
                product: all.producto_principal,
                sector: all.sector,
                year: all.a_o
            }
        });
        finalData == ""
         ? res.status(400).json({"message": "Empty response"})
         : saveFoundData(req, res, mappedData);
    } catch (error) {
        res.status(404).json(error);
    }
}

const saveFoundData = async (
    req : Request,
    res: Response,
    data: any
) =>{
    try {
        data.map((fields: any) =>{
            const { year, department, name, description, sector, product, email } = fields;
            dataModel.saveDataResults({ year, department, name, description, sector, product, email })
        });
        res.status(201).json({message: "Row created succesfully"});
    } catch (error) {
        res.status(404).json({ message: "Error uploading information", error });
    }
}

const retrieveSavedData  = async (
    req : Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const dataResult = await dataModel.retrieveData();
        if (dataResult.rows[0]) {
            req.params.dataToSend = dataResult.rows[0];
            next();
        }
    } catch (error) {
        res.status(404).json({message: "No data was found", error});
    }
}

const sendMessageWithData  = (
    req : Request,
    res: Response,
    next: NextFunction
) => {
    const { PERSONAL_EMAIL, EDU_EMAIL } = process.env;
    const sendGridAPI : string = process.env.SEND_API!;
    sendGrid.setApiKey(sendGridAPI);
    const messageBody : any = {
        "to": PERSONAL_EMAIL,
        "from": EDU_EMAIL,
        "subject": "HEY!"
    }
    const messageLayout = constructMessageLayout(req.body);
    messageBody.html = messageLayout;
    try {
        if (req.body) {
            (async () => {
                try {
                  const messageResponse = await sendGrid.send(messageBody);
                  const code = messageResponse[0].statusCode;
                  code === 202 
                    ? res.status(code).json({Message: `Email succesfully sent to *${messageBody.to}*`})
                    : res.status(404).json({Error: "Message failed"});
                } catch (error) {
                  console.error(error);
                  if (error.response) {
                    const error_message = error.response.body.errors;
                    return res.status(error.code).json(error_message);
                  }
                }
            })();
        } else{
            res.status(422).json({Message: "Unprocessable payload. Please check all values are complete"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    retrieveOpenData,
    saveFoundData,
    validateParams,
    retrieveSavedData,
    sendMessageWithData
}