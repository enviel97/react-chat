interface ShadowBaseProps {
  color: string;
  x?: number;
  y?: number;
  blur?: number;
}

interface BoxShaddowProps extends ShadowBaseProps {
  spread?: number;
  options?: "inset";
}

export const shaddow = Object.freeze({
  boxShadow: (...configs: BoxShaddowProps[]) => {
    const listShadow = configs.map(
      ({ x = 0, y = 0, spread = 0, blur = 1, options = "", color }) =>
        `${options} ${x}em ${y}em ${blur}em ${spread}em ${color}`.trim()
    );
    return listShadow.join(",");
  },
  dropShadow: (...configs: ShadowBaseProps[]) => {
    const listShadow = configs.map(({ x = 0, y = 0, blur = 0.15, color }) =>
      `drop-shadow(${x}em ${y}em ${blur}em ${color})`.trim()
    );
    return listShadow.join(" ");
  },
  textShadow: (...configs: ShadowBaseProps[]) => {
    const listShadow = configs.map(({ x = 0, y = 0, blur = 1, color }) =>
      `${x}em ${y}em ${blur}em ${color}`.trim()
    );
    return listShadow.join(",");
  },
});
