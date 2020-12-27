"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageLayout = void 0;
const constructMessageLayout = (payload) => {
    const { department, description, email, name, product, sector, year } = payload;
    const messageString = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Document</title>
    </head>
    <body>
        <h2>Company: ${name}</h2>
        <p>${description}</p>
        <ul> 
            <li><b>Product:</b> ${product}</li>
            <li><b>Sector:</b> ${sector}</li>
            <li><b>Year:</b> ${year}</li>
            <li><b>Department:</b> ${department}</li>
            <li><b>Email:</b> ${email}</li>
        </ul>
    </body>
    </html>`;
    return messageString;
};
exports.constructMessageLayout = constructMessageLayout;
