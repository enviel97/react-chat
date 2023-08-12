import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons";
import { FaCheck, FaTimes, FaVideo } from "react-icons/fa";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { AiFillAudio } from "react-icons/ai";
import { HiVideoCamera } from "react-icons/hi2";

export type IconName =
  | "Allow"
  | "Reject"
  | "Phone"
  | "PhoneOff"
  | "Stream"
  | "Audio"
  | "Webcam";

export const IconMapping = Object.freeze(
  (props: IconBaseProps) =>
    new Map<IconName, ReactElement>([
      ["Allow", <FaCheck {...props} />],
      ["Reject", <FaTimes size='50%' {...props} />],
      ["Phone", <ImPhone size='50%' {...props} />],
      ["PhoneOff", <ImPhoneHangUp size='50%' {...props} />],
      ["Stream", <FaVideo {...props} />],
      ["Audio", <AiFillAudio {...props} />],
      ["Webcam", <HiVideoCamera {...props} />],
    ])
);
