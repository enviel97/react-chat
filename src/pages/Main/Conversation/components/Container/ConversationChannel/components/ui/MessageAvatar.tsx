import { pxToEm } from "@theme/helper/tools";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { Placeholder } from "@utils/styles";
import { FC } from "react";
interface MessageAvatarProps {
  isShow: boolean;
  src?: string;
  size: number;
}
const MessageAvatar: FC<MessageAvatarProps> = ({ isShow, size, src }) => {
  if (isShow) {
    return <Placeholder height={pxToEm(size)} width={pxToEm(size)} />;
  }

  return <CircleAvatar src={src} size={size} />;
};

export default MessageAvatar;
