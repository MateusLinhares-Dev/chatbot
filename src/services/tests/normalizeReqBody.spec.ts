import { afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import { normalizeRequestBody } from "../user/useNormalizeRequestBody";
import { TimeStampError } from "../../domain/error/TimeStampError";


describe("NormalizeUserReference", () => {
    let contextRequestBody: any;
    let contextRequestBodyNull: any;
    let fakeTimeStamp: string;
    let dateIsoString: string;
    
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date("2025-09-18T12:00:00Z"));

        const dateNow = Date.now()
        fakeTimeStamp = new Date(dateNow).getTime().toString();
        dateIsoString = new Date(dateNow).toISOString()

        contextRequestBody = {
            initiation: fakeTimeStamp,
            planning: fakeTimeStamp,
            name: "John Edward",
            email: "johned@gmail.com"
        }

        contextRequestBodyNull = {
            initiation: undefined,
            planning: undefined,
            name: "John Edward",
            email: "johned@gmail.com"
        }
    })

    afterEach(() => {
        vi.useRealTimers()
    })
    
    it("Test if convertTimeStampForDate will bring data normalize", () => {
        const result = normalizeRequestBody(contextRequestBody)
        expect(result).toEqual({
            initiation: dateIsoString,
            planning: dateIsoString,
            name: "john edward",
            email: "johned@gmail.com"
        })
    })

    it("Test if not timestamp, return exception TimeStampError", () => {
        expect(() => normalizeRequestBody(contextRequestBodyNull)).toThrowError(TimeStampError) 
    })
})