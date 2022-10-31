import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Modal, FormControl, OutlinedInput, InputLabel, InputAdornment, Stack } from '@mui/material';

import { useSelector } from "react-redux";

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

const cardStyle = {
	width: '100%',
	border: '2px',
	boxShadow: 24,
	p: 2,
	textAlign: 'center'
};

const Caver = require('caver-js');
const caver = new Caver(window.klaytn);

const singlepoolabi = require('../../contract/singlepool.json');

const yktokenpoolAddress = '0xaa80658f5a86562f07BdF7caD649299BA3997036';
const jdtokenpoolAddress = '0xEF9b295fc00D6B3CE3465fF82CFBc159e2abd747';
const yutokenpoolAddress = '0x325e857E8Fd7F51e4682C1B42ec3b40c1E325550';


const ykpoolContract = new caver.klay.Contract(singlepoolabi, yktokenpoolAddress);
const jdpoolContract = new caver.klay.Contract(singlepoolabi, jdtokenpoolAddress);
const yupoolContract = new caver.klay.Contract(singlepoolabi, yutokenpoolAddress);

function Single() {
	const [depo, setDeposit] = useState(false);
	const [widr, setWithdraw] = useState(false);

	const [depo1, setDeposit1] = useState(false);
	const [widr1, setWithdraw1] = useState(false);

	const [depo2, setDeposit2] = useState(false);
	const [widr2, setWithdraw2] = useState(false);

	const [lend, setLend] = useState(false);
	const [repay, setRepay] = useState(false);

	const [totalstaked, setTotalstaked] = useState('');
	const [totalstaked1, setTotalstaked1] = useState('');
	const [totalstaked2, setTotalstaked2] = useState('');

	const [mystaked, setMystaked] = useState('');
	const [mystaked1, setMystaked1] = useState('');
	const [mystaked2, setMystaked2] = useState('');

	const depositShow = () => setDeposit(true);
	const depositClose = () => setDeposit(false);

	const depositShow1 = () => setDeposit1(true);
	const depositClose1 = () => setDeposit1(false);

	const depositShow2 = () => setDeposit2(true);
	const depositClose2 = () => setDeposit2(false);

	const withdrawShow = () => setWithdraw(true);
	const withdrawClose = () => setWithdraw(false);

	const withdrawShow1 = () => setWithdraw1(true);
	const withdrawClose1 = () => setWithdraw1(false);

	const withdrawShow2 = () => setWithdraw2(true);
	const withdrawClose2 = () => setWithdraw2(false);

	const lendShow = () => setLend(true);
	const lendClose = () => setLend(false);

	const repayShow = () => setRepay(true);
	const repayClose = () => setRepay(false);

	const JdToken_Address = "0xE807326D86f631495Bb9c1F8888604879c18E5BB";

	const YUToken_Address = "0xd7877710190E492561F692a08117c63e32cf8ac1";

	const YKTToken_Address = "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d";

	const address = useSelector((state) => state.counter);

	const [amount, setAmount] = useState("");

	const handleInput2 = (e) => { setAmount(e.target.value) };

	const handleTransfer1 = async () => {

		const kip7 = new caver.klay.KIP7(JdToken_Address);

		const allowed = await kip7.allowance(address.number, jdtokenpoolAddress);
		if (allowed.toString() === "0") {
			try {
				await kip7.approve(jdtokenpoolAddress, caver.utils.toPeb("100000000"), {
					from: address.number,
				});
			} catch (err) {
				console.log(err);
			}
		}
		await jdpoolContract.methods.deposit(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setDeposit(false)
	};

	const handleTransfer2 = async () => {
		await jdpoolContract.methods.withdraw(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setWithdraw(false);
	};

	const handleTransfer3 = async () => {

		const kip7 = new caver.klay.KIP7(YUToken_Address);

		const allowed = await kip7.allowance(address.number, yutokenpoolAddress);
		if (allowed.toString() === "0") {
			try {
				await kip7.approve(yutokenpoolAddress, caver.utils.toPeb("100000000"), {
					from: address.number,
				});
			} catch (err) {
				console.log(err);
			}
		}
		await yupoolContract.methods.deposit(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setDeposit1(false)
	};

	const handleTransfer4 = async () => {
		await yupoolContract.methods.withdraw(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });

		setWithdraw1(false)
	};

	const handleTransfer5 = async () => {

		const kip7 = new caver.klay.KIP7(YKTToken_Address);

		const allowed = await kip7.allowance(address.number, yktokenpoolAddress);
		if (allowed.toString() === "0") {
			try {
				await kip7.approve(yktokenpoolAddress, caver.utils.toPeb("100000000"), {
					from: address.number,
				});
			} catch (err) {
				console.log(err);
			}
		}
		await ykpoolContract.methods.deposit(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setDeposit2(false)
	};

	const handleTransfer6 = async () => {
		await ykpoolContract.methods.withdraw(caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setWithdraw2(false)
	};
	const Totalstaked = async () => {
		let a = await jdpoolContract.methods.pool().call();
		setTotalstaked(caver.utils.fromPeb(a[11], "KLAY"));
	}
	const Totalstaked1 = async () => {
		let a = await yupoolContract.methods.pool().call();
		setTotalstaked1(caver.utils.fromPeb(a[11], "KLAY"));
	}
	const Totalstaked2 = async () => {
		let a = await ykpoolContract.methods.pool().call();
		setTotalstaked2(caver.utils.fromPeb(a[11], "KLAY"));
	}

	useEffect(() => {
		Totalstaked();
		Totalstaked1();
		Totalstaked2();
	}, []);

	const MyStaked = async () => {
		let a = await jdpoolContract.methods.userInfo(address.number).call();
		setMystaked(caver.utils.fromPeb(a[0], "KLAY"));
	}
	const MyStaked1 = async () => {
		let a = await yupoolContract.methods.userInfo(address.number).call();
		setMystaked1(caver.utils.fromPeb(a[0], "KLAY"));
	}
	const MyStaked2 = async () => {
		let a = await ykpoolContract.methods.userInfo(address.number).call();
		setMystaked2(caver.utils.fromPeb(a[0], "KLAY"));
	}
	useEffect(() => {
		MyStaked();
		MyStaked1();
		MyStaked2();
	}, []);


	return (
		<div className="Pool">
			<div className="pageInfo">
				<h2>Single Pool List</h2>
				<p>KLAY와 KIP7 토큰의 <b>싱글 풀</b> 목록을 확인하고, <br /> 원하는 풀에 <b>예치</b> 및 <b>출금</b> 할 수 있습니다.</p>
			</div>
			<br />
			<br />
			<Stack spacing={1}>
				<Card
					key={'Secondary'}
					sx={cardStyle}
				>
					<CardContent>
						<Grid container>
							<Grid xs={3}>
								<Typography gutterBottom variant="h6">[ KIP7 Token ]</Typography>
								<Typography gutterBottom variant="h5">JdToken</Typography>
							</Grid>
							<Grid xs={5}>
								<Stack>
									<Typography variant="body2" color="text.secondary">총 예치규모</Typography>
									<Typography variant="h5" component="h6">{totalstaked}</Typography>
								</Stack>
							</Grid>
							<Grid xs={4}>
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={depositShow} >Deposit</Button>
									<Modal
										open={depo}
										onClose={depositClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Deposit Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={depositClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer1}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={withdrawShow}>Withdraw</Button>
									<Modal
										open={widr}
										onClose={withdrawClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Withdraw Input  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={withdrawClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer2}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

								{/* 대출!!!!! */}
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={lendShow} >Lend</Button>
									<Modal
										open={lend}
										onClose={lendClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Lending Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="대출할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={lendClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer1}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={repayShow}>Repay</Button>
									<Modal
										open={repay}
										onClose={repayClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 대출 금액</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Repay Input  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="상환할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={repayClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer2}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

							</Grid>
						</Grid>
					</CardContent>
				</Card>


				<Card
					key={'Secondary'}
					sx={cardStyle}
				>
					<CardContent>
						<Grid container>
							<Grid xs={3}>
								<Typography gutterBottom variant="h6">[ KIP7 Token ]</Typography>
								<Typography gutterBottom variant="h5">YUToken</Typography>
							</Grid>
							<Grid xs={5}>
								<Stack>
									<Typography variant="body2" color="text.secondary">총 예치규모</Typography>
									<Typography variant="h5" component="h6">{totalstaked1}</Typography>
								</Stack>
							</Grid>
							<Grid xs={4}>
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={depositShow1} >Deposit</Button>
									<Modal
										open={depo1}
										onClose={depositClose1}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">YUToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked1}</strong>
													<span> YU</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Deposit Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<InputLabel component="h5">YUToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">YU</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={depositClose1}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer3}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={withdrawShow1}>Withdraw</Button>
									<Modal
										open={widr1}
										onClose={withdrawClose1}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">YUToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked1}</strong>
													<span> YU</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Withdraw Input  */}
													<InputLabel component="h5">YUToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">YU</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={withdrawClose1}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer4}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

								{/* 대출!!!!! */}
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={lendShow} >Lend</Button>
									<Modal
										open={lend}
										onClose={lendClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Lending Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="대출할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={lendClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer1}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={repayShow}>Repay</Button>
									<Modal
										open={repay}
										onClose={repayClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 대출 금액</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Repay Input  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="상환할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={repayClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer2}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

							</Grid>
						</Grid>
					</CardContent>
				</Card>

				<Card
					key={'Secondary'}
					sx={cardStyle}
				>
					<CardContent>
						<Grid container>
							<Grid xs={3}>
								<Typography gutterBottom variant="h6" component="div">[ KIP7 Token ]</Typography>
								<Typography gutterBottom variant="h5" component="div">YKToken</Typography>
							</Grid>
							<Grid xs={5}>
								<Stack>
									<Typography variant="body2" color="text.secondary">총 예치규모</Typography>
									<Typography variant="h5" component="h6">{totalstaked2}</Typography>
								</Stack>
							</Grid>
							<Grid xs={4}>
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={depositShow2}>Deposit</Button>
									<Modal
										open={depo2}
										onClose={depositClose2}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">YKToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked2}</strong>
													<span> YKT</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Deposit Input  */}
													<InputLabel component="h5">YKToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">YKT</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={depositClose2}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer5}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={withdrawShow2}>Withdraw</Button>
									<Modal
										open={widr2}
										onClose={withdrawClose1}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											{/* 선택한 카드의 풀 이름과 맵핑 */}
											<Typography id="modal-modal-title" variant="h6" component="h2">YKToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked2}</strong>
													<span> YKT</span>
													<br />
													<br />
													<h5>내 지분</h5>
													<strong>[보유지분율]</strong>
													<span>%</span>
													<br />
													<br />
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Withdraw Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<InputLabel component="h5">YKToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">YTK</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={withdrawClose2}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer6}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

								{/* 대출!!!!! */}
								<Stack direction="row" spacing={1} sx={{ p:0.5 }}>
									<Button fullWidth variant="contained" onClick={lendShow} >Lend</Button>
									<Modal
										open={lend}
										onClose={lendClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Deposit</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 예치 자산</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Lending Input  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="대출할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={lendClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer1}>확인</Button>
											</Stack>
										</Box>
									</Modal>

									<Button fullWidth variant="outlined" onClick={repayShow}>Repay</Button>
									<Modal
										open={repay}
										onClose={repayClose}
										backdrop="static"
										keyboard={false}
									>
										<Box sx={style}>
											<Typography id="modal-modal-title" variant="h6" component="h2">JdToken Withdraw</Typography>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												<div>
													<h5>내 대출 금액</h5>
													<strong>{mystaked}</strong>
													<span> JD</span>
													
												</div>
												<Box
													component="form"
													sx={{
														'& > :not(style)': { width: 500, maxWidth: '100%' },
													}}
													noValidate
													autoComplete="off">
													{/* Repay Input  */}
													<InputLabel component="h5">JdToken</InputLabel>
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput fullWidth
															margin="dense"
															type="text"
															placeholder="상환할 토큰 수량"
															autoFocus
															aria-label="Default"
															endAdornment={<InputAdornment position="end">JD</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															// onChange={(e) => handleInput2(e)}
														/>
													</FormControl>
												</Box>
											</Typography>
											<br />
											<Stack direction="row" justifyContent="flex-end" spacing={2}>
												<Button variant="outlined" onClick={repayClose}>
													취소
												</Button>
												<Button type="submit" variant="outlined" onClick={handleTransfer2}>확인</Button>
											</Stack>
										</Box>
									</Modal>
								</Stack>

							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Stack>

		</div>


	);
}

export default Single;