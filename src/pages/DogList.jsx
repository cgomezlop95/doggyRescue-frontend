import { useQuery } from "@tanstack/react-query";
import { getPendingDogs, getDogBreeds } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularIndeterminate } from "../components/CircularIndeterminate";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { useState } from "react";

export function DogList() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
  });

  const { data: dogBreedData } = useQuery({
    queryKey: ["breeds"],
    queryFn: getDogBreeds,
  });

  const [selectedSex, setSelectedSex] = useState("all");
  const [selectedBreed, setSelectedBreed] = useState("all");

  const handleSexChange = (event) => {
    setSelectedSex(event.target.value);
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const filteredDogs = dogData?.dogs.filter((dog) => {
    return (
      (selectedSex === "all" || dog.dogSex === selectedSex) &&
      (selectedBreed === "all" || dog.dogBreed === selectedBreed)
    );
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

      <div className="flex flex-row my-8 mx-auto max-w-lg p-4 bg-white shadow-md rounded-lg">
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

        <label
          htmlFor="dogBreed"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Dog Breed
        </label>
        <select
          id="dogBreed"
          name="dogBreed"
          onChange={handleBreedChange}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="all">All</option>
          {dogBreedData?.dogBreeds.map((el) => (
            <option value={el.dogBreed}>{el.dogBreed}</option>
          ))}
        </select>
      </div>

      <ImageList
        sx={{ width: 1300, margin: 5 }}
        cols={4}
        rowHeight={300}
        gap={20}
      >
        {filteredDogs.map((item) => (
          <Link key={item.id} to={`/dog/${item.id.toString()}`}>
            <ImageListItem>
              <div
                style={{
                  backgroundImage: `url(${item.dogPhotoURL}`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              ></div>

              <ImageListItemBar title={item.dogName} subtitle={item.dogBreed} />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </>
  );
}
