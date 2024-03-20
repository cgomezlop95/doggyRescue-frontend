import { useQuery } from "@tanstack/react-query";
import { getPendingDogs, getDogBreeds } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularIndeterminate } from "../components/CircularIndeterminate";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

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

      <div className="flex justify-center mx-auto gap-4 flex-wrap mt-8">
        <Select
          label="Select the dog gender"
          className="max-w-xs"
          onChange={handleSexChange}
        >
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          <SelectItem key="male" value="male">
            Male
          </SelectItem>
          <SelectItem key="female" value="female">
            Female
          </SelectItem>
        </Select>

        <Select
          label="Select the dog breed"
          className="max-w-xs"
          onChange={handleBreedChange}
        >
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          {dogBreedData?.dogBreeds.map((el) => (
            <SelectItem value={el.dogBreed} key={el.dogBreed}>
              {el.dogBreed}
            </SelectItem>
          ))}
        </Select>
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
