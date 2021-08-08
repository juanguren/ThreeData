import { IData } from "../model/schemas/OpenDataResults/data.type";

const checkForValidEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (email.match(emailRegex)) return true;
  return false;
};

const organizeDataIntoRecords = (dataAPIResult: Array<any>) => {
  const organizedData = dataAPIResult.map((key: any) => {
    return {
      sector: key.sector,
      product: key.product,
      name: key.name,
      year: key.year,
    };
  });

  return organizedData;
};

export { checkForValidEmail, organizeDataIntoRecords };
