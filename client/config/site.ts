export type SiteConfig = typeof siteConfig;
import {
  MdFormatListBulleted,
  MdOutlineDashboardCustomize,
  MdOutlineTask,
} from "react-icons/md";

export const siteConfig = {
  name: "To-Do List",
  description: "Be organized using this website",
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "My Tasks",
      href: "/mytasks",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
 sideBarItems: [
    {
      label: "Dashboard",
      href: "/userpage/dashboard",
      icon: MdOutlineDashboardCustomize,
    },
    {
      label: "My Task",
      href: "/userpage/mytasks",
      icon: MdOutlineTask,
    },
    {
      label: "Calendar",
      href: "/userpage/calendar",
      icon: MdFormatListBulleted,
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
