// https://sendgrid.com/docs/API_Reference/api_getting_started.html

/** Data:
 * - https://datos.gov.co/browse?sortBy=newest&utf8=%E2%9C%93
 * TIC:
 * - https://dev.socrata.com/foundry/www.datos.gov.co/e4mc-qr8v
 * - https://dev.socrata.com/foundry/www.datos.gov.co/4j4m-r8ri
 */
import { Pool, QueryResult } from "pg";
import { Request, Response, NextFunction } from 'express';
import connectionPool from '../../pg_init';
import axios from 'axios';
import { validResult } from '../interfaces/entities';

const pool = new Pool(connectionPool);
const { APP_TOKEN } = process.env;

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
        const { año: year, departamento: dpto } = req.body;
        
        let ñ = '%C3%91'; // Letter ñ is actually recongnized by Node
        const request = await axios.get(
            `https://www.datos.gov.co/resource/rggv-qcwf.json?a_o=${year}&departamento=${dpto}`, {
            headers: {
                'X-App-Token': APP_TOKEN
            }
        }).catch((error) => {throw Error(error)});
        const finalData = request.data;
        const mappedData = finalData.map((all : any) : validResult => {
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
        req.params.data = mappedData;
        finalData == "" ? res.status(400).json({"message": "Empty response"}) : next();
    } catch (error) {
        res.status(404).json(error);
    }
}

const saveFoundData = async (
    req : Request,
    res: Response
) =>{
    const dataToSave = req.params.data;
}

export {
    retrieveOpenData,
    saveFoundData,
    validateParams
}