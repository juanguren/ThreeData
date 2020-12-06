
import { Pool } from "pg";
import connectionPool from '../../pg_init';

const pool = new Pool(connectionPool);

interface userEntity {
    age: String;
    email: String;
    name: String;
    username: String;
    isLogged?: Boolean;
}

const getUser = () =>{
    return pool.query('SELECT * FROM USERS');
}

const createUser = (params: userEntity) =>{
    const array = Object.values(params);
    return pool.query(
        `INSERT INTO users VALUES (age, email, name, username)
         VALUES ($1, $2, $3, $4) RETURNING *`,
         array);
}

export default {
    getUser,
    createUser
}