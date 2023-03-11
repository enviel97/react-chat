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

const getId = (object?: any): string => {
  if (!object) throw Error("Object is empty");
  if (typeof object === "string") return object;
  return (object.id ?? object._id).toString();
};

const genId = (prefix?: string) => {
  const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  return `${prefix ?? ""}${dateStr}-${randomStr}`;
};

const toCapitalize = (str: string) => {
  const [first, other] = [str[0], str.slice(1)];
  return first.toUpperCase() + other;
};

const toClassName = (component: any) => component.toString().substring(1);

const string = {
  getFullName,
  chatFromNow,
  typeOf,
  classList,
  getId,
  toCapitalize,
  genId,
  toClassName,
};

export default string;
