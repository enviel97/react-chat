import { ReactElement } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type IconName = "Allow" | "Reject";

const LocalIcon = new Map<IconName, ReactElement>([
  ["Allow", <FaCheck />],
  ["Reject", <FaTimes size='50%' />],
]);

export default LocalIcon;
