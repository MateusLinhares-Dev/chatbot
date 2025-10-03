import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

export const getNotifyCardFollowUpStart = async (pathFile: string) => {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(path.dirname(__filename))
        const pathDir = path.join(__dirname, 'cards', pathFile)
        console.log(pathDir)
        const fileContent = fs.readFileSync(pathDir, 'utf-8')
        return JSON.parse(fileContent)
}