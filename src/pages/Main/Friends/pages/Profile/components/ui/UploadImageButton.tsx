import { motion } from "framer-motion";
import { FC, memo } from "react";
import { TbPhotoUp } from "react-icons/tb";
import styled, { css } from "styled-components";

interface Props {
  onSelectImage?: (image: any) => void;
  separateSpace?: string;
  size?: string;
}

interface ContainerProps {
  $separateSpace?: string;
}

const ButtonContainer = styled(motion.div)<ContainerProps>`
  position: absolute;

  z-index: 2;
  cursor: pointer;
  opacity: 0.5;

  ${({ $separateSpace }) => {
    const space = $separateSpace ?? "2rem";
    return css`
      right: ${space};
      bottom: ${space};
    `;
  }}
`;

const UploadImageButton: FC<Props> = ({
  onSelectImage,
  separateSpace,
  size = "2rem",
}) => {
  const handleUploadThumbnail = (image: any) => {
    console.error("TODO: Implement handle thumbnail");
    onSelectImage && onSelectImage(image);
  };

  return (
    <ButtonContainer
      $separateSpace={separateSpace}
      whileHover={{ scale: 1.2, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleUploadThumbnail}
    >
      <TbPhotoUp size={size} />
    </ButtonContainer>
  );
};

export default memo(UploadImageButton);
