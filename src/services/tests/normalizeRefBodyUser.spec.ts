import { beforeEach, describe, expect, it } from "vitest";
import { normalizeReferenceBody } from "../user/useNormalizeReferenceUser";
import { UserDataError } from "../../domain/error/UserError";

describe("NormalizeReqReference", () => {
    let contextReferenceUser: any;
    let contextReferenceUndefined: any;

    beforeEach(() => {
        contextReferenceUser = { UserProfile: {
            name: " JOHN EDWARD ",
            email: " john@gmail.com "
        }}

        contextReferenceUndefined = {
            name: undefined,
            email: undefined
        }
    })

    it("Verify if normalize return data correct!", () => {
        const result = normalizeReferenceBody(contextReferenceUser)
        console.log(result)
        expect(result).toEqual({ UserProfile: {
            name: "john edward",
            email: "john@gmail.com"
        }})
    })

    it("If the user does not have an email or name in the body, an exception is returned.", () => {
        expect(() => normalizeReferenceBody(contextReferenceUndefined))
            .toThrowError(UserDataError)
    })
})