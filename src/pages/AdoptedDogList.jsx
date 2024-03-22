import { useQuery } from "@tanstack/react-query";
import { getAdoptedDogs } from "../service/dog";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

export function AdoptedDogList() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["adoptedDogs"],
    queryFn: getAdoptedDogs,
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <ImageList
      sx={{ width: 1300, margin: 5 }}
      cols={4}
      rowHeight={300}
      gap={20}
    >
      {dogData?.dogs.map((item) => (
        <Link key={item.id} to={`/dog/${item.id.toString()}`}>
          <ImageListItem>
            <div
              style={{
                backgroundImage: `url(${item.dogPhotoURL}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            ></div>

            <ImageListItemBar title={item.dogName} subtitle={item.dogBreed} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}
