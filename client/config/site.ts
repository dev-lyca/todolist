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
      href: "/projects",
    },
    {
      label: "Categories",
      href: "/team",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
 sideBarItems: [
    {
      label: "Dashboard",
      href: "/",
      icon: MdOutlineDashboardCustomize,
    },
    {
      label: "My Task",
      href: "/tasks",
      icon: MdOutlineTask,
    },
    {
      label: "Task Categories",
      href: "/task-categories",
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
