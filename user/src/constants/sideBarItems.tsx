import DessertsIcon from "@mui/icons-material/LocalDrink";
import SessionsIcon from "@mui/icons-material/Apps";

import PublicIcon from "@mui/icons-material/ViewAgenda";
import { ReactNode } from "react";
export type SideBarItem = {
  href: string;
  icon: ReactNode;
  children?: SideBarItem[];
};
export const createSideBarItems: () => SideBarItem[] = () => [
  {
    href: "sessions",
    icon: <SessionsIcon />,
  },

  {
    href: "desserts",
    icon: <DessertsIcon />,
  },

  {
    href: "statistics",
    icon: <PublicIcon />,
  },
];
