import { useQuery } from "@tanstack/react-query";
import { getPendingDogs } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

//for the header
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";

export function DogList() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
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

      <div>
        <label for="dogSex">Filter by Dog Sex</label>
        <select id="dogSex" name="dogSex">
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
        {dogData?.dogs.map((item) => (
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
