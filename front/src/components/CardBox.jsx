import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardBox({ title, children }) {
  return (
    <Card sx={styles.cardContainer}>
      <CardContent
        sx={{
          width: "100%",
          padding: "8px 8px 8px 8px",
        }}
      >
        <Typography gutterBottom variant="labelTitle" component="div">
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  cardContainer: {
    width: "100%",
    p: 0,
    bgcolor: "#ACB6C6",
  },
};
