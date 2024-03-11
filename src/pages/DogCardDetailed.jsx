import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";

import { useParams, useNavigate, Link } from "react-router-dom";
import { getDogById } from "../service/dog";
import { useQuery } from "@tanstack/react-query";
import { Box, Chip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function DogCardDetailed() {
  const { id } = useParams();
  let auth = useAuth();

  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dog", id],
    queryFn: () => getDogById(id),
  });

  console.log(dogData);

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {dogData?.dog.dogName[0]}
            </Avatar>
          }
          title={
            <h3 className="text-xl font-semibold text-gray-900">
              {dogData.dog.dogName}
            </h3>
          }
          subheader={
            <p className="text-sm text-gray-600">{dogData.dog.dogBreed}</p>
          }
        />

        <CardMedia
          component="img"
          height="194"
          image={dogData.dog.dogPhotoURL}
          alt={dogData.dog.dogBreed}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {dogData.dog.dogDescription}
          </Typography>
        </CardContent>

        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-800">
              <span className="font-semibold">Age:</span> {dogData.dog.dogAge}{" "}
              years
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Gender:</span>{" "}
              {dogData.dog.dogSex}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Weight:</span>{" "}
              {dogData.dog.dogWeight}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Suitable For Kids:</span>{" "}
              {dogData.dog.suitableForKids ? "Yes" : "No"}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Suitable For Other Pets:</span>{" "}
              {dogData.dog.suitableForOtherPets ? "Yes" : "No"}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Potentially Dangerous:</span>{" "}
              {dogData.dog.potentiallyDangerousDog ? "Yes" : "No"}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Is Vaccinated:</span>{" "}
              {dogData.dog.isVaccinated ? "Yes" : "No"}
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Is Sterilized:</span>{" "}
              {dogData.dog.isSterilized ? "Yes" : "No"}
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center space-y-2 m-8">
        {!dogData.dog.dogAdopted && (
          <Link to={`/request-dog/${dogData.dog.id.toString()}`}>
            <Button variant="contained">Request Adoption</Button>
          </Link>
        )}

        {auth.currentUser?.isAdmin && (
          <Link to={`/update-dog/${dogData.dog.id.toString()}`}>
            <Button variant="contained">Update Dog Details</Button>
          </Link>
        )}
      </div>
    </Box>
  );
}
