import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  menu,
} from "@nextui-org/react";

import { Outlet, useNavigate } from "react-router-dom";
import { clearCookie } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

export function ResponsiveNavBar() {
  const navigate = useNavigate(); //For redirecting upon success
  const { mutate, isLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      // console.log("Cookie has been cleared");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error deleting the cookie", error);
    },
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: "1", label: "Homepage", url: "/" },
    { id: "2", label: "Pending Dogs", url: "/dogs/pending" },
    { id: "3", label: "Adopted Dogs", url: "/dogs/adopted" },
    { id: "4", label: "Dog Map", url: "/mapbox" },
    { id: "5", label: "Profile", url: "/profile" },
    { id: "6", label: "Add New Dog", url: "/new-dog" },
    { id: "7", label: "Adoption Requests", url: "/adoption-requests/pending" },
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">DOGGY RESCUE</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => {
            return (
              <NavbarItem key={item.id}>
                <Link color="foreground" href={item.url}>
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
          {/* <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem> */}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onClick={mutate}
              disabled={isLoading}
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.url}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </>
  );
}
