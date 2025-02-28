import DessertsIcon from "@mui/icons-material/LocalDrink";
import SessionsIcon from "@mui/icons-material/Apps";
import Apps from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/ViewAgenda";
import { ReactNode } from "react";

export type SideBarItem = {
  href: string;
  icon: ReactNode;
  children?: SideBarItem[];
  withId: boolean;
};
export const createSideBarItems: () => SideBarItem[] = () => [
  {
    href: "my-organizations",
    icon: <Apps />,
    withId: false,
  },
  {
    href: "sessions",
    icon: <SessionsIcon />,
    withId: true,
  },

  {
    href: "desserts",
    icon: <DessertsIcon />,
    withId: true,
  },

  {
    href: "statistics",
    icon: <PublicIcon />,
    withId: true,
  },
];
