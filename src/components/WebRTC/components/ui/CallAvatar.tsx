import { AvatarIconMap } from "@components/WebRTC/common/icon";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { colorBrightness } from "@theme/helper/tools";
import { FC, memo, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
const IconBox = styled.div`
  position: absolute;
  height: fit-content;
  aspect-ratio: 1/1;
  bottom: 0;
  right: 0;
  transform: translate(30%, 30%);
  color: var(--disable-color);
  background-color: ${({ theme }) =>
    colorBrightness(theme.surfaceColor, 5, 0.7)};
  border-radius: 50%;
  border: 2px solid var(--surface-color);
  padding: 0.2em;
`;

const Hint = styled(Tooltip)`
  padding: 0.2em 0.4em;
`;

interface CallAvatarProps {
  type?: "VideoCall" | "PhoneCall";
  src?: string;
}

const CallAvatar: FC<CallAvatarProps> = ({ type = "PhoneCall", src }) => {
  const [hintContent, setHintContent] = useState<string>();

  useEffect(() => {
    if (type === "VideoCall") setHintContent("Video call");
    if (type === "PhoneCall") setHintContent("Phone call");
  }, [type]);

  return (
    <Container>
      <CircleAvatar src={src} viewPort='s' />
      <IconBox>
        {AvatarIconMap.get(type)}
        {hintContent && (
          <Hint anchorSelect={IconBox} content={hintContent} place='bottom' />
        )}
      </IconBox>
    </Container>
  );
};

export default memo(CallAvatar);