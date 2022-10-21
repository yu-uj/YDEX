import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/css/Swap.css";
import {
  Modal,
  Button,
  FormControl,
  Typography,
  Box,
  MenuItem,
  Grid,
  Paper,
  Select,
  ButtonGroup,
} from "@mui/material";

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

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);

const KIP7ABI = require("../contract/KIP7.json");
const DexRouterabi = require('../contract/router.json');

const RouterAddress = '0x63e3cB8C959068DD947c3FadF7455044B5C36b8f';

const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);

const Swap = ({ form, former, children, todo, todoo, teacher }) => {
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
    const Tokenbalance1 = await kip7.balanceOf(address.number); // 내 주소가 갖고 있는 그 토큰의 잔액
    console.log(caver.utils.fromPeb(Tokenbalance1));
    setTokenAmount1(caver.utils.fromPeb(Tokenbalance1)) //-> 예시로 usestate사용해 토큰 잔액 넣고 불러와서 사용하면 될듯 
  }

  const getToken2 = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress2);
    const Tokenbalance2 = await kip7.balanceOf(address.number); // 내 주소가 갖고 있는 그 토큰의 잔액
    console.log(caver.utils.fromPeb(Tokenbalance2));
    setTokenAmount2(caver.utils.fromPeb(Tokenbalance2)) //-> 예시로 usestate사용해 토큰 잔액 넣고 불러와서 사용하면 될듯 
  }

  const swap = async () => {

    const kip7 = new caver.klay.KIP7(tokenAddress1);

    const allowed = await kip7.allowance(address.number, RouterAddress);
    if (allowed <= tokenAmount1) {
      try {
        await kip7.approve(RouterAddress, caver.utils.toPeb("100000000"), {
          from: address.number,
          gas: 2000000,
        });
      } catch (err) {
        console.log(err);
      }
    }
    let a = await DexRouterContract.methods.swapExactTokensForTokens(caver.utils.toPeb(amount, "KLAY"), 0, [tokenAddress1, tokenAddress2], address.number, deadline).send(
      {
        from: address.number,
        gas: 200000000
      });
    console.log(a);
  };

  const [swapData, setSwapData] = useState([
    { token_address: "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1" },
  ]);

  const [SwapToken, setSwapToken] = useState([dummydata]);
  const getSwapToken = async () => {
    await axios.get(`http://localhost:4000/mytoken/`).then((res) => {
      setSwapToken(() => {
        return res.data["data"];
      });
    });
  };

  useEffect(() => {
    getSwapToken();
  }, []);

  const Swap_Token = async (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];

      const KIP7Contract = await new caver.klay.Contract(
        KIP7ABI,
        el.token_address
      );
      let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      let amount = await caver.utils.fromPeb(bal, "KLAY");

      let obj = {
        token_name: el.token_name,
        token_amount: amount,
        token_symbol: el.token_symbol,
        token_price: "가격",
        token_address: el.token_address,
      };
      arr.push(obj);
    }
    setSwapData(arr);
  };

  useEffect(() => {
    Swap_Token(SwapToken);
  }, [SwapToken]);

  useEffect(() => {
    getToken1();
    GetAmountsOut();
  }, [tokenAddress1])

  useEffect(() => {
    getToken2();
    GetAmountsOut();
  }, [tokenAddress2])

  const options1 = swapData.map((el) => {
    return (
      <MenuItem value={el.token_name} key={el.token_name}>
        {el.token_name}
      </MenuItem>
    );
  });

  const options2 = swapData.map((el) => {
    return (
      <MenuItem value={el.token_name} key={el.token_name}>
        {el.token_name}
      </MenuItem>
    );
  });

  const handleSwap1 = (e) => {
    setSelected1(e.target.value);
  };

  const handleSwap2 = (e) => {
    setSelected2(e.target.value);
  };

  useEffect(() => {
    const targetToken1 = SwapToken.find((el) => el.token_name === choice1);
    setTokenAddress1(targetToken1?.token_address);
  }, [choice1]);
  useEffect(() => {
    const targetToken2 = SwapToken.find((el) => el.token_name === choice2);
    setTokenAddress2(targetToken2?.token_address);
  }, [choice2]);

  const handleInputquarter = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) / 4).toFixed(3))
  }
  const handleInputhalf = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) / 2).toFixed(3))
  }
  const handleInputthreequarters = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number)) * 3 / 4).toFixed(3))
  }
  const handleInputMax = async () => {
    const kip7 = new caver.klay.KIP7(tokenAddress1);
    setAmount(Number(caver.utils.fromPeb(await kip7.balanceOf(address.number))).toFixed(3))
  }


  return (
    <div>

      <div className="swapPageInfo">
        <h2>Token Swap</h2>
        <p>보유하고 있는 <b>JDEX 토큰</b>과 <b>KIP7 토큰</b>을 <br /> 원하는 다른 토큰과 <b>스왑</b> 할 수 있습니다.</p>
      </div>

      <div className="box-model">
        <div className="former-wrapper">
          {former}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}><h4 className="st">제공</h4></Grid>
              <Grid item xs={6}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button variant="secondary" onClick={handleInputquarter}>25%</Button>
                  <Button variant="secondary" onClick={handleInputhalf}>50%</Button>
                  <Button variant="secondary" onClick={handleInputthreequarters}>75%</Button>
                  <Button variant="secondary" onClick={handleInputMax}>최대치</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </div>

        <section className="form-wrapper">
          {form}
          <Box sx={{ flexGrow: 1 }} className="form-wrap">

            <Grid container spacing={3}>
              <Grid item xs={9}>
                <>
                  <Button variant="primary" onClick={handleCreate}>
                    토큰
                  </Button>

                  <Modal
                    open={create}
                    onClose={() => createClose({ isSave: false })}
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">제공 토큰</Typography>

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
                              onChange={handleSwap1}
                              value={selected1}
                              displayEmpty
                            >
                              <MenuItem value=""><em>---토큰 선택---</em></MenuItem>
                              {options1}
                            </Select>
                          </FormControl>
                        </Box>

                        <Button
                          variant="secondary"
                          onClick={() => createClose({ isSave: false })}
                        >
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => createClose({ isSave: true })}
                        >
                          Save Changes
                        </Button>
                      </Typography>
                    </Box>
                  </Modal>
                </>
              </Grid>
              <Grid item xs={3}>
                <h3 className="about">{choice1}</h3>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className="about" xs={12}>
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
              <Grid item xs={4}><b className="swapInfo">잔액</b></Grid>
              <Grid item className="about" xs={8}>
                {Number(tokenAmount1).toFixed(3)}
              </Grid>
            </Grid>
          </Box>
        </section>
        <br />

        <section className="todoo-wrapper">
          {todoo}
          <Button variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          </Button>
        </section>

        <section className="todo-wrapper">
          {todo}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}><h4 className="st">수령</h4></Grid>
              {/* <Col sm={4}>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="수수료포함"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                    </div>
                  ))}
                </Form>
              </Col> */}
            </Grid>
          </Box>
        </section>

        <section className="todos-wrapper">
          {children}
          <Box sx={{ flexGrow: 1 }} className="todos-wrap">

            <Grid container spacing={3}>
              <Grid item xs={9}>
                <>
                  <Button variant="primary" onClick={handleShow}>
                    토큰
                  </Button>

                  <Modal
                    open={show}
                    onClose={() => handleClose({ isSave: false })}
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">수령 토큰</Typography>

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
                              onChange={handleSwap2}
                              value={selected2}
                              displayEmpty
                            >
                              <MenuItem value=""><em>---토큰 선택---</em></MenuItem>
                              {options2}
                            </Select>
                          </FormControl>
                        </Box>

                        <Button
                          variant="secondary"
                          onClick={() => handleClose({ isSave: false })}
                        >
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleClose({ isSave: true })}
                        >
                          Save Changes
                        </Button>
                      </Typography>
                    </Box>
                  </Modal>
                </>
              </Grid>
              <Grid item xs={3}>
                <h3 className="about">{choice2}</h3>
              </Grid>

            </Grid>

            <Grid container spacing={3}>
              <Grid item className="about" xs={12}>
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
              <Grid item xs={4}><b className="swapInfo">잔액</b></Grid>
              <Grid item className="about" xs={8}>
                {Number(tokenAmount2).toFixed(3)}
              </Grid>
            </Grid>
          </Box>
        </section>

        <div className="button-wrapper">
          {teacher}
          <br />
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg" onClick={swap}>
              Swap
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Swap;