export const DevicesValue = {
  mobile: 320,
  tablet: 640,
  laptop: 1024,
  desktop: 1200,
  tv: 1980,
};
export type Devices = "mobile" | "tablet" | "laptop" | "desktop" | "tv";

export const breakpoint = {
  /**
   * @type Devices: "mobile" | "tablet" | "laptop" | "desktop" | "tv"
   */
  down: (devices: Devices) =>
    `@media only screen and (max-width: ${DevicesValue[devices]}px)`,
  /**
   * type Device: "mobile" | "tablet" | "laptop" | "desktop" | "tv"
   */
  up: (devices: Devices) =>
    `@media only screen and (min-width: ${DevicesValue[devices]}px)`,
};
