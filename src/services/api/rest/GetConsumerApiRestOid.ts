import { interfaceOidWorkflowForm } from "../../../dto/interfaceDatasetFormOid.js";
import { env } from "../../env.js";
import { ConnectRest } from "./connection/DatasetRest.js";
import { appendToFormData } from "./formDataAppend.js";

export async function WrapperExecuteGetOidForms(workflowId: string) {
    const formData = new FormData();
    appendToFormData(formData, 'workflowId', workflowId)
    
    const connectRestApi = new ConnectRest(env.ApiKey)
    const response: interfaceOidWorkflowForm[] = await connectRestApi.executeApiRest(
        formData,
        'getoidworkflow'
    );

    let workflowOid: string;
    response.forEach(element => {
        workflowOid = element.oidactivitie
    });

    return workflowOid
}