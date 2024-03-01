import { useQuery } from "@tanstack/react-query";
import { getPendingDogs } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export function DogList() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
  });

  if (isLoading) {
    return <h1>Loading dogs</h1>;
  }

  return (
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
  );
}
