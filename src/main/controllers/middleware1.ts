
import { Request, Response } from 'express';

const receiveData = (
    req : Request,
    res: Response
) =>{
    const data = req.params.data;
    data == "10" ? handleData(req, res, data) : res.status(422).send("nope")
}

const handleData = (_req : Request, res: Response, data : string) =>{
    res.json({result: data})
}

export {
    receiveData,
    handleData
};