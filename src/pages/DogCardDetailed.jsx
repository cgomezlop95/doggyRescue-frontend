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
import { Box } from "@mui/material";

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

  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dog", id],
    queryFn: () => getDogById(id),
  });

  console.log(dogData);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isLoading) {
    return <h1>Loading dog</h1>;
  }

  return (
    <Box className="flex flex-col justify-center m-5">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {dogData.dog.dogName[0]}
            </Avatar>
          }
          //   action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title={dogData.dog.dogName}
          subheader={dogData.dog.dogBreed}
        />
        <CardMedia
          component="img"
          height="194"
          image={dogData.dog.dogPhotoURL}
          alt={dogData.dog.dogBreed}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {dogData.dog.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ul>
              <li>Age: {dogData.dog.dogAge} years</li>
              <li>Weight: {dogData.dog.dogWeight}</li>
              <li>Suitable For Kids:{dogData.dog.suitableForKids}</li>
              <li>
                Suitable For Other Pets: {dogData.dog.suitableForOtherPets}
              </li>
              <li>
                Potentially Dangerous: {dogData.dog.potentiallyDangerousDog}
              </li>
              <li>Is Vaccinated: {dogData.dog.isVaccinated}</li>
              <li>Is Sterilized: {dogData.dog.isSterilized}</li>
            </ul>
          </CardContent>
        </Collapse>
      </Card>

      <Link to="request">
        <Button variant="contained">Request Adoption</Button>
      </Link>

      <Button variant="contained">Update Dog Details</Button>
    </Box>
  );
}
