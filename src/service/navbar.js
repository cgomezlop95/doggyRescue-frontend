export const getNavbar = () => {
  return [
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
};

