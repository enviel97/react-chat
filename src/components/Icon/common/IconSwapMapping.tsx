import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons";
import {
  BiCamera,
  BiCameraOff,
  BiCollapse,
  BiExpand,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";

export type IconName = "Audio" | "Camera" | "Screen";
type IconState = "on" | "off";

type IconSwapElement = { [key in IconState]: ReactElement };

export const IconSwapMapping = Object.freeze(
  (props: IconBaseProps) =>
    new Map<IconName, IconSwapElement>([
      [
        "Audio",
        {
          on: <BiMicrophone color='var(--white)' {...props} />,
          off: <BiMicrophoneOff {...props} />,
        },
      ],
      [
        "Camera",
        {
          on: <BiCamera color='var(--white)' {...props} />,
          off: <BiCameraOff {...props} />,
        },
      ],
      [
        "Screen",
        {
          on: <BiExpand color='var(--white)' {...props} />,
          off: <BiCollapse {...props} />,
        },
      ],
    ])
);
