interface BoxProps {
  display: "flex" | "inline-block";
  justifyContent: "flex-end" | "flex-start" | "center" | "space-between";
  alignItems: "flex-end" | "flex-start" | "center" | "stretch";
  flexDirection: "column" | "row" | "row-reverse" | "column-reverse";
}

interface InlineProps {
  float: "left" | "right";
}

interface SizingProps {
  gap: string;
  margin: string;
  padding: string;
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
  background: string;
}

type PageProps = Partial<BoxProps & SizingProps>;

type Sized = {
  height: string;
  width: string;
};

type InlineBoxProps = Partial<InlineProps>;

type NameColor =
  | "onPrimary"
  | "onSecondary"
  | "onSurface"
  | "onBackground"
  | "primary"
  | "secondary"
  | "surface"
  | "background";
