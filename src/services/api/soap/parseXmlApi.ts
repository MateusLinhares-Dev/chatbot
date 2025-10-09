import { ExecuteApiError } from "../../../domain/error/RequestApiSoapError.js";
import { parseStringPromise } from "xml2js";

interface SoapFailureDetail {
  status: string | null;
  detailNode: string | null;
}

export async function getSoapFailureDetail(xmlResponse: string): Promise<SoapFailureDetail | null> {
  try {
    const result = await parseStringPromise(xmlResponse, { explicitArray: false });
    const body = result["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"];

    const responseNode = Object.values(body || {})[0] as any;
    const status = responseNode?.Status || null;
    const detail = responseNode?.Detail || null;

    return { status, detailNode: detail };
  } catch (error) {
    throw new ExecuteApiError(`Error in request API: ${error}`, error as Error);
  }
}