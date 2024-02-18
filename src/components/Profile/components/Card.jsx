import React from "react";

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
import Link from "@mui/icons-material/Link";

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

const CardMain = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 300, minWidth: 280 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={data.imageURL}
        alt="image data"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            <p>
              {data.invalidComplaintMessage && (
                <p>Not Valid Reported due to {data.invalidComplaintMessage}</p>
              )}
              <br />
              <b>Severity: </b>
              {data.severity}
              <br />
              <b>Components Of Garbage: </b>{" "}
              {data.wasteType.map((x, i) =>
                data.wasteType.length - 1 === i ? x : x + ", "
              )}
              <br />
              <b>Recycle% : </b> {data.wasteRecyclable}
              {data.siteUncleanDuration && (
                <>
                  <br />
                  <b>Since when is garbage overflowing?: </b>
                  {data.siteUncleanDuration}
                </>
              )}
              {data.dustbinNearby && (
                <>
                  <br />
                  There is{" "}
                  {data.dustbinNearby ? (
                    <>
                      <b>a dustbin nearby, which is </b>
                      {data.isdustbinOverflowing ? (
                        <b>filled up</b>
                      ) : (
                        <b>not filled up.</b>
                      )}
                    </>
                  ) : (
                    <b>not a dustbin nearby.</b>
                  )}
                </>
              )}
              {data.pmcCleanSite && (
                <>
                  <br />
                  PMC is{" "}
                  {data.pmcCleanSite ? (
                    <>
                      <b>seen cleaning</b> in this area.
                    </>
                  ) : (
                    <>
                      <b>not seen cleaning</b> in this area.
                    </>
                  )}
                </>
              )}
              {data.siteType && (
                <>
                  <br />
                  <b>Site Category: </b> {data.siteType}
                </>
              )}
            </p>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardMain;
