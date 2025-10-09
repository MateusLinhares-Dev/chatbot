import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify.js";

function convertTimeStampForDate(timestamp: string): string {
  let date = new Date(Number(timestamp));
  
  if (isNaN(date.getTime())) {
    date = new Date(timestamp.replace(" ", "T"));
  }

  if (isNaN(date.getTime())) {
    throw new Error(`Timestamp inválido: ${timestamp}`);
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
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