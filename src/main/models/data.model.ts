
import { Pool } from "pg";
import connectionPool from '../../pg_init';
import { validDataResult } from '../interfaces/entities';

const pool = new Pool(connectionPool);

const toArray = (data : validDataResult) => {
    return Object.values(data);
}

const saveDataResults = (params: validDataResult) =>{
    const array = toArray(params);
    return pool.query(`INSERT INTO data_request
     VALUES (year, department, name, description, sector, product, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
     array
    );
}

const retrieveData = () =>{
    //const array = toArray();
    return pool.query(`SELECT * from data_request
     RETURNING *`
    );
}

export default{
    saveDataResults,
    retrieveData
}