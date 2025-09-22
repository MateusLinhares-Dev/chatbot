import { TimeStampError } from "../../domain/error/TimeStampError";
import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify";

function convertTimeStampForDate(timestamp: string): string {
  const date = new Date(Number(timestamp));

  if (isNaN(date.getTime())) {
    throw new TimeStampError(`Timestamp inválido: ${timestamp}`);
  }

  return date.toISOString();
}

export function normalizeRequestBody(
  req: defaultInterfaceInfoReqNotify
): defaultInterfaceInfoReqNotify {

  return {
    ...req,
    initiation: convertTimeStampForDate(req.initiation),
    planning: convertTimeStampForDate(req.planning),
    name: req.name.trim().toLowerCase().replace(/\s+/g, " "),
    email: req.email.trim().toLowerCase(),
  };
}