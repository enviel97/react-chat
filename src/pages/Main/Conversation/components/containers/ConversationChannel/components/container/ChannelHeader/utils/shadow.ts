import { shaddow } from "@theme/helper/styles";

export const ButtonActionShadow = (main: string, options?: "inset") => {
  const dark = {
    options,
    brightness: -20,
    blur: 0.1,
    spread: -0.05,
    x: 0.1,
    y: 0.1,
  };
  const light = {
    options,
    brightness: 20,
    blur: 0.1,
    spread: -0.05,
    x: -0.1,
    y: -0.1,
  };

  return shaddow.boxShadow(
    { ...light, color: main },
    { ...light, color: main },
    { ...dark, color: main },
    { ...dark, color: main }
  );
};
