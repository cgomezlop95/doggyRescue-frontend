import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { getMyRequests } from "../service/adoptionRequest";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EyeIcon } from "../components/EyeIcon";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

const statusColorMap = {
  true: "success",
  false: "danger",
  null: "warning",
};

const columns = [
  { name: "DOG", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "DETAILS", uid: "details" },
];

export const MyAdoptionRequests = () => {
  let auth = useAuth();
  const userId = auth.currentUser.id;
  const { data: myRequestData, isLoading } = useQuery({
    queryKey: ["myRequests", userId],
    queryFn: () => getMyRequests(userId),
  });

  const renderCell = React.useCallback((request, columnKey) => {
    const cellValue = request[columnKey];
    const requestId = request.userId + "_" + request.dogId;
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: request.dog.dogPhotoURL }}
            description={request.dog.dogName + " - " + request.dog.dogBreed}
            name={cellValue}
          >
            {request.user.email}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[request.requestApproved]}
            size="sm"
            variant="flat"
          >
            {request.requestApproved !== null
              ? request.requestApproved
                ? "Approved"
                : "Rejected"
              : "Pending"}
          </Chip>
        );
      case "details":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link to={`/my-adoption-request/${requestId.toString()}`}>
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={myRequestData.adoptionRequests}>
        {(item) => (
          <TableRow key={item.userId + "_" + item.dogId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
