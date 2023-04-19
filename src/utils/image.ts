import { baseUrlAPI } from "@common/config.define";

export const avatarUrlImage = (avatarId: string) => {
  const url = `${baseUrlAPI}/users/profile/avatar/${avatarId}?size=`;
  return {
    src: `${url}default`,
    srcset: `
     ${url}xl 1534w,
     ${url}lg 1493w,
     ${url}md 1438w,
     ${url}sm 1032w,
     ${url}s 190w
    `,
    sizes: `
      (max-width: 1534px) 100vw, 1534px
    `,
  };
};

export const bannerUrlImage = (bannerId: string) => {
  const url = `${baseUrlAPI}/users/profile/banner/${bannerId}?size=`;
  return {
    src: `${url}default`,
    srcset: `
     ${url}xl 1970w,
     ${url}lg 1670w,
     ${url}md 1365w,
     ${url}sm 994w,
     ${url}s 480w
    `,
    sizes: `
      (max-width: 2400px) 60vw, 1440px
    `,
  };
};
