import NetworkImage from "@components/Image/NetworkImage";
import useAppSelector from "@hooks/useAppSelector";
import selectProfile from "@store/slices/profiles/selector/selectProfile";
import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { FC, memo } from "react";
import styled from "styled-components";
import UploadImageButton from "../../../../ui/UploadImageButton";

interface Props {}
const AvatarBox = styled.div`
  position: relative;
  box-sizing: border-box;
  height: min(150px + 1svw, 20svw);
  aspect-ratio: 1/1;
  background-color: green;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1rem;
  border: 0.5rem solid ${({ theme }) => theme.backgroundColor};
  z-index: 1;
  box-shadow: ${({ theme }) =>
    neumorphismBoxShadowInset(undefined, {
      background: theme.surfaceColor,
    })};
`;

const ProfileAvatar: FC<Props> = () => {
  const { avatar } = useAppSelector(selectProfile);
  return (
    <AvatarBox>
      <UploadImageButton separateSpace='0.5rem' size='1.5rem' />
      <NetworkImage src={avatar} />
    </AvatarBox>
  );
};

export default memo(ProfileAvatar);
