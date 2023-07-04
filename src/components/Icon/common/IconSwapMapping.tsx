import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons";
import { TbPhone, TbPhoneOff } from "react-icons/tb";

export type IconName = "Answer" | "Reject";

type IconSwapElement = { [key in "on" | "off"]: ReactElement };

export const IconSwapMapping = Object.freeze(
  (props: IconBaseProps) =>
    new Map<IconName, IconSwapElement>([
      [
        "Answer",
        {
          on: <TbPhone size='60%' color='white' />,
          off: <TbPhoneOff size='60%' color='white' />,
        },
      ],
    ])
);
