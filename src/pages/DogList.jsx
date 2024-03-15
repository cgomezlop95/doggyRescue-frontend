import { useQuery } from "@tanstack/react-query";
import { getPendingDogs } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

//for the header
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { useState } from "react";

export function DogList() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
  });

  const [selectedSex, setSelectedSex] = useState("all"); //Filter by gender
  const handleSexChange = (event) => {
    setSelectedSex(event.target.value);
  };

  // Filter dogs based on the selected sex
  const filteredDogs = dogData?.dogs.filter((dog) => {
    return selectedSex === "all" || dog.dogSex === selectedSex;
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <Card className="max-w-[700px] mx-auto mt-8 mb-8 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-blue-500 text-white p-2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold">DOGGY RESCUE</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-3">
          <p className="text-sm text-gray-700">
            Welcome to Doggy Rescue, where every tail has a tale. Discover your
            new best friend among our loving canines ready for adoption. Let's
            create forever memories together!
          </p>
        </CardBody>
        <Divider />
      </Card>

      <div className="my-8 mx-auto max-w-lg p-4 bg-white shadow-md rounded-lg">
        <label
          htmlFor="dogSex"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Dog Sex
        </label>
        <select
          id="dogSex"
          name="dogSex"
          onChange={handleSexChange}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <ImageList
        sx={{ width: 1300, margin: 5 }}
        cols={4}
        rowHeight={300} //or "auto"
        // variant="woven"
        gap={20}
      >
        {filteredDogs.map((item) => (
          <Link key={item.id} to={`/dog/${item.id.toString()}`}>
            <ImageListItem>
              <div
                style={{
                  backgroundImage: `url(${item.dogPhotoURL}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center", //or center
                  height: "300px" /* Adjust height as needed */,
                }}
              ></div>

              <ImageListItemBar
                title={item.dogName}
                subtitle={item.dogBreed}
                // actionIcon={
                //   <IconButton
                //     sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                //     aria-label={`info about ${item.dogName}`}
                //   >
                //     <InfoIcon />
                //   </IconButton>
                // }
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </>
  );
}
