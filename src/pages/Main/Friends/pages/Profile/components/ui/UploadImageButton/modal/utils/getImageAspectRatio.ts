export const getImageAspectRatio = (type: "avatar" | "banner") => {
  switch (type) {
    case "avatar":
      return "1/1";

    case "banner":
      return "16/9";
  }
};
