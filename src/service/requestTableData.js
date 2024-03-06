import React from "react";
const columns = [
  { name: "NAME", uid: "name" },
  { name: "REQUESTER", uid: "requester" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
  { name: "DETAILS", uid: "details" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
];

const requests = [
  {
    OtherPets: "test",
    adopterAge: 1,
    adopterDescription: "test",
    createdAt: "2024-03-02T10:58:54.748Z",
    dailyHoursAway: 1,
    dog: {
      dogName: "Shayna",
      dogPhotoURL:
        "https://res.cloudinary.com/dr4yhkygx/image/upload/v1705522388/bqjb1kn0htcivxmftyqr.jpg",
    },
    dogId: "db7b8bcf-03da-4907-80d6-80af86605003",
    hasExperience: true,
    hasGarden: true,
    hasKids: true,
    hasOtherPets: true,
    monthlyMoney: 1,
    numberOfPeople: 1,
    numberOfTrips: 1,
    requestApproved: null,
    updatedAt: "2024-03-02T10:58:54.748Z",
    user: { email: "test@test.com", firstName: null, lastName: null },
    userId: "98995493-ce41-47ba-8cbf-b9700b9d37ec",
  },
];

export { columns, users, requests };
