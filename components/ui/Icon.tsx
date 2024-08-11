"use client";

import { FC } from "react";
import { IconContext } from "react-icons";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

export const iconNames = ["menu", "close", "location", "keypad"] as const;

export type IconName = (typeof iconNames)[number];

export const iconSizes = ["large", "small"] as const;

export type IconSize = (typeof iconSizes)[number];

export type IconPropTypes = {
  name: IconName | string;
  color?: string;
  size?: IconSize;
  onClick?: any;
  pointer?: boolean;
};

const selectIcon = (
  iconName: IconPropTypes["name"],
  size: IconSize | string
): JSX.Element => {
  switch (iconName) {
    case "sun":
      return <MdOutlineWbSunny />;
    case "moon":
      return <LuMoon />;
    case "close":
      return <MdOutlineClose />;
    case "menu":
      return <HiOutlineMenu />;
    default:
      return <></>;
  }
};

const selectIconSize = (iconSize?: string) => {
  switch (iconSize) {
    case "small":
      return "12px";
    case "large":
      return "50px";
    default:
      return "20px";
  }
};

const IconWrapper = ({ pointer, ...props }: any) => (
  <span style={pointer ? { cursor: "pointer" } : {}} {...props} />
);

const Icon: FC<IconPropTypes> = ({ name, color, size, onClick, pointer }) => (
  <IconContext.Provider
    value={{ color: color || "#fffff", size: selectIconSize(size) }}
  >
    <IconWrapper pointer={pointer} onClick={onClick}>
      {selectIcon(name, selectIconSize(size))}
    </IconWrapper>
  </IconContext.Provider>
);

export default Icon;
