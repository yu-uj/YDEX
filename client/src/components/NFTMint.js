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
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { uploadJSONToIPFS, uploadFileToIPFS } from "../pinata";

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);
const NFTABI = require('../contract/ABI/marketplace/YDEXNFT.json');
const NFTAddress = '0xdbBB949d14576B506DE819FC04CE57FfaFb7f506';
const PlatformTokenAddress = '0xf2d5a9b9E7eC682aF9f353c6715DDf6b6393EE34';
const contract = new caver.klay.Contract(NFTABI, NFTAddress);

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
  width: 300,
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
  marginTop: 40,
});

const NFTMint = (props) => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(false);
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    price: "20",
  });
  const address = useSelector(state => state.counter);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("ONLY JPG & JPEG & PNG FORMAT FILES ARE SUPPORTED");
      return false;
    } else setSelectedImage(file);
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
      console.log(response.pinataURL)
    } catch (error) {
      console.log("error in meta data");
    }
  };

  //Mint the NFT
  const submit = async (event) => {
    event.preventDefault();
    try {
      const metaDataURI = await uploadMeta();
      const price = caver.utils.toPeb(metaData.price, "KLAY");
      // const price = caver.utils.toPeb(10000000, "KLAY");
     
      // const transaction = await caver.klay.sendTransaction({
      //   type: 'SMART_CONTRACT_EXECUTION',
      //   from: address.number,
      //   to: NFTAddress,
      //   value: price,
      //   data: contract.methods.safeMint(address.number, metaDataURI).encodeABI(),
      //   gas: 80000
      // }).then((res)=>{console.log(res);})
      // .catch((err) => {alert("Mint has failed.");
      // });
      // await transaction.wait();

      const ydt = new caver.klay.KIP7(PlatformTokenAddress);
      const approve = await ydt.approve(NFTAddress, caver.utils.toPeb(10000000000000, "KLAY"), {
        from: address.number,
      });

      const mint = await caver.klay.sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: address.number,
        to: NFTAddress,
        data: contract.methods.safeMint(metaDataURI).encodeABI(),
        gas: 8000000
      }).then((res)=>{console.log(res);})
      .catch((err) => {alert("Mint has failed.");});


      setTimeout(() => {
        setMetaData({
          name: "",
          description: "",
          price: "",
        });
        setSelectedImage("");
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
                <Stack spacing={2} direction="column" sx={{ alignItems: "center" }}>
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
                    {/* <TextField
                      name="price"
                      label="Price"
                      type="text"
                      variant="outlined"
                      InputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        endAdornment: (
                          <InputAdornment position="end">KLAY</InputAdornment>
                        ),
                      }}
                      error={metaData.price === "[0-9]*"}
                      value={metaData.price}
                      onChange={handleMetaData}
                      helperText="Set a price, for buyers(it should be in klay)"
                      required
                    /> */}
                  </ThemeProvider>

                  <StyledButton type="submit" >
                    Create NFT
                  </StyledButton>
                </Stack>
              </Stack>
            </form>
           
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