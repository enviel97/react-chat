export const colorBrightness = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const pxToEm = (px: number) => {
  return `${px / 16}em`;
};

export const neumorphismBoxShadow = (
  reverse?: boolean,
  options?: {
    x?: number;
    spears?: number;
    background?: string;
  }
) => {
  const x = options?.x ?? 8;
  const spears = options?.spears ?? -2;
  const background = options?.background ?? "#121212";

  if (reverse) {
    return (
      `-${x * 0.8}px -${x * 0.8}px ${0.8 * x}px ${spears}px ${colorBrightness(
        background,
        1.5
      )},` +
      `${x}px ${x}px ${0.8 * x}px ${spears}px ${colorBrightness(
        background,
        -50
      )}`
    );
  }
  return (
    `${x}px ${x}px ${0.8 * x}px ${spears}px ${colorBrightness(
      background,
      1.5
    )},` +
    `-${x}px -${x}px ${0.8 * x}px ${spears}px ${colorBrightness(
      background,
      -50
    )}`
  );
};

export const neumorphismBoxShadowInset = (
  reverse?: boolean,
  options?: {
    x?: number;
    background?: string;
  }
) => {
  const background = options?.background ?? "#121212";
  if (reverse) {
    return (
      `inset -8px -8px 12px -2px ${colorBrightness(background, 1.5)},` +
      `inset 8px 8px 12px -2px ${colorBrightness(background, -50)},` +
      `1px 1px 0px ${colorBrightness(background, -100)},` +
      `-1px -1px 0px ${colorBrightness(background, 1.5)},` +
      `0px 12px 10px -10px ${colorBrightness(background, 0.05)}`
    );
  }
  return (
    `inset 8px 8px 12px -2px ${colorBrightness(background, 1.5)},` +
    `inset -8px -8px 12px -2px ${colorBrightness(background, -50)},` +
    `-1px -1px 0px ${colorBrightness(background, -100)},` +
    `1px 1px 0px ${colorBrightness(background, 1.5)},` +
    `0px 12px 10px -10px ${colorBrightness(background, 0.05)}`
  );
};
