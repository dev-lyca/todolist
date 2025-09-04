export type SiteConfig = typeof siteConfig;
import {
  MdFormatListBulleted,
  MdOutlineDashboardCustomize,
  MdOutlineTask,
} from "react-icons/md";

export const siteConfig = {
  name: "TrackTask",
  description: "Stay organized and on top of your tasks with TrackTask.",
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/userpage/dashboard",
    },
    {
      label: "My Tasks",
      href: "/userpage/mytasks",
    },
    {
      label: "Calendar",
      href: "/userpage/calendar",
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
