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
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Avatar, Button, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data.message);

        router.replace("/login");
      } else {
        const errorData = await res.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (err) {
      console.error("Logout request error:", err);
    }
  };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="w-full top-0 z-50 shadow-md lg:bg-white bg-black"
    >
      <NavbarBrand>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={200}
          className="object-contain"
        />
      </NavbarBrand>

      <NavbarContent justify="end" className="hidden lg:flex">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-1">
              <div>
                {user?.photo && (
                  <Avatar src={user.photo} className="cursor-pointer" />
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="logout" className="px-2 py-1 text-danger">
                <div className="flex items-center gap-2" onClick={handleLogout}>
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle className="text-white" />
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

          <NavbarMenuItem>
            <Button
              onPress={handleLogout}
              className="flex items-center gap-2 text-danger px-2 py-1 w-full"
            >
              <MdLogout className="text-lg" />
              <span>Logout</span>
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
