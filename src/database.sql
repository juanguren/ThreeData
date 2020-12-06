CREATE DATABASE typeTest;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    age VARCHAR(3),
    email VARCHAR(20),
    name VARCHAR(30),
    username VARCHAR(20)
    isLogged VARCHAR(5) NOT NULL
);