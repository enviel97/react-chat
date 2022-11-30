import moment from "moment";
import { notEmpty } from "./validate";

const getFullName = (user: User) => `${user.lastName} ${user.firstName}`;

const chatFromNow = (dateTime?: string | Date) => {
  if (!dateTime) return "";
  return moment(dateTime).fromNow(true);
};

const typeOf = (object: any) => {
  return typeof object === "string";
};

const classList = (...className: string[]) => {
  return className.filter(notEmpty).join(" ");
};

const getId = (object: Identity) => {
  return (object.id ?? object._id).toString();
};

const string = { getFullName, chatFromNow, typeOf, classList, getId };

export default string;
