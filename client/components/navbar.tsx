"use client";

import { siteConfig } from "@/config/site";
import { useUser } from "@/context/userContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8080/api/auth/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       router.replace("/login");
  //     }
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  // };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="w-full top-0 z-50 shadow-md"
    >
      <NavbarContent justify="end" className="hidden lg:flex">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-1">
              <div>{user?.photo && <Avatar src={user.photo} />}</div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="logout" className="px-2 py-1 text-danger">
                <div className="flex items-center gap-2">
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
