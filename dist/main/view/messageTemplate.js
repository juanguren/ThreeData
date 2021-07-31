"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMessageLayout = void 0;
const constructMessageLayout = (payload, userData) => {
    const { email: userEmail, first_name, last_name, username } = userData;
    const { department, description, email, name, product, sector, year } = payload[0];
    // ! For each object, return a ul / li construct?
    /*const generatedHTML = payload.forEach((element: any) => {
      console.log(element);
    });*/
    const messageString = `
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
