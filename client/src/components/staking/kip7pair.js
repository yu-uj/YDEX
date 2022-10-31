import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Modal, FormControl, OutlinedInput, InputLabel, InputAdornment, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);

const Farmingabi = require('../../contract/farming.json');
const DexRouterabi = require('../../contract/router.json');

const farmingAddress = '0x3E62CB2A987F0Dc750541f092bA46EbF08020648';
const RouterAddress = '0x63e3cB8C959068DD947c3FadF7455044B5C36b8f';

const FarmingContract = new caver.klay.Contract(Farmingabi, farmingAddress);
const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);

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

const cardStyle = {
	width: '100%',
	border: '2px',
	boxShadow: 24,
	p: 2,
	textAlign: 'center'
};

function Kip7Pair() {

	const [depo, setDeposit] = useState(false);
	const [widr, setWithdraw] = useState(false);

	const [selectPair, setSelectPair] = useState([]);

	const depositShow = (el) => {
		setSelectPair(el);
		setDeposit(true);
	};
	const depositClose = () => setDeposit(false);

	const withdrawShow = (el) => {
		setSelectPair(el);
		setWithdraw(true);
	}
	const withdrawClose = () => setWithdraw(false);

	const address = useSelector((state) => state.counter);
	const deadline = parseInt('' + new Date().getTime() / 1000) + 100000;


	const [DepositAmount1, setDepositAmount1] = useState("");
	const [DepositAmount2, setDepositAmount2] = useState("");
	const [WithdrawAmount, setWithdrawAmount] = useState("");
	const handleDepositInput1 = (e) => { setDepositAmount1(caver.utils.toPeb(e.target.value, "KLAY")) };
	const handleDepositInput2 = (e) => { setDepositAmount2(caver.utils.toPeb(e.target.value, "KLAY")) };
	const handleWithdrawInput = (e) => { setWithdrawAmount(caver.utils.toPeb(e.target.value, "KLAY")) };
	const [depositedAmount, setdepositedAmount] = useState("0");
	const [RewardAmount, setRewardAmount] = useState("");

	const dummydata = {
		token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
	}

	// 페어풀 조회
	// kip7 pair

	const [Kip7Data, setKip7Data] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);
	const [Kip7Pool, setKip7Pool] = useState([dummydata]);
	const getKip7Pool = async () => {
		await axios.get(`http://localhost:4000/staking/kip7pool/`)
			.then((res) => {
				setKip7Pool(() => {
					return res.data['data']
				})
			})
	};
	// console.log(Kip7Pool);

	useEffect(() => {
		getKip7Pool();
	}, []);

	const Kip7_Pool = async (list) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			let el = list[i];
			let depositedValue = await FarmingContract.methods.userInfo(el.pid, address.number).call();
			let totalStaked = await FarmingContract.methods.poolInfo(el.pid).call();

			let obj = {
				pair_name: el.pair_name,
				pair_address: el.pair_address,
				tokenA_address: el.tokenA_address,
				tokenB_address: el.tokenB_address,
				token_amount: '토큰 수량',
				token_price: "가격",
				pid: el.pid,
				depositedValue: caver.utils.fromPeb(depositedValue[0]),
				totalStaked: caver.utils.fromPeb(totalStaked[3]),
			}
			arr.push(obj);
		}
		setKip7Data(arr);
	}
	useEffect(() => {
		Kip7_Pool(Kip7Pool);
	}, [Kip7Pool])

	const Deposit = async () => {
		const kip7one = new caver.klay.KIP7(selectPair.tokenA_address);
		const kip7two = new caver.klay.KIP7(selectPair.tokenB_address);
		const allowedA = await kip7one.allowance(address.number, RouterAddress);
		const allowedB = await kip7two.allowance(address.number, RouterAddress);
		if (allowedA <= DepositAmount1) {
			const approve1 = await kip7one.approve(RouterAddress, caver.utils.toPeb(DepositAmount1, "KLAY"), {
				from: address.number,
			});
		}
		if (allowedB <= DepositAmount2) {
			const approve2 = await kip7two.approve(RouterAddress, caver.utils.toPeb(DepositAmount2, "KLAY"), {
				from: address.number,
			});
		}

		let addliquidity = await DexRouterContract.methods.addLiquidity(selectPair.tokenA_address, selectPair.tokenB_address, DepositAmount1, DepositAmount2, 0, 0, address.number, deadline).send(
			{
				from: address.number,
				gas: 50000000,
			}
		)
		let depositAmount = caver.utils.toBN((addliquidity.events[4].raw.data));

		const kip7pair = new caver.klay.KIP7(selectPair.pair_address);
		const allowed = await kip7pair.allowance(address.number, farmingAddress);
		if (allowed <= depositAmount) {
			const approve = await kip7pair.approve(farmingAddress, caver.utils.toPeb(10000000000000, "KLAY"), {
				from: address.number,
			});
		}
		// deposit을 지금 liquidity한 만큼 lp토큰을 넣어줘야하는데, addliquidity가 실행되었을 때 그 안의 값인 liquidity를 호출하는 방법?
		// event decodelog사용하는데 일단 트랜잭션 찍어봣을때 5번째 배열에담기는 값이 lp liquidity여서 임시로 사용
		// 아니면 liquidity했을때 받을 lp토큰 balance를 호출하는 방법
		// deposit(_pid, _amount) _pid는 DB에서 호출, _amount는 addliquidity했을때 받을 lp토큰을 호출해주면 될듯
		// pid도 귀찮으니까 일단 blockchain에서 호출해보자
		let deposit = await FarmingContract.methods.deposit(selectPair.pid, depositAmount).send(
			{
				from: address.number,
				gas: 50000000,
			}
		)
		setDeposit(false)
	}
	const DepositedAmount = async () => {
		let depositedAmount = await FarmingContract.methods.userInfo(selectPair.pid, address.number).call();
		setdepositedAmount(caver.utils.fromPeb(depositedAmount[0], "KLAY"));
		setRewardAmount(caver.utils.fromPeb(depositedAmount[1], "KLAY"))
	}
	useEffect(() => {
		DepositedAmount();
	}, [selectPair, depositedAmount])

	const Withdraw = async () => {
		let withdraw = await FarmingContract.methods.withdraw(selectPair.pid, caver.utils.toBN(WithdrawAmount)).send(
			{
				from: address.number,
				gas: 50000000,
			}
		)
		// lp토큰 router에 approve
		const kip7 = new caver.klay.KIP7(selectPair.pair_address);
		const allowed = await kip7.allowance(address.number, RouterAddress);
		if (allowed <= WithdrawAmount) {
			const approve = await kip7.approve(RouterAddress, caver.utils.toPeb(10000000000000, "KLAY"), {
				from: address.number,
			});
		}
		const approve1 = await kip7.approve(RouterAddress, caver.utils.toPeb('100000000000', "KLAY"), {
			from: address.number,
		});
		let RemoveLiquidity = await DexRouterContract.methods.removeLiquidity(selectPair.tokenA_address, selectPair.tokenB_address, caver.utils.toBN(WithdrawAmount), 0, 0, address.number, deadline).send(
			{
				from: address.number,
				gas: 50000000,
			}
		)
		setWithdraw(false)
	}

	return (
		<div>
			<Stack>
				{Array.from({ length: 1 }).map((_, idx) => (
					<Stack spacing={1}>
						{Kip7Data.map((el) => (
							<Card
								key={el.pair_address}
								sx={cardStyle}
							>
								<CardContent>
									<Grid container>
										<Grid xs={3}>
											<Typography gutterBottom variant="h6">[ KIP7 PAIR ]</Typography>
											<Typography gutterBottom variant="h5">{el.pair_name}</Typography>
										</Grid>
										<Grid xs={3}>
											<Stack>
												<Typography variant="body2" color="text.secondary">총 예치규모</Typography>
												<Typography variant="h5" component="h6">{Number(el.totalStaked).toFixed(2)}</Typography>
											</Stack>
										</Grid>
										<Grid xs={3}>
											<Stack>
												<Typography variant="body2" color="text.secondary">나의 예치한 양</Typography>
												<Typography variant="h5" component="h6"><span className='num' key={el.pid}>{Number(el.depositedValue).toFixed(2)}</span><span className='lp'> {el.pair_name}</span></Typography>
											</Stack>
										</Grid>
										<Grid xs={3}>
											<Stack spacing={1}>
												<Button variant="contained" onClick={() => depositShow(el)} >Deposit</Button>
												<Modal
													open={depo}
													onClose={depositClose}
													backdrop="static"
													keyboard={false}
												>
													<Box sx={style}>
														{/* 선택한 카드의 풀 이름과 맵핑 */}
														<Typography id="modal-modal-title" variant="h6" component="h2">{selectPair.pair_name} Deposit</Typography>

														<Typography id="modal-modal-description" sx={{ mt: 2 }}>
															<div>
																<h5>내 예치 자산</h5>
																<strong>{Number(depositedAmount).toFixed(2)}</strong>
																<span>{/*[토큰심볼]*/}</span>
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
																<InputLabel component="h5">Token1 Name</InputLabel>
																<p>address: {selectPair.tokenA_address}</p>
																<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
																	<OutlinedInput fullWidth
																		margin="dense"
																		type="text"
																		placeholder="예치할 토큰1 수량"
																		autoFocus
																		aria-label="Default"
																		endAdornment={<InputAdornment position="end">[토큰1심볼]</InputAdornment>}
																		aria-describedby="outlined-weight-helper-text"
																		onChange={(e) => handleDepositInput1(e)}
																	/>
																</FormControl>

																<InputLabel component="h5">Token2 Name</InputLabel>
																<p>address: {selectPair.tokenB_address}</p>
																<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
																	<OutlinedInput fullWidth
																		margin="dense"
																		type="text"
																		placeholder="예치할 토큰2 수량"
																		autoFocus
																		aria-label="Default"
																		endAdornment={<InputAdornment position="end">[토큰2심볼]</InputAdornment>}
																		aria-describedby="outlined-weight-helper-text"
																		onChange={(e) => handleDepositInput2(e)}

																	/>
																</FormControl>
															</Box>
														</Typography>
														<Button variant="outlined" onClick={depositClose}>
															취소
														</Button>
														<Button type="submit" variant="outlined" onClick={Deposit}>확인</Button>
													</Box>
												</Modal>

												<Button variant="outlined" onClick={() => withdrawShow(el)}>Withdraw</Button>
												<Modal
													open={widr}
													onClose={withdrawClose}
													backdrop="static"
													keyboard={false}
												>
													<Box sx={style}>

														{/* 선택한 카드의 풀 이름과 맵핑 */}
														<Typography id="modal-modal-title" variant="h6" component="h2">{selectPair.pair_name} Withdraw</Typography>
														<Typography id="modal-modal-description" sx={{ mt: 2 }}>
															<div>
																<h5>내 예치 자산</h5>
																<strong>0{/*[예치한토큰갯수]*/}</strong>
																<span>{/*[토큰심볼]*/}</span>
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
																<InputLabel component="h5">{selectPair.pair_name}</InputLabel>
																<p>address: {selectPair.pair_address}</p>
																<p>출금가능한 LP 토큰: {Number(depositedAmount).toFixed(2)}</p>
																<p>수령가능한 리워드: {Number(RewardAmount).toFixed(2)}</p>
																<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
																	<OutlinedInput fullWidth
																		margin="dense"
																		type="text"
																		placeholder="출금할 토큰1 수량"
																		autoFocus
																		aria-label="Default"
																		endAdornment={<InputAdornment position="end">[페어토큰심볼]</InputAdornment>}
																		aria-describedby="outlined-weight-helper-text"
																		onChange={(e) => handleWithdrawInput(e)}
																	/>
																</FormControl>
															</Box>
														</Typography>
														<Button variant="outlined" onClick={withdrawClose}>
															취소
														</Button>
														<Button type="submit" variant="outlined" onClick={Withdraw}>확인</Button>
													</Box>
												</Modal>
											</Stack>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						))}
					</Stack>
				))}
			</Stack>
		</div>
	);
}

export default Kip7Pair;