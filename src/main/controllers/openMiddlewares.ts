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

const pool = new Pool(connectionPool);
const { APP_TOKEN } = process.env;

const retrieveOpenData = async (
    req : Request,
    res: Response,
    next : NextFunction
) =>{
    try {
        const request = await axios.get(
            'https://www.datos.gov.co/resource/e4mc-qr8v.json?area=Puntos Vive Digital', {
            headers: {
                'X-App-Token': APP_TOKEN
            }
        }).catch((error) => {throw Error(error)});
        const finalData = request.data;
        req.params.data = finalData;
        finalData == "" ? res.status(400).json({"error": "Empty response"}) : next();
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
    saveFoundData
}