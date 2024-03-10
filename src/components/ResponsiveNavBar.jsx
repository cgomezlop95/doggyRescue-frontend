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
  menu,
} from "@nextui-org/react";

import { Outlet, useNavigate } from "react-router-dom";
import { clearCookie } from "../service/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";
import { getNavbar } from "../service/navbar";

//Different nav bar items will appear depending if the user is admin or not
import { useAuth } from "../hooks/useAuth";

export function ResponsiveNavBar() {
  let auth = useAuth();
  const navigate = useNavigate(); //For redirecting upon success
  // const [forceUpdate, setForceUpdate] = useState(false);
  // console.log("forceUpdate", forceUpdate);

  const { mutate, isLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      // setForceUpdate(true); //???
      console.log("Cookie has been cleared");
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

  console.log("auth current user", auth.currentUser);

  // useEffect(() => {
  //   // This will toggle whenever auth.currentUser changes, forcing a re-render
  //   setForceUpdate(f => !f);
  // }, [auth.currentUser]);

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
          {filteredArray.map((item) => {
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
