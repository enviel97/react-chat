import { baseUrlAPI } from "@common/config.define";
export const imageSize = ["xl", "lg", "md", "sm", "s"];
const avatarSrcSet = ["1534w", "1493w", "1438w", "1032w", "190w"];
const bannerSrcSet = ["1970w", "1670w", "1365w", "994w", "480w"];

export const avatarUrlImage = (avatarId: string) => {
  const url = `${baseUrlAPI}/users/profile/avatar/${avatarId}?size=`;
  const srcSet = avatarSrcSet
    .map((size, index) => `${url}${imageSize[index]} ${size}`)
    .join(",");
  return {
    src: `${url}default`,
    srcset: srcSet,
    sizes: `(max-width: 1534px) 100vw, 1534px`,
  };
};

export const bannerUrlImage = (bannerId: string) => {
  const url = `${baseUrlAPI}/users/profile/banner/${bannerId}?size=`;
  const srcSet = bannerSrcSet
    .map((size, index) => `${url}${imageSize[index]} ${size}`)
    .join(",");
  return {
    src: `${url}default`,
    srcset: srcSet,
    sizes: `(max-width: 2400px) 60vw, 1440px `,
  };
};
