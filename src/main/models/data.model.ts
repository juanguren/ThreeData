
import { Pool } from "pg";
import connectionPool from '../../pg_init';
import { validDataResult } from '../interfaces/entities';

const pool = new Pool(connectionPool);

const saveDataResults = (params: validDataResult) =>{
    const array = Object.values(params);
    return pool.query(`INSERT INTO data_request
     VALUES (year, department, name, description, sector, product, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
     array
     )
}

export default{
    saveDataResults
}