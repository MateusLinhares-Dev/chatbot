import * as path from 'path'
import * as fs from 'fs'

export const getNotifyCardFollowUpStart = async (pathFile: string) => {
        const fileContent = fs.readFileSync(path.join(__dirname, pathFile), 'utf-8')
        return JSON.parse(fileContent)
}