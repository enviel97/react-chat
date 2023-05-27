import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { pxToEm } from "@theme/helper/tools";
import { Placeholder } from "@utils/styles";
import { FC } from "react";
interface MessageAvatarProps {
  isShow: boolean;
  src?: string;
}
const MessageAvatar: FC<MessageAvatarProps> = ({ isShow, src }) => {
  const size = 36;
  if (!isShow) {
    return <Placeholder height={pxToEm(size)} width={pxToEm(size)} />;
  }

  return <CircleAvatar src={src} size={size} />;
};

export default MessageAvatar;
