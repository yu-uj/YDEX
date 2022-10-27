import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NFTModal from "./NFTModal";

const NFTCardBox = styled(Card)({
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export default function NFTCard({ item }) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

  return (
    <>
      <NFTCardBox style={{ height: 400, width: 400 }} onClick={handleOpen} >
        <CardMedia
          component="img"
          height="80%"
          image={item.imageUrl}
          style={{ objectFit: "fill" }}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Avatar src={item.imageUrl} />
          <Typography style={{ fontWeight: "bold" }}>{item.title}</Typography>
        </CardContent>
      </NFTCardBox>
      <NFTModal open={open} handleClose={handleClose} />
    </>
  );
}
