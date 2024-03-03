import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../service/adoptionRequest";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const columnsTest = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    {name: "AGE", uid: "age", sortable: true},
    {name: "TEAM", uid: "team"},
    {name: "EMAIL", uid: "email"},
    {name: "EXPERIENCE", uid: "hasExperience"},
    {name: "KIDS", uid: "hasKids"},
    {name: "GARDEN", uid: "hasGarden"},
    {name: "DESCRIPTION", uid: "adopterDescription"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];

const statusOptions = [
  {name: "Approved", uid: "approved"},
  {name: "Rejected", uid: "rejected"},
  {name: "Pending", uid: "pending"},
];

const users = [
  {
    id: 1,
    name: "Dog Name",
    role: "CEO",
    team: "Management",
    status: "approved",
    age: "29",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Brandlbracke.JPG",
    email: "dog breed",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "rejected",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "pending",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  }
];

export {columns, users, statusOptions};
