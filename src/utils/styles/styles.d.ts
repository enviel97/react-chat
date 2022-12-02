type PageProps = Partial<{
  display: "flex";
  justifyContent: "flex-end" | "flex-start" | "center" | "space-between";
  alignItems: "flex-end" | "flex-start" | "center" | "stretch";
  flexDirection: "column" | "row" | "row-reverse" | "column-reverse";
  gap: string;
}>;

type Sized = {
  height: string;
  width: string;
};
