import { ReactNode } from "react";
import { TbPhone, TbPhoneOff } from "react-icons/tb";
import { BsPersonVideo, BsFillTelephoneForwardFill } from "react-icons/bs";

export const IconButtonMap = new Map<ButtonType, IconCombo>([
  ["Answer", { on: <TbPhone size='60%' color='white' /> }],
  ["Stop", { on: <TbPhoneOff size='60%' color='white' /> }],
]);

export const AvatarIconMap = new Map<CallType, ReactNode>([
  ["VideoCall", <BsPersonVideo size='0.6em' />],
  ["PhoneCall", <BsFillTelephoneForwardFill size='0.6em' />],
]);
