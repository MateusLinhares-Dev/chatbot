import { fileURLToPath } from "url"
import { env } from "../../env.js"
import ConnectApiSoap from "./connection/ConnectSoapApi.js"
import fs from "fs"
import path from "path"

export const apiEntityRecord = async (idWorkflow: string, workflowOid: string): Promise<void> => {
    const connectSoap = new ConnectApiSoap(env.ApiKey)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(path.dirname(path.dirname(path.dirname(path.dirname(__filename)))))
    const pathDir = path.join(__dirname, "xml", "entityRecord.xml")

    let xml = fs.readFileSync(pathDir, "utf-8")
    xml = xml.replace("{{WORKFLOW_ID}}", idWorkflow)
            .replace("{{workflowOid}}", workflowOid)

    const response = await connectSoap.executeApiSoap(xml, "urn:workflow#editEntityRecord")
    
    console.log(response)
}