export const DevicesValue = {
  mobile: 450,
  tablet: 800,
  laptop: 1500,
  desktop: 1980,
  tv: 2560,
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
