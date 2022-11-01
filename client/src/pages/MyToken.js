import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TextField, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/Page.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
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

const Caver = require('caver-js');
const caver = new Caver(window.klaytn);

const KIP7ABI = require('../contract/KIP7.json');

function MyToken() {

  const [currentTokenAddress, setCurrentTokenAddress] = useState("");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (el) => {
    setCurrentTokenAddress(el.token_address);
    setShow(true);
  };
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [Toaddress, setToAddress] = useState(""); // 받는 사람 주소
  const [amount, setAmount] = useState(""); // 전송할 토큰 양

  const address = useSelector(state => state.counter);

  const [tokendata, settokendata] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);

  const [balance, setbalance] = useState("");
  const [KIP7bal, setKIP7bal] = useState("");

  const dummydata = {
    token_address: '0xE807326D86f631495Bb9c1F8888604879c18E5BB'
  }
  const handleInput1 = (e) => { setToAddress(e.target.value); };
  const handleInput2 = (e) => { setAmount(e.target.value) };

  const handleTransfer = () => {
    const contract = new window.caver.klay.Contract(KIP7ABI, currentTokenAddress); // abi, contract 주소 
    const transfer = contract.methods.transfer(Toaddress, caver.utils.toPeb(amount, 'KLAY')).send(
      {
        from: window.klaytn.selectedAddress,
        gas: 8000000
      });
    // console.log(transfer);
    setShow(false); // 모달 창 닫기
  }
  const handleTransfer1 = () => {
    window.caver.klay
      .sendTransaction({
        type: 'VALUE_TRANSFER',
        from: address.number, // 내 주소
        to: Toaddress, // 관리자 공개키 
        value: caver.utils.toPeb(amount, 'KLAY'),
        gas: 8000000
      })
      .once('transactionHash', transactionHash => {
      })
      .once('receipt', receipt => {
        const recipientAddress = receipt.from;
      })
      .once('error', error => {
        alert('취소되었습니다.')
      })
    setShow(false); // 모달 창 닫기
  }


  const [TokenList, setTokenList] = useState([dummydata]);
  const getTokenLists = async () => {
    await axios.get(`http://localhost:4000/mytoken/`)
      .then((res) => {
        setTokenList(() => {
          return res.data['data']
        })
      })
  };

  useEffect(() => {
    getTokenLists();
  }, []);

  // 수정
  const Token_List = async (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let el = list[i];

      const KIP7Contract = new caver.klay.Contract(
        KIP7ABI,
        el.token_address
      );
      let bal = await KIP7Contract.methods.balanceOf(address.number).call();
      let amount = caver.utils.fromPeb(bal, "KLAY");

      let obj = {
        token_name: el.token_name,
        token_amount: amount,
        token_price: '가격',
        token_address: el.token_address,
      };
      arr.push(obj);
    }
    settokendata(arr);
  };

  //console.log(tokendata)

  const klaybalance = async () => {
    let bal = await caver.klay.getBalance(address.number);
    let a = await caver.utils.fromPeb(bal, "KLAY");
    setbalance(a);
  };

  const KIP7balance = async () => {
    const KIP7Contract = await new caver.klay.Contract(KIP7ABI, tokendata[2].token_address);
    let bal = await KIP7Contract.methods.balanceOf(address.number).call();
    let a = await caver.utils.fromPeb(bal, "KLAY");
    setKIP7bal(a);
  };

  useEffect(() => {
    klaybalance();
    KIP7balance();
    Token_List(TokenList);
  }, [TokenList])

  return (
    <>
      <div className="pageInfo">
        <h2>My Token List</h2>
        <p>연결된 지갑에서 내가 보유하고 있는 <b>토큰</b>정보를 확인하고, <br /> 간편하게 <b>전송</b>해보세요.</p>
      </div>
      <br />
      <br />
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell><strong className='mlp'>Token name</strong></TableCell>
                <TableCell align="right"><strong className='mlp'>Amount</strong></TableCell>
                <TableCell align="right"><strong className='mlp'>Transfer</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row"><strong className='myklay'>KLAY</strong></TableCell>
                <TableCell align="right"><strong className='mnum'>{Number(balance).toFixed(1)}</strong></TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={handleShow1}>Transfer</Button>
                </TableCell>
              </TableRow>
              {tokendata.map((el) => (

                <TableRow key={el.token_name}>
                  <TableCell component="th" scope="row"><strong className='mytname'>{el.token_name}</strong></TableCell>
                  <TableCell align="right"><strong className='mnum'>{Number(el.token_amount).toFixed(1)}</strong></TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleShow(el)}>Transfer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={show} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Token Transfer</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: 500, maxWidth: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <Typography sx={{ mt: 1 }}>받는 사람 주소</Typography>
                  <TextField fullWidth
                    id="outlined-basic"
                    label="To Address"
                    margin="dense"
                    size="small"
                    variant="outlined"
                    placeholder="0x..."
                    autoFocus
                    onChange={(e) => handleInput1(e)}
                  />
                </div>
                <div>
                  <Typography sx={{ mt: 1 }}>보낼 수량</Typography>
                  <TextField fullWidth id="outlined-basic" label="Amount" margin="dense" size="small" variant="outlined" onChange={(e) => handleInput2(e)} />
                </div>
                <div>
                  <Typography sx={{ mt: 1 }}>토큰 트랜잭션 주소</Typography>
                  <TextField fullWidth
                    id="outlined-basic"
                    label="Recent Transaction"
                    margin="dense"
                    size="small"
                    variant="outlined"
                    placeholder={currentTokenAddress}
                    autoFocus
                    onChange={(e) => handleInput1(e)}
                  />
                </div>
              </Box>
            </Typography>
            <br />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="info" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="info" onClick={handleTransfer}>
                토큰 전송
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Modal open={show1} onClose={handleClose1}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Token Transfer</Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: 500, maxWidth: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <Typography sx={{ mt: 1 }}>받는 사람 주소</Typography>
                  <TextField fullWidth
                    id="outlined-basic"
                    label="To Address"
                    margin="dense"
                    size="small"
                    variant="outlined"
                    placeholder="0x..."
                    autoFocus
                    onChange={(e) => handleInput1(e)}
                  />
                </div>
                <div>
                  <Typography sx={{ mt: 1 }}>보낼 수량</Typography>
                  <TextField fullWidth id="outlined-basic" label="Amount" margin="dense" size="small" variant="outlined" onChange={(e) => handleInput2(e)} />
                </div>
              </Box>
            </Typography>
            <br />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="info" onClick={handleClose1}>
                Close
              </Button>
              <Button variant="contained" color="info" onClick={handleTransfer1}>
                토큰 전송
              </Button>
            </Stack>

          </Box>
        </Modal>
      </ThemeProvider>

    </>
  );
};

export default MyToken;