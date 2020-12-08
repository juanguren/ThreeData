

import { Pool, QueryResult } from "pg";
import { Request, Response } from 'express';
import connectionPool from '../../pg_init';
import userModel from '../models/user.model';

const pool = new Pool(connectionPool);

const retrieveUsers = async (_req : Request, res: Response) =>{
    const response : QueryResult<object> = await userModel.getUser();
    response.rows[0] 
        ? res.json({data: response.rows})
        : res.status(404).json({message: 'Users not yet created'});
}

const createUser = async (req : Request, res: Response) =>{
    try {
        const { age, email, name, username, isLogged } = req.body;
        await userModel.createUser({ age, email, name, username, isLogged  });
        
        res.status(200).json({
            message: 'User created',
            name
        })
    } catch (error) {
        res.status(400).json({error: 'Incorrect field, probably'});
    }
}

export {
    retrieveUsers,
    createUser
};

