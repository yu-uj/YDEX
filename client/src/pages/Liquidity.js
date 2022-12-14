import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/css/Swap.css";
import {
  Modal, Button, FormControl, Typography, Box, MenuItem, Grid, Paper, Select, Stack
} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    info: {
      main: grey[600],
      contrastText: '#fff',
    },
    primary: {
      light: indigo[200],
      main: indigo[400],
      darker: indigo[800],
      contrastText: '#fff'
    },
  },
});

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);

const DexRouterabi = require('../contract/ABI/swap/DexRouter.json');

const RouterAddress = '0x9ED98841EE2A8E5cD28b5B54B54b992502be8216';

const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);

const Liquidity = ({ form, former, children, todo, todoo, teacher }) => {
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(false);

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");

  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");

  const [tokenAddress1, setTokenAddress1] = useState("");
  const [tokenAddress2, setTokenAddress2] = useState("");

  const [amount, setAmount] = useState("");

  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAmount2, setTokenAmount2] = useState("");

  const [save, setSave] = useState("");

  const address = useSelector((state) => state.counter);
  const deadline = parseInt('' + new Date().getTime() / 1000) + 100000;

  const GetAmountsOut = async () => {
    const a = await DexRouterContract.methods.getAmountsOut(caver.utils.toPeb(amount, "KLAY"), [
      tokenAddress1,
      tokenAddress2,
    ]).call();

    setSave(caver.utils.fromPeb(a[1], "KLAY"));
  }
  useEffect(() => {
    GetAmountsOut();
  }, [amount]);

  const handleCreate = () => setCreate(true);

  const createClose = ({ isSave }) => {
    if (isSave) {
      setChoice1(selected1);
    }
    setCreate(false);
  };

  const handleShow = () => setShow(true);

  const handleClose = ({ isSave }) => {
    if (isSave) {
      setChoice2(selected2);
    }
    setShow(false);
  };

  const dummydata = {
    token_address: "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1",
  };

  const getToken1 = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    const Tokenbalance1 = await kip7.balanceOf(address.number); // ??? ????????? ?????? ?????? ??? ????????? ??????
    setTokenAmount1(caver.utils.fromPeb(Tokenbalance1)) //-> ????????? usestate????????? ?????? ?????? ?????? ???????????? ???????????? ?????? 
  }

  const getToken2 = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress2);
    const Tokenbalance2 = await kip7.balanceOf(address.number); // ??? ????????? ?????? ?????? ??? ????????? ??????
    setTokenAmount2(caver.utils.fromPeb(Tokenbalance2)) //-> ????????? usestate????????? ?????? ?????? ?????? ???????????? ???????????? ?????? 
  }

  const addLiquid = async () => {
    const kip7_1 = new caver.klay.KIP7(tokenAddress1);
    const kip7_2 = new caver.klay.KIP7(tokenAddress2);
    // ?????? ????????? ???????????? ??? ????????? ????????? ??????????????? ????????? ?????? ??????

    const allowedA = await caver.utils.fromPeb(await kip7_1.allowance(address.number, RouterAddress));
		const allowedB = await caver.utils.fromPeb(await kip7_2.allowance(address.number, RouterAddress));

    if (allowedA <= amount) {
      await kip7_1.approve(RouterAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {
				from: address.number,
			});
    }
    if (allowedB <= save) {
			await kip7_2.approve(RouterAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {
				from: address.number,
			});
		}
    console.log(tokenAddress1);

    let addliquidity = await DexRouterContract.methods.addLiquidity(tokenAddress1, tokenAddress2, caver.utils.toPeb(amount), caver.utils.toPeb(save), 0, 0, address.number, deadline).send(
			{
				from: address.number,
				gas: 50000000,
			}
		);
		let tokenAmount = caver.utils.toBN((addliquidity.events[4].raw.data));
  };

  const [liquidData, setLiquidData] = useState([
    { token_address: "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1" },
  ]);

  const [LiquidToken, setLiquidToken] = useState([dummydata]);
  const getLiquidToken = async () => {
    await axios.get(`http://localhost:4000/mytoken/`).then((res) => {
      setLiquidToken(() => {
        return res.data["data"];
      });
    });
  };

  useEffect(() => {
    getLiquidToken();
  }, []);

  const Liquid_Token = async (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];

      const KIP7Contract = await new caver.klay.KIP7(el.token_address);
      let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      let amount = await caver.utils.fromPeb(bal, "KLAY");

      let obj = {
        token_name: el.token_name,
        token_amount: amount,
        token_symbol: el.token_symbol,
        token_price: "??????",
        token_address: el.token_address,
      };
      arr.push(obj);
    }
    setLiquidData(arr);
  };

  useEffect(() => {
    Liquid_Token(LiquidToken);
  }, [LiquidToken]);

  useEffect(() => {
    getToken1();
    GetAmountsOut();
  }, [tokenAddress1])

  useEffect(() => {
    getToken2();
    GetAmountsOut();
  }, [tokenAddress2])

  const options1 = liquidData.map((el) => {
    return (
      <MenuItem value={el.token_name} key={el.token_name}>
        {el.token_name}
      </MenuItem>
    );
  });

  const options2 = liquidData.map((el) => {
    return (
      <MenuItem value={el.token_name} key={el.token_name}>
        {el.token_name}
      </MenuItem>
    );
  });

  const handleLiquid1 = (e) => {
    setSelected1(e.target.value);
  };

  const handleLiquid2 = (e) => {
    setSelected2(e.target.value);
  };

  useEffect(() => {
    const targetToken1 = LiquidToken.find((el) => el.token_name === choice1);
    setTokenAddress1(targetToken1?.token_address);
  }, [choice1]);

  useEffect(() => {
    const targetToken2 = LiquidToken.find((el) => el.token_name === choice2);
    setTokenAddress2(targetToken2?.token_address);
  }, [choice2]);

  const handleInputMax = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number))).toFixed(3))
  }


  return (
    <div>

      <div className="swapPageInfo">
        <h2>Add Liquidity</h2>
        <p>???????????? ?????? <b>YDEX ??????</b>??? <b>KIP7 ??????</b>?????? <br /> ????????? ?????? <b>????????? ??????</b>??? ??? ??? ????????????.</p>
      </div>

      <ThemeProvider theme={theme}>
        <div className="box-model">
          <div className="former-wrapper">
            {former}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={10}><h4 className="st">??????</h4></Grid>
                <Grid item xs={2}>
                  <Button variant="contained" onClick={handleInputMax}>MAX</Button>
                </Grid>
              </Grid>
            </Box>
          </div>

          <section className="form-wrapper">
            {form}
            <Box sx={{ flexGrow: 1 }} className="form-wrap">

              <Grid container spacing={3}>
                <Grid item={true} xs={9}>
                  <>
                    <Button variant="contained" onClick={handleCreate}>
                      ??????
                    </Button>

                    <Modal
                      open={create}
                      onClose={() => createClose({ isSave: false })}
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">?????? 1</Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { width: 500, maxWidth: '100%' },
                            }}
                            noValidate
                            autoComplete="off">
                            <FormControl fullWidth size="small" margin="dense">
                              <Typography>Token Select</Typography>

                              <Select
                                sx={{ mt: 1 }}
                                onChange={handleLiquid1}
                                value={selected1}
                                displayEmpty
                              >
                                <MenuItem value=""><em>---?????? ??????---</em></MenuItem>
                                {options1}
                              </Select>
                            </FormControl>
                          </Box>

                          <br />
                          <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => createClose({ isSave: false })}
                            >
                              Close
                            </Button>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => createClose({ isSave: true })}
                            >
                              Save Changes
                            </Button>
                          </Stack>

                        </Typography>
                      </Box>
                    </Modal>
                  </>
                </Grid>
                <Grid item={true} xs={3}>
                  <h3 className="about">{choice1}</h3>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item={true} className="about" xs={12}>
                  <h3>
                    <input
                      className="number"
                      placeholder="0.0000"
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={(amount)}
                    />
                  </h3>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={4}><b className="swapInfo">??????</b></Grid>
                <Grid item className="about" xs={8}>
                  {Number(tokenAmount1).toFixed(3)}
                </Grid>
              </Grid>
            </Box>
          </section>
          <br />

          <section className="todoo-wrapper">
            {todoo}
            <Button variant="contained">
              <AddCircleRoundedIcon fontSize="large" />
            </Button>
          </section>

          <section className="todo-wrapper">
            {todo}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item={true} xs={10}><h4 className="st">??????</h4></Grid>
                <Grid item={true} xs={2}>
                  <Button variant="contained" onClick={handleInputMax}>MAX</Button>
                </Grid>
              </Grid>
            </Box>
          </section>

          <section className="todos-wrapper">
            {children}
            <Box sx={{ flexGrow: 1 }} className="todos-wrap">

              <Grid container spacing={3}>
                <Grid item={true} xs={9}>
                  <>
                    <Button variant="contained" onClick={handleShow}>
                      ??????
                    </Button>

                    <Modal
                      open={show}
                      onClose={() => handleClose({ isSave: false })}
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">?????? 2</Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { width: 500, maxWidth: '100%' },
                            }}
                            noValidate
                            autoComplete="off">
                            <FormControl fullWidth size="small" margin="dense">
                              <Typography>Token Select</Typography>
                              <Select
                                sx={{ mt: 1 }}
                                onChange={handleLiquid2}
                                value={selected2}
                                displayEmpty
                              >
                                <MenuItem value=""><em>---?????? ??????---</em></MenuItem>
                                {options2}
                              </Select>
                            </FormControl>
                          </Box>

                          <br />
                          <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleClose({ isSave: false })}
                            >
                              Close
                            </Button>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleClose({ isSave: true })}
                            >
                              Save Changes
                            </Button>
                          </Stack>

                        </Typography>
                      </Box>
                    </Modal>
                  </>
                </Grid>
                <Grid item={true} xs={3}>
                  <h3 className="about">{choice2}</h3>
                </Grid>

              </Grid>

              <Grid container spacing={3}>
                <Grid item={true} className="about" xs={12}>
                  <h3>
                    <input
                      className="number"
                      value={Number(save).toFixed(5)}
                      placeholder="0.0000"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </h3>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item={true} xs={4}><b className="swapInfo">??????</b></Grid>
                <Grid item={true} className="about" xs={8}>
                  {Number(tokenAmount2).toFixed(3)}
                </Grid>
              </Grid>
            </Box>
          </section>

          <div className="button-wrapper">
            {teacher}
            <br />
            <div className="d-grid gap-2">
              <Button variant="contained" size="lg" onClick={addLiquid}>
                Add Liquidity
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Liquidity;