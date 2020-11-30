

import { Pool, QueryResult } from "pg";
import { Request, Response } from 'express';
import connectionPool from '../../pg_init';

const pool = new Pool(connectionPool);

const retrieveUsers = async (_req : Request, res: Response) =>{
    const response : QueryResult<object> = await pool.query('SELECT * FROM USERS');
    response.rows[0] 
        ? res.json({data: response.rows})
        : res.status(404).json({message: 'Users not yet created'});
}

const createUser = async (req : Request, res: Response) =>{
    const { age, email, name } = req.body;
    const response = await pool.query(
        `INSERT INTO users VALUES (age, email, name)
         VALUES ($1, $2, $3)`,
         [age, email, name]
    );
    response.rowCount > 0 
        ? res.status(200).json({
            message: 'User created',
            name
        })
        : res.status(400).json({error: 'Incorrect field, probably'});
}

export {
    retrieveUsers,
    createUser
};

