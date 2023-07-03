import { FC, useMemo } from "react";
import { IconMapping, IconName } from "../common/IconMapping";

interface IconProps {
  name: IconName;
  size?: string;
  color?: string;
}

const Icon: FC<IconProps> = Object.freeze(({ name, size, color }) => {
  const IconProvider = useMemo(
    () => IconMapping({ size, color }).get(name),
    [name, size, color]
  );
  if (!IconProvider) return <></>;
  return IconProvider;
});

export default Icon;
