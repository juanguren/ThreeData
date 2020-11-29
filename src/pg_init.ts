
require('dotenv').config();

const { HOST, PORT, PASSWORD } = process.env

const connectionPool = {
    HOST,
    user: 'postgres',
    PASSWORD,
    database: 'typetest',
    PORT
}

export default connectionPool;