import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { normalizeRequestBody } from "../user/useNormalizeRequestBody.js";

describe("NormalizeUserReference with custom date format", () => {
  let contextRequestBody: any;
  let contextRequestBodyNull: any;
  let fakeTimeStamp: string;
  let formattedDate: string;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-09-18T12:00:00Z")); // Fixa a data/hora

    const dateNow = Date.now();
    fakeTimeStamp = new Date(dateNow).getTime().toString();

    const d = new Date(dateNow);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    contextRequestBody = {
      initiation: fakeTimeStamp,
      planning: fakeTimeStamp,
      name: "John Edward",
      email: "johned@gmail.com",
    };

    contextRequestBodyNull = {
      initiation: undefined,
      planning: undefined,
      name: "John Edward",
      email: "johned@gmail.com",
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should normalize request body with formatted timestamp", () => {
    const result = normalizeRequestBody(contextRequestBody);

    expect(result).toEqual({
      initiation: formattedDate,
      planning: formattedDate,
      name: "john edward",
      email: "johned@gmail.com",
    });
  });

  it("should throw error if timestamp is invalid", () => {
    expect(() => normalizeRequestBody(contextRequestBodyNull)).toThrowError(
      "Timestamp inválido"
    );
  });
});