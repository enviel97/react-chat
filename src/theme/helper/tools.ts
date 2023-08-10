import { css, DefaultTheme } from "styled-components";

export const colorBrightness = (
  color: string,
  percent: number,
  opacity?: number
) => {
  const _opacity = opacity
    ? Math.round(Math.min(Math.max(opacity, 0), 1) * 255)
        .toString(16)
        .toUpperCase()
    : "";
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
      .slice(1) +
    _opacity
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

export const colorTheme = ({
  color,
  theme,
}: {
  color?: NameColor | string;
  theme: DefaultTheme;
}) => {
  if (!color) return theme.backgroundColor;
  if (color[0] === "#" || color === "transparent") {
    return color;
  }
  const nameColor = color as NameColor;
  const themeColor = theme[`${nameColor}Color`];

  return !themeColor ? color : themeColor;
};

export const clampSize = ({
  minWidth,
  maxWidth,
  minFontSize,
  maxFontSize,
}: ClampProps) => {
  const root = document.querySelector("html");
  if (!root) return;
  const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

  const minW = minWidth / pixelsPerRem;
  const maxW = maxWidth / pixelsPerRem;

  const slope = (maxFontSize - minFontSize) / (maxW - minW);
  const yAxisIntersection = -minW * slope + minFontSize;

  return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }svw, ${maxFontSize}rem )`;
};
type Filter = {
  blur?: string;
  brightness?: string;
  contrast?: string;
  grayscale?: string;
  hueRotate?: string;
  invert?: string;
  opacity?: string;
  saturate?: string;
  sepia?: string;
};
export const imageFilter = (props?: Filter) => {
  const {
    blur,
    brightness,
    contrast,
    grayscale,
    hueRotate,
    invert,
    opacity,
    saturate,
    sepia,
  } = props || {
    blur: "0.2px",
    brightness: "104%",
    contrast: "90%",
    grayscale: "10%",
    hueRotate: "0deg",
    invert: "0%",
    opacity: "100%",
    saturate: "110%",
    sepia: "5%",
  };

  return `blur(${blur}) brightness(${brightness}) contrast(${contrast}) grayscale(${grayscale})
      hue-rotate(${hueRotate}) invert(${invert}) opacity(${opacity}) saturate(${saturate}) sepia(${sepia})`;
};

export const textMaxLine = (
  maxLines: number,
  textOverflow?: "ellipsis" | "clip" | string
) => {
  return css`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ${textOverflow ?? "ellipsis"};
    line-clamp: ${maxLines};
    -webkit-line-clamp: ${maxLines}; /* number of lines to show */
    -webkit-box-orient: vertical;
  `;
};
