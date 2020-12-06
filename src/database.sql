CREATE DATABASE typeTest;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    age VARCHAR(3),
    email VARCHAR(20),
    name VARCHAR(30),
    username VARCHAR(20)
    isLogged VARCHAR(5) NOT NULL
);

CREATE TYPE department_list AS ENUM (
    'AMAZONAS',
    'ANTIOQUIA',
    'ARAUCA',
    'ARCHIPIELAGO DE SAN ANDRES',
    'ATLÁNTICO',
    'BOGOTÁ D.C.',
    'BOLIVAR','BOYACÁ',
    'CALDAS',
    'CAQUETA',
    'CASANARE',
    'CAUCA',
    'CESAR',
    'CHOCO',
    'CORDOBA',
    'CUNDINAMARCA',
    'GUAINIA',
    'GUAVIARE',
    'HUILA',
    'LA GUAJIRA',
    'MAGDALENA',
    'META',
    'NARIÑO',
    'NORTE DE SANTANDER',
    'PUTUMAYO',
    'QUINDIO',
    'RISARALDA',
    'SANTANDER',
    'SUCRE',
    'TOLIMA',
    'VALLE DEL CAUCA',
    'VAUPES',
    'VICHADA'
)

CREATE TABLE requested_data(
    id SERIAL PRIMARY KEY,
    year INT,
    department department_list,
    name VARCHAR(20),
    description VARCHAR,
    sector VARCHAR(25) ,
    product VARCHAR(20),
    email TEXT
);