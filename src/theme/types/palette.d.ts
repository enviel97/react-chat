type ColorType = "hex" | "palette" | "normal";
type BaseColor = string;

type PaletteColor =
  | "primary"
  | "disable"
  | "error"
  | "secondary"
  | "background"
  | "surface"
  | "tertiary"
  | "notification"
  | "success";

type Color = { normal: string } | { hex: string } | { palette: PaletteColor };
