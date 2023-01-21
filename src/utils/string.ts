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

const classList = (...className: any[]) => {
  return className.filter(notEmpty<string>).join(" ");
};

const getId = (object?: any) => {
  if (!object) throw Error("Object is empty");
  if (typeof object === "string") return object;
  return (object.id ?? object._id).toString();
};

const toCapitalize = (str: string) => {
  const [first, other] = [str[0], str.slice(1)];
  return first.toUpperCase() + other;
};

const string = {
  getFullName,
  chatFromNow,
  typeOf,
  classList,
  getId,
  toCapitalize,
};

export default string;
