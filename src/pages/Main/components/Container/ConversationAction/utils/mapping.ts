export const mappingUsers = (users: User[]) => {
  return users.map((u) => u.email).join(",");
};
