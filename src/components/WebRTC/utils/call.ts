import { v5 as uuid } from "uuid";
const NAMESPACE = "8b89c6da-e7b2-4b19-89dc-4dd58156979e";
export const genCallId = (receiver: string) => {
  return uuid(receiver, NAMESPACE);
};
