import { MotionProps } from "framer-motion";

export const MenuItemAnimation = new Map<boolean, MotionProps>([
  [true, {}],
  [
    false,
    {
      transition: { opacity: { duration: 0.2 } },
      variants: {
        closed: { opacity: 0, x: 16 },
        open: { opacity: 1, x: 0 },
      },
    },
  ],
]);

export const MenuAnimation = new Map<boolean, MotionProps>([
  [
    true,
    {
      variants: {
        closed: { opacity: 0 },
        open: { opacity: 1 },
      },
    },
  ],
  [
    false,
    {
      variants: {
        closed: { scale: 0 },
        open: {
          scale: 1,
          transition: {
            type: "spring",
            duration: 0.4,
            delayChildren: 0.2,
            staggerChildren: 0.05,
          },
        },
      },
    },
  ],
]);

export const MenuIcon: MotionProps = {
  variants: {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  },
  transition: { duration: 0.2 },
};
