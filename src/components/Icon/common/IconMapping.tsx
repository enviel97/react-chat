import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons";
import { FaCheck, FaTimes, FaVideo } from "react-icons/fa";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";

export type IconName = "Allow" | "Reject" | "Phone" | "PhoneOff" | "Stream";

export const IconMapping = Object.freeze(
  (props: IconBaseProps) =>
    new Map<IconName, ReactElement>([
      ["Allow", <FaCheck {...props} />],
      ["Reject", <FaTimes size='50%' {...props} />],
      ["Phone", <ImPhone size='50%' {...props} />],
      ["PhoneOff", <ImPhoneHangUp size='50%' {...props} />],
      ["Stream", <FaVideo {...props} />],
    ])
);
