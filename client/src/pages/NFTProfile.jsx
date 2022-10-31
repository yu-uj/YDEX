import { Avatar, Box, Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCallback } from "react";
import CounterContainer from '../redux/CounterContainer';
import { useDispatch } from "react-redux";
import NFTCard from "../components/NFTCard";

const nftSamples = [
  {
    id: 1,
    title: "The Potatoz",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/774b6b9daa7064a64b00811b191fed00.gif?auto=format&w=3840",
    price: 100,
  },
  {
    id: 2,
    title: "Friday Beers NFT Official",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/3912ee9fa64ef53627fff180a1e163aa.png?auto=format&w=3840",
    price: 200,
  },
  {
    id: 3,
    title: "VOXVOT_BlindVox",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/f940d2c070e862d22802d2d395fb0a5c.png?auto=format&w=3840",
    price: 300,
  },
  {
    id: 4,
    title: "ENS:Ethereum Name Service",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gae/BBj09xD7R4bBtg1lgnAAS9_TfoYXKwMtudlk-0fVljlURaK7BWcARCpkM-1LGNGTAcsGO6V1TgrtmQFvCo8uVYW_QEfASK-9j6Nr?auto=format&w=3840",
    price: 400,
  },
  {
    id: 5,
    title: "Green Boys Family",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/1c38f01f0ee9d5f82ce4f5df0e4cfa33.jpg?auto=format&w=3840",
    price: 500,
  },
  {
    id: 6,
    title: "Genuine Undead",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    imageUrl:
      "https://i.seadn.io/gcs/files/e2f402e13f00ab82d1eb08574eb25f32.gif?auto=format&w=3840",
    price: 600,
  },
];

const UpperBox = styled(Box)({
  backgroundColor: "#666",
  minHeight: "20vh",
});

const LowerBox = styled(Box)({
  backgroundColor: "white",
  color: "#000",
  minHeight: "80vh",
});

const PositionedAvatar = styled(Avatar)({
  position: "absolute",
  top: 110,
  left: 40,
  height: 130,
  width: 130,
  color: "#1976D2",
  border: "5px solid white",
});

const NFT_Typography = styled(Typography)({
    fontSize: 50,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginLeft: 50,
    marginTop : 40,
  });
  
  const NFT_Cards = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  });

const StyledButton = styled(Button)({
  backgroundColor: "#0063D8",
  color: "white",
  fontWeight: "bold",
  width: 200,
  marginTop: 10,
});

export default function NFTProfile(props) {
  const { number, number1 } = props;
  const dispatch = useDispatch();
  const dispatchSetCW = (cw) => dispatch({ type: "SET_CW", number: cw });
  const dispatchSetCtk = (cw) => dispatch({ type: "SET_CTK", number1: cw });

  const handleMintNFT = useCallback(() => {
    // mint NFT logic here ...
  });

  return (
    <>
      <Box style={{ height: "100%" }}>
        <UpperBox>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 50,
              position: "absolute",
              top: 130,
              left: 250,
            }}
          >
            <Typography>USERNAME</Typography>
            <Typography>
              <img
                src="https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
                width={50}
              />
              0x123...abcd
            </Typography>

            <StyledButton onClick={handleMintNFT}>Mint NFT</StyledButton>
          </Box>
        </UpperBox>
        <LowerBox>
          <Stack direction="column">
            <NFT_Typography>My Collections</NFT_Typography>
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
        </LowerBox>
      </Box>
      <PositionedAvatar />
    </>
  );
}
