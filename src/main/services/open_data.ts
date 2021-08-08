import axios, { AxiosResponse } from "axios";
import { validDataResult } from "../interfaces/entities";

const retrieveOpenData = async (
  year: string,
  department: string,
  xToken: string | undefined,
  limit = 3
) => {
  try {
    const request: AxiosResponse = await axios.get(
      `https://www.datos.gov.co/resource/rggv-qcwf.json?a_o=${year}&departamento=${department}`,
      {
        headers: {
          "X-App-Token": xToken,
        },
      }
    );
    const response = request.data;
    if (response.length === 0) throw "Empty Data response.";
    const arrangedData = response
      .slice(0, limit)
      .map((all: any): validDataResult => {
        return {
          department: all.departamento,
          description: all.descripci_n,
          email: all.correo_electronico,
          name: all.raz_n_social,
          product: all.producto_principal,
          sector: all.sector,
          year: all.a_o,
        };
      });
    return arrangedData;
  } catch (error) {
    return error;
  }
};

export default retrieveOpenData;
