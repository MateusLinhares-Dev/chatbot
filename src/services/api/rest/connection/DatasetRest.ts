import { ExecuteApiError } from "../../../../domain/error/RequestApiSoapError.js";
import { interfaceOidWorkflowForm } from "../../../../dto/interfaceDatasetFormOid.js";
import { env } from "../../../env.js";

export class ConnectRest {
    private ApiKey: string;
    
    constructor(ApiKey: string) {
        this.ApiKey = ApiKey
    }

    async executeApiRest<T>(formData: FormData, idData: string): Promise<interfaceOidWorkflowForm[]> {
        try {
            const urlFormatted = env.urlSesuiteRest.replace("{{idData}}", idData);
            const payload = {
                workflowId: formData.get("workflowId")
            };

            const response = await fetch(urlFormatted, {
                method: 'POST',
                headers: {
                    'Authorization': this.ApiKey,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json() as interfaceOidWorkflowForm[];

            if (!response.ok) {
                throw new ExecuteApiError(
                    `Erro ao recuperar os dados da tabela ${JSON.stringify(result)}`
                );
            }

            return result;
        } catch (error) {
            throw new ExecuteApiError(
                `Error ao consumir a api: ${error}`,
                error as Error
            );
        }
    }
}