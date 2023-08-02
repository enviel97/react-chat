import { FC } from "react";
import IconBlocked from "./IconBlocked";
import IconCheck from "./IconCheck";
import IconPending from "./IconPending";
import IconPlus from "./IconPlus";

type IconRelationShipMap = { [key in Relationship]: FC };

export const IconRelationShip: IconRelationShipMap = Object.freeze({
  guest: () => <IconPlus />,
  friend: () => <IconCheck />,
  pending: () => <IconPending />,
  block: () => <IconBlocked />,
});
