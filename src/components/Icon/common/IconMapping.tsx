import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons";
import { BsFillTelephoneForwardFill, BsPersonVideo } from "react-icons/bs";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TbPhone, TbPhoneOff } from "react-icons/tb";

export type IconName =
  | "Allow"
  | "Reject"
  | "Phone"
  | "PhoneOff"
  | "PhoneFill"
  | "Stream";

export const IconMapping = Object.freeze(
  (props: IconBaseProps) =>
    new Map<IconName, ReactElement>([
      ["Allow", <FaCheck {...props} />],
      ["Reject", <FaTimes size='50%' {...props} />],
      ["Phone", <TbPhone size='50%' {...props} />],
      ["PhoneOff", <TbPhoneOff size='50%' {...props} />],
      ["PhoneFill", <BsFillTelephoneForwardFill {...props} />],

      ["Stream", <BsPersonVideo {...props} />],
    ])
);
