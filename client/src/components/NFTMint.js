import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  createTheme,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styled from "@emotion/styled";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import SellIcon from "@mui/icons-material/Sell";
import React, { useState } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/JDlogo.png";
import { uploadJSONToIPFS, uploadFileToIPFS } from "../pinata";
import { ethers } from "ethers";

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);
const Artifact = require('../contract/artifacts/YDEXNFT.json')

const MuiSwitchLarge = styled(Switch)(({ theme }) => ({
  width: 70,
  height: 34,
  padding: 8,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(5px)",
    "&.Mui-checked": {
      transform: "translateX(35px)",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 30,
    height: 30,
  },
  "& .MuiSwitch-track": {
    borderRadius: 5,
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#00ADBF",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#00ADBF",
  },
}));
const Overlay = styled(Box)`
  :hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
const Icon = styled(DeleteSweepOutlinedIcon)`
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
  round: {
    borderRadius: "10px",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#0063D8",
  color: "white",
  fontWeight: "bold",
  width: 200,
  marginTop: 10,
});

const LowerBox = styled(Box)({
  color: "#fff",
  minHeight: "80vh",
});

const NFT_Typography = styled(Typography)({
  fontSize: 50,
  fontWeight: "bold",
  color: "#333",
  textAlign: "left",
  marginLeft: 50,
  marginTop : 40,
});

const NFTMint = (props) => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(false);
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [isListing, setIslisting] = useState(false);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("ONLY JPG & JPEG & PNG FORMAT FILES ARE SUPPORTED");
      return false;
    } else setSelectedImage(file);
  };

  const handleToggle = (event) => {
    setIslisting(event.target.checked);
  };
  const handleMetaData = (event) => {
    const { name, value } = event.target;
    setMetaData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  //Upload Image to IPFS Pinata
  const uploadFIle = async () => {
    try {
      const response = await uploadFileToIPFS(selectedImage);
      if (response.success) {
        return response.pinataURL;
      }
    } catch (error) {
      console.log("error in uploading file");
    }
  };
  //upload MetaData to IPFS
  const uploadMeta = async () => {
    const imageURL = await uploadFIle();
    try {
      const { name, description } = metaData;
      const nftJSON = {
        name,
        description,
        image: imageURL,
      };
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success) {
        return response.pinataURL;
      }
    } catch (error) {
      console.log("error in meta data");
    }
  };

  //Mint the NFT
  const submit = async (event) => {
    event.preventDefault();
    try {
      setOpen(true);
      const metaDataURI = await uploadMeta();
      const _signer = props.web3.provider.getSigner();
      const contractInstance = props.web3.contract.connect(_signer);
      const price = ethers.utils.parseUnits(metaData.price, "ether");
      const listingPrice = await props.web3.contract.getListingPrice();
      const listingAmount = listingPrice.toString();
      const transaction = await contractInstance.createToken(
        metaDataURI,
        price,
        isListing,
        {
          value: listingAmount,
        }
      );
      await transaction.wait();

      setTimeout(() => {
        setMetaData({
          name: "",
          description: "",
          price: "",
        });
        setSelectedImage("");
        setOpen(false);
        setOpenSnack(true);
      }, 2000);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box style={{ height: "100%" }}>
        <LowerBox>
         <Stack direction="column">
           <NFT_Typography>Create NFT</NFT_Typography>
          <hr style={{ height: 10, backgroundColor: "white" }} />
         </Stack>

         <Box>
      <Paper
        elevation={5}
        sx={{
          width: {
            md: "40%",
          },
          m: "auto",
          p: 10,
          borderRadius: "20px",
        }}
      >
        <form onSubmit={submit}>
          <Stack spacing={1}>
            <Stack spacing={2} direction="column">
              <ThemeProvider theme={theme}>
                <Box
                  component="div"
                  sx={{
                    border: "5px dashed grey",
                    borderRadius: "10px",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  {selectedImage ? (
                    <>
                      <Overlay
                        sx={{
                          position: "absolute",
                          width: "190px",
                          height: "190px",
                          borderRadius: "10px",
                          background: "rgba(0, 0, 0, 0)",
                          transition: "background 0.5s ease",
                        }}
                      >
                        <Icon
                          sx={{
                            position: "absolute",
                            fontSize: "4cm",
                            color: "white",
                            opacity: 0,
                            transition: "opacity 0.5s ease",
                            width: "100%",
                          }}
                          onClick={() => setSelectedImage(null)}
                        />
                      </Overlay>
                      <img
                        className="imgurl"
                        src={URL.createObjectURL(selectedImage)}
                        alt="nft"
                      />
                    </>
                  ) : (
                    <IconButton sx={{ width: "100%" }} disabled>
                      <UploadIcon sx={{ fontSize: "4.5cm" }} />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="caption">
                  File types supported: JPG, JPEG, PNG. Max size: 30 MB
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  sx={{ width: "25%" }}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    multiple
                    onChange={handleFile}
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </Button>
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  helperText="Name of your NFT"
                  value={metaData.name}
                  onChange={handleMetaData}
                  required
                />
                <TextField
                  name="description"
                  label="Description"
                  type="text"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={metaData.description}
                  onChange={handleMetaData}
                  helperText="The description will be included on the item's detail page underneath its image."
                  required
                />
                <TextField
                  name="price"
                  label="Price"
                  type="text"
                  variant="outlined"
                  InputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    endAdornment: (
                      <InputAdornment position="end">ETH</InputAdornment>
                    ),
                  }}
                  error={metaData.price === "[0-9]*"}
                  value={metaData.price}
                  onChange={handleMetaData}
                  helperText="Set a price, for buyers(it should be in ethers)"
                  required
                />
              </ThemeProvider>

              <Stack spacing={1} direction="column"  >
                <Stack spacing={2} direction="row" sx={{ alignItems: "center" }} >
                  <SellIcon sx={{ fontSize: "1cm", color: "primary.light" }} />
                  <Typography variant="h6" color="primary.light" >
                  SELL NFT ON THE MARKET
                  </Typography>
                  <MuiSwitchLarge
                    checked={isListing}
                    onChange={handleToggle}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Typography variant="body2" sx={{}}>
                  Select Whether you wanted to list you NFT on the market
                </Typography>
              </Stack>
              <StyledButton type="submit">
                Create NFT
              </StyledButton>
            </Stack>
          </Stack>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleclose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {error ? (
            <Alert
              onClose={handleclose}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error,Try Again After Sometime!!
            </Alert>
          ) : (
            <Alert
              onClose={handleclose}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              NFT Successfully Created!!!
            </Alert>
          )}
        </Snackbar>
      </Paper>
    </Box>

      
     </LowerBox>
    </Box>

    
  );
};

export default NFTMint;