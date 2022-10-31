import { Box, Button, Modal, Stack, styled, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useCallback } from "react";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  background: `linear-gradient(pink, lightblue)`,
  border: "3px solid #555",
  borderRadius: 10,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  '&::-webkit-scrollbar' : {
    width: '10px'
  }
};

const StyledTitle = styled(Typography)({
  fontSize: 30,
  fontWeight: "bold",
});

const StyledButton = styled(Button)({
  backgroundColor : '#0063D8',
  color : 'white',
  fontWeight : 'bold',
  width : 200,
  marginTop : 10
})

export default function NFTModal({ open, handleClose, item }) {

  const handleBuyNFT = useCallback(()=>{
    // buy NFT logic here
  })

  return (
    <Modal
      // hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }} style={{ overflowY: "scroll" }}>
        <CloseIcon style={{fontSize:40,float:'right', cursor:'pointer'}} onClick={handleClose}/>
        <Box style={{border : '2px solid black', marginTop : 50, padding : 10}}>
          <Stack direction="row" gap={10}>
            <img
              src={item?.imageUrl}
              width={250}
              height={250}
              style={{ borderRadius: 10 }}
            />
            <Box style={{ padding: 5}}>
              <StyledTitle>{item?.title}</StyledTitle>
              <p>published by {item?.title}</p>

              <Typography style={{ alignItems: "center", display: "flex" }}>
                <img
                  src="https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
                  width={50}
                />
                <span style={{ fontSize: 30, fontWeight: "bold" }}>
                  {item?.price}
                </span>
              </Typography>
              <StyledButton onClick={handleBuyNFT}>Buy NFT</StyledButton>
            </Box>
          </Stack>
          <Box style={{ padding: 5, marginTop : 10 }}>
            <StyledTitle>NFT Description</StyledTitle>
            <p>{item?.description}</p>
          </Box>
        </Box>
        <Typography></Typography>
      </Box>
    </Modal>
  );
}
