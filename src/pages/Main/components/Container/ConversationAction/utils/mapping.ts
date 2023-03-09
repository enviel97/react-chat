import string from "@utils/string";

export const mappingUsers = (users: User[]) => {
  return users.map((u) => string.getId(u)).join(",");
};
