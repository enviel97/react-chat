import crypto from "crypto";
const HashList = new Map<any, string>();

const hashKey = (payload: any) => {
  if (HashList.has(payload)) return `${HashList.get(payload)!}`;
  const hash = crypto.createHash("sha1").update(payload).digest("base64");
  HashList.set(payload, hash);
  return hash;
};
export default hashKey;
