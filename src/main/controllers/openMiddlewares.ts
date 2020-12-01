// https://sendgrid.com/docs/API_Reference/api_getting_started.html

/** Data:
 * - https://datos.gov.co/browse?sortBy=newest&utf8=%E2%9C%93
 * TIC:
 * - https://dev.socrata.com/foundry/www.datos.gov.co/e4mc-qr8v
 * - https://dev.socrata.com/foundry/www.datos.gov.co/4j4m-r8ri
 */
import { Pool, QueryResult } from "pg";
import { Request, Response } from 'express';
import connectionPool from '../../pg_init';
import axios, { AxiosError } from 'axios';

const pool = new Pool(connectionPool);
const { APP_TOKEN } = process.env;

const retrieveOpenData = async (_req : Request, res: Response) =>{
    const request = await axios.get(
        'https://www.datos.gov.co/resource/e4mc-qr8v.json?area=Puntos Vive Digital', {
        headers: {
            'X-App-Token': APP_TOKEN
        }
    })
}

export {
    retrieveOpenData
}