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
import { EditIcon } from "../components/EditIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { EyeIcon } from "../components/EyeIcon";
import { columns, requests } from "../service/requestTableData";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "../service/adoptionRequest";
import { Link } from "react-router-dom";

const statusColorMap = {
  active: "success",
  paused: "danger",
  null: "warning",
};

export function RequestAdminTable() {
  const { data: requestData, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRequests,
  });

  console.log(requestData);

  const renderCell = React.useCallback((request, columnKey) => {
    const cellValue = request[columnKey];
    const requestId = request.userId + "_" + request.dogId;
    console.log(requestId);
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
      case "requester":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {request.user.firstName +
                " " +
                request.user.lastName +
                " - " +
                request.user.email}
            </p>
            <p>{request.adopterAge}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[request.requestApproved]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "details":
        return (
          <Link
            key={requestId}
            to={`/adoption-request/${requestId.toString()}`}
          >
            <button>Go to request</button>
          </Link>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
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
      <TableBody items={requestData.adoptionRequests}>
        {(item) => (
          <TableRow key={item.dogId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
