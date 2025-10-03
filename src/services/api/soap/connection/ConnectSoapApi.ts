import { ExecuteApiError } from "../../../../domain/error/RequestApiSoapError.js"
import { env } from "../../../env.js"


export default class ConnectApiSoap {
    private ApiKey: string

    constructor(ApiKey: string) {
        this.ApiKey = ApiKey
    }

    async executeApiSoap(xml: string, soapAction: string) {
        try {
            const response = await fetch(env.UrlSuite, {
                method: 'POST',
                headers: {
                    'content-type': 'text/xml',
                    'Authorization': this.ApiKey,
                    'SOAPAction': soapAction
                },
                body: xml
            })

            if(!response.ok) {
                throw new ExecuteApiError(`Erro ao registrar os dados na tabela ${response.text}`)
            }

            const result = await response.text()
            return result
        } catch (error) {
            throw new ExecuteApiError(`Error ao consumir a api ${soapAction}`, error as Error)
        }
    }
} 