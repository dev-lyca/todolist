export type SiteConfig = typeof siteConfig;
import {
  MdOutlineDashboardCustomize,
  MdOutlineTask,
  MdTimer
} from "react-icons/md";

export const siteConfig = {
  name: "TrackTask",
  description: "Stay organized and on top of your tasks with TrackTask.",

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
      href: "/userpage/timer",
      label: "TrackTask Focus",
      icon: MdTimer,
    },
  ],

  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};
