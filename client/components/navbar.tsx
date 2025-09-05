"use client";

import { useUser } from "@/context/userContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
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
      className="w-full top-0 z-50 shadow-md bg-white"
    >
      {/* <NavbarBrand className="block sm:hidden">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={200}
          className="object-contain"
        />
      </NavbarBrand> */}

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-1">
              <div>
                <Avatar
                  src={user?.photo || undefined}
                  className="cursor-pointer"
                >
                  {!user?.photo && (
                    <span className="text-sm font-semibold">
                      {user?.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : "?"}
                    </span>
                  )}
                </Avatar>
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
    </HeroUINavbar>
  );
};
