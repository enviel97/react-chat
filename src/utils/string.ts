import moment from "moment";
import { notEmpty } from "./validate";
interface GetFullNameOptions {
  short?: boolean;
}

const getFullName = (user: User, options?: GetFullNameOptions) => {
  if (user?.profile?.displayName) return user.profile.displayName;
  if (!options?.short) return `${user.lastName} ${user.firstName}`;
  const lastNameModified = user.firstName.split(" ");
  if (lastNameModified.length >= 2) {
    const last = lastNameModified.length - 1;
    return `${lastNameModified[last - 1][0].toUpperCase()}. ${
      lastNameModified[last]
    }`;
  }
  return `${user.firstName[0].toUpperCase()}. ${user.lastName}`;
};

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
  if (typeof object === "string") return object;
  if (!object) throw new Error("Object is empty");
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
