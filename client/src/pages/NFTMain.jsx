import styled from "@emotion/styled";
import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import NFTCard from "../components/NFTCard";
import NFTModal from "../components/NFTModal";

const nftSamples = [
  {
    id: 1,
    title: "The Potatoz",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/774b6b9daa7064a64b00811b191fed00.gif?auto=format&w=3840",
  },
  {
    id: 2,
    title: "Friday Beers NFT Official",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/3912ee9fa64ef53627fff180a1e163aa.png?auto=format&w=3840",
  },
  {
    id: 3,
    title: "VOXVOT_BlindVox",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/f940d2c070e862d22802d2d395fb0a5c.png?auto=format&w=3840",
  },
  {
    id: 4,
    title: "ENS:Ethereum Name Service",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gae/BBj09xD7R4bBtg1lgnAAS9_TfoYXKwMtudlk-0fVljlURaK7BWcARCpkM-1LGNGTAcsGO6V1TgrtmQFvCo8uVYW_QEfASK-9j6Nr?auto=format&w=3840",
  },
  {
    id: 5,
    title: "Green Boys Family",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/1c38f01f0ee9d5f82ce4f5df0e4cfa33.jpg?auto=format&w=3840",
  },
  {
    id: 6,
    title: "Genuine Undead",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/e2f402e13f00ab82d1eb08574eb25f32.gif?auto=format&w=3840",
  },
];

const NFTBox = styled(Box)({
  flex: 1,
  padding: 30,
});

const NFT_Typography = styled(Typography)({
  fontSize: 70,
  fontWeight: "bold",
  color: "white",
  textAlign: "left",
  padding: 10,
  marginLeft: 30,
});

const NFT_Cards = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 20,
});

export default function NFTMain() {
  
  return (
    <NFTBox>
      <Stack direction="column">
        <NFT_Typography>Explore</NFT_Typography>
        <hr style={{ height: 10, backgroundColor: "white" }} />
      </Stack>
      <NFT_Cards>
        {nftSamples.map((item) => (
          <NFTCard
            key={item.id}
            item={item}
            onClick={() => console.log("hello world")}
          />
        ))}
      </NFT_Cards>
    </NFTBox>
  );
}
