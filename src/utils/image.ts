import { baseUrlAPI } from "@common/config.define";
export const imageSize = ["xl", "lg", "md", "sm", "s"];

export const avatarUrlImage = (avatarId: string) => {
  const url = `${baseUrlAPI}/users/profile/avatar/${avatarId}?size=`;
  const srcSet = {
    s: `${url}s`, // 190w
    sm: `${url}sm`, // 1032w
    md: `${url}md`, // 1438w
    lg: `${url}lg`, // 1493w
    xl: `${url}xl`, // 1534w
  };
  return {
    src: `${url}default`,
    srcset: srcSet,
    sizes: `(max-width: 1534px) 100vw, 1534px`,
  };
};

export const bannerUrlImage = (bannerId: string) => {
  const url = `${baseUrlAPI}/users/profile/banner/${bannerId}?size=`;
  const srcSet = {
    s: `${url}s`, //480w
    sm: `${url}sm`, //994w
    md: `${url}md`, //1365w
    lg: `${url}lg`, //1670w
    xl: `${url}xl`, //1970w
  };
  return {
    src: `${url}default`,
    srcset: srcSet,
    sizes: `(max-width: 2400px) 60vw, 1440px `,
  };
};
