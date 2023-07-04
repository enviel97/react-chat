<<<<<<< HEAD
import Icon from "@components/Icon/components/Icon";
import { AvatarIconMap } from "@components/WebRTC/common/icon";
=======
// import { AvatarIconMap } from "@components/WebRTC/common/icon";
>>>>>>> a7681a0035b73b3bdfd6e24ed029d15fb864b10a
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
  type: CallType;
  src?: string;
}

const CallAvatar: FC<CallAvatarProps> = ({ type, src }) => {
  const [hintContent, setHintContent] = useState<string>();

  useEffect(() => {
    if (type === "VideoCall") setHintContent("Video call");
    if (type === "PhoneCall") setHintContent("Phone call");
  }, [type]);

  return (
    <Container>
      <CircleAvatar src={src} viewPort='s' />
      <IconBox>
<<<<<<< HEAD
        <Icon
          name={type === "VideoCall" ? "Stream" : "PhoneFill"}
          size={"0.6em"}
        />
=======
        {/* {AvatarIconMap.get(type)} */}
>>>>>>> a7681a0035b73b3bdfd6e24ed029d15fb864b10a
        {hintContent && (
          <Hint anchorSelect={IconBox} content={hintContent} place='bottom' />
        )}
      </IconBox>
    </Container>
  );
};

export default memo(CallAvatar);
