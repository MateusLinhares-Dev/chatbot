import { TypeBodyDataset } from "../../../dto/interfaceFormDataRestApi.js";

export function appendToFormData(formData: FormData, key: TypeBodyDataset, value: string) {
    formData.append(key, value)
};