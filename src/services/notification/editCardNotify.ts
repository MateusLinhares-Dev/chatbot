import { defaultInterfaceInfoReqNotify } from "../../dto/validation/zodInfoReqNotify";

const mappingRules: Record<string, keyof defaultInterfaceInfoReqNotify> = {
  "${creator.name}": "name",
  "@{variables('numeroSolicitud')}": "numberRequested",
  "@{variables('fechaInializacion')}": "initiation",
  "@{variables('fechaFinalizacion')}": "planning",
  "@{variables('cambioDescripcion')}": "description",
  "@{variables('numeroTarea')}": "numberTask"
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceText(text: string, data: defaultInterfaceInfoReqNotify): string {
  let result = text;
  for (const [placeholder, field] of Object.entries(mappingRules)) {
    if (result.includes(placeholder)) {
       const rx = new RegExp(escapeRegExp(placeholder), 'g');
       result = result.replace(rx, (data[field] ?? '') as string);
    }
  }
  return result;
}

export const editNotificationCard = (card: any, data: defaultInterfaceInfoReqNotify) => {
  const updatedCard = {
    ...card,
    body: card.body.map((element: any) => {
      if (element.type === "TextBlock" && element.text) {
        return { ...element, text: replaceText(element.text, data) };
      }
      if (element.type === "ColumnSet") {
        return {
          ...element,
          columns: element.columns.map((col: any) => ({
            ...col,
            items: col.items.map((item: any) =>
              item.text ? { ...item, text: replaceText(item.text, data) } : item
            ),
          })),
        };
      }
      return element;
    }),
  };
  
  return updatedCard;
};
