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

//Different nav bar items will appear depending if the user is admin or not
import { useAuth } from "../hooks/useAuth";

export function ResponsiveNavBar() {
  let auth = useAuth();
  const navigate = useNavigate(); //For redirecting upon success
  
  const { mutate, isLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      console.log("Cookie has been cleared");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error deleting the cookie", error);
    },
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: "1", label: "Homepage", url: "/", adminRequired: false },
    {
      id: "2",
      label: "Pending Dogs",
      url: "/dogs/pending",
      adminRequired: false,
    },
    {
      id: "3",
      label: "Adopted Dogs",
      url: "/dogs/adopted",
      adminRequired: false,
    },
    { id: "4", label: "Dog Map", url: "/mapbox", adminRequired: false },
    { id: "5", label: "Profile", url: "/profile", adminRequired: false },
    { id: "6", label: "Add New Dog", url: "/new-dog", adminRequired: true },
    {
      id: "7",
      label: "Adoption Requests",
      url: "/adoption-requests/pending",
      adminRequired: true,
    },
  ];

  let filteredArray;

  if (!auth.currentUser || auth.currentUser.isAdmin === false) {
    filteredArray = menuItems.filter((item) => item.adminRequired === false);
  } else {
    filteredArray = menuItems;
  }

  console.log("auth current user", auth.currentUser);

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
