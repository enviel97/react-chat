<<<<<<< HEAD
import { IconBase } from "@components/Icon";
=======
// import { IconButtonMap } from "@components/WebRTC/common/icon";
>>>>>>> a7681a0035b73b3bdfd6e24ed029d15fb864b10a
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
<<<<<<< HEAD
        <IconBase name={type} color='var(--white)' size='55%' />
=======
        {/* {IconButtonMap.get(type)?.on} */}
>>>>>>> a7681a0035b73b3bdfd6e24ed029d15fb864b10a
      </IconBox>
    </IconButtonContainer>
  );
};

export default memo(IconButton);
