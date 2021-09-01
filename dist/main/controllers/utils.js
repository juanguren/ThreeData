"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validDepartments = exports.userNotFoundHandler = exports.organizeDataIntoRecords = exports.checkForValidEmail = void 0;
const checkForValidEmail = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (email.match(emailRegex))
        return true;
    return false;
};
exports.checkForValidEmail = checkForValidEmail;
const organizeDataIntoRecords = (dataAPIResult) => {
    const organizedData = dataAPIResult.map((key) => {
        return {
            sector: key.sector,
            product: key.product,
            name: key.name,
            year: key.year,
        };
    });
    return organizedData;
};
exports.organizeDataIntoRecords = organizeDataIntoRecords;
const userNotFoundHandler = (username) => {
    return {
        message: 'User not found',
        username,
    };
};
exports.userNotFoundHandler = userNotFoundHandler;
const validDepartments = [
    'AMAZONAS',
    'ANTIOQUIA',
    'ARAUCA',
    'ARCHIPIELAGO DE SAN ANDRES',
    'ATLÁNTICO',
    'BOGOTÁ D.C.',
    'BOLIVAR',
    'BOYACÁ',
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
    'VICHADA',
];
exports.validDepartments = validDepartments;
