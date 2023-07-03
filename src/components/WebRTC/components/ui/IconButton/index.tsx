import { IconBase } from "@components/Icon";
import { FC, memo } from "react";
import { IconButtonAnimation } from "./styles/IconButton.animation";
import {
  IconBox,
  IconButtonContainer,
  IconRingWave,
} from "./styles/IconButton.decorate";

const IconButton: FC<IconButtonProps> = ({
  type = "Phone",
  onClick,
  animation,
}) => {
  return (
    <IconButtonContainer
      onClick={onClick}
      role={type}
      $type={type}
      {...IconButtonAnimation.container}
    >
      {animation === "ring" &&
        Array.from({ length: 3 }, (_, index) => (
          <IconRingWave
            key={`RingWave-${index}`}
            custom={index}
            {...IconButtonAnimation.activeWave}
          />
        ))}
      <IconBox {...IconButtonAnimation.iconBox} animate={animation}>
        <IconBase name={type} color='var(--white)' size='55%' />
      </IconBox>
    </IconButtonContainer>
  );
};

export default memo(IconButton);
