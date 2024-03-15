import React, { useEffect, useState } from "react";
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
  ButtonGroup,
} from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import { clearCookie } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useAuth } from "../hooks/useAuth";
import { DoggyRescueLogo } from "../components/DoggyRescueLogo";

export function ResponsiveNavBar() {
  let auth = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error deleting the cookie", error);
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "1",
      label: "Homepage",
      url: "/",
      adminRequired: false,
      authRequired: false,
    },
    {
      id: "2",
      label: "Adopted Dogs",
      url: "/dogs/adopted",
      adminRequired: false,
      authRequired: false,
    },
    {
      id: "3",
      label: "Dog Map",
      url: "/mapbox",
      adminRequired: false,
      authRequired: false,
    },
    {
      id: "4",
      label: "Profile",
      url: "/profile",
      adminRequired: false,
      authRequired: true,
    },
    {
      id: "5",
      label: "Add New Dog",
      url: "/new-dog",
      adminRequired: true,
      authRequired: true,
    },
    {
      id: "6",
      label: "Adoption Requests",
      url: "/adoption-requests",
      adminRequired: true,
      authRequired: true,
    },
  ];

  let filteredArray;

  if (!auth.currentUser) {
    filteredArray = menuItems.filter((item) => item.authRequired === false);
  } else if (auth.currentUser.isAdmin === false) {
    filteredArray = menuItems.filter((item) => item.adminRequired === false);
  } else {
    filteredArray = menuItems;
  }

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <DoggyRescueLogo />
            <p className="ml-2 font-bold text-inherit">DOGGY RESCUE</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {filteredArray.map((item) => {
            return (
              <NavbarItem key={item.id}>
                <Link color="foreground" href={item.url}>
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          {!auth.currentUser && (
            <NavbarItem>
              <ButtonGroup>
                <Button as={Link} color="primary" href="/signup" variant="flat">
                  Sign Up
                </Button>
                <Button as={Link} color="primary" href="/login" variant="flat">
                  Login
                </Button>
              </ButtonGroup>
            </NavbarItem>
          )}
          {auth.currentUser && (
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
          )}
        </NavbarContent>

        <NavbarMenu>
          {filteredArray.map((item, index) => (
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
