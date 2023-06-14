import { baseUrlAPI } from "@common/config.define";
type Size = "xl" | "lg" | "md" | "sm" | "s";

const baseUrl = `${baseUrlAPI}/media`;
// imageUrl.avatar(publicId).v
const getImage = (type: "avatar" | "banner" | "normal") => {
  return (publicId: string, size?: Size) => {
    return `${baseUrl}/${type}/${publicId}?size=${size ?? "md"}`;
  };
};

export const imageUrl = Object.freeze({
  avatar: getImage("avatar"),
  banner: getImage("banner"),
  normal: getImage("normal"),
});
