import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Caver = require("caver-js");
const caver = new Caver(window.klaytn);

const Farmingabi = require('../../contract/farming.json');
const DexRouterabi = require('../../contract/router.json');
const wklayabi = require('../../contract/wklay.json');

const farmingAddress = '0x3E62CB2A987F0Dc750541f092bA46EbF08020648';
const RouterAddress = '0x63e3cB8C959068DD947c3FadF7455044B5C36b8f';
const wklayAddress = '0xfCd11e485Fc0f7CCd31933E3BA1544488F13e5E1';

const FarmingContract = new caver.klay.Contract(Farmingabi, farmingAddress);
const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);
const wklayContract = new caver.klay.Contract(wklayabi, wklayAddress);

function KlayPair() {

	const [depo, setDeposit] = useState(false);
	const [widr, setWithdraw] = useState(false);

	const [selectPair, setSelectPair] = useState([]);

	const depositShow = (el) => {
		setSelectPair(el);
		setDeposit(true);
	}
	const depositClose = () => setDeposit(false);

	const withdrawShow = (el) => {
		setSelectPair(el);
		setWithdraw(true);
	}
	const withdrawClose = () => setWithdraw(false);

	const dummydata = {
		token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1'
	}

	const address = useSelector((state) => state.counter);
	const deadline = parseInt('' + new Date().getTime() / 1000) + 100000;

	const [DepositAmount1, setDepositAmount1] = useState("");
	const [DepositAmount2, setDepositAmount2] = useState("");
	const [WithdrawAmount, setWithdrawAmount] = useState("");
	const handleDepositInput1 = (e) => { setDepositAmount1(caver.utils.toPeb(e.target.value, "KLAY")) };
	const handleDepositInput2 = (e) => { setDepositAmount2(caver.utils.toPeb(e.target.value, "KLAY")) };
	const handleWithdrawInput = (e) => { setWithdrawAmount(caver.utils.toPeb(e.target.value, "KLAY")) };
	const [depositedAmount, setdepositedAmount] = useState("0");
	const [RewardAmount, setRewardAmount] = useState("0");



	// 페어풀 조회
	// klay pair

	const [KlayData, setKlayData] = useState([{ token_address: '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d1' }]);
	const [KlayPool, setKlayPool] = useState([dummydata]);
	const getKlayPool = async () => {
		await axios.get(`http://localhost:4000/staking/klaypool/`)
			.then((res) => {
				setKlayPool(() => {
					return res.data['data']
				})
			})
	};

	useEffect(() => {
		getKlayPool();
	}, []);

	const Klay_Pool = async (list) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			let el = list[i];
			// console.log(el.token_address)
			let depositedValue = await FarmingContract.methods.userInfo(el.pid, address.number).call();
			let totalStaked = await FarmingContract.methods.poolInfo(el.pid).call();

			let obj = {
				pair_name: el.pair_name,
				pair_address: el.pair_address,
				token_address: el.token_address,
				token_amount: '토큰 수량',
				token_price: "가격",
				pid: el.pid,
				depositedValue: caver.utils.fromPeb(depositedValue[0]),
				totalStaked: caver.utils.fromPeb(totalStaked[3])
			}
			arr.push(obj);
		}
		setKlayData(arr);
	}
	useEffect(() => {
		Klay_Pool(KlayPool);
	}, [KlayPool])

	const Deposit = async () => {
		const kip7 = new caver.klay.KIP7(selectPair.token_address);
		const allowedA = await wklayContract.methods.allowance(address.number, RouterAddress);
		const allowedB = await kip7.allowance(address.number, RouterAddress);
		if (allowedA <= DepositAmount1) {
			const approve1 = await wklayAddress.methods.approve(RouterAddress, caver.utils.toPeb(DepositAmount1, "KLAY"), {
				from: address.number,
			});
		}
		if (allowedB <= DepositAmount2) {
			const approve2 = await kip7.approve(RouterAddress, caver.utils.toPeb(DepositAmount2, "KLAY"), {
				from: address.number,
			});
		}

		let addliquidity = await DexRouterContract.methods.addLiquidityKLAY(selectPair.token_address, DepositAmount2, 0, 0, address.number, deadline).send(
			{
				from: address.number,
				gas: 50000000,
				value: DepositAmount1,
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
	}, [selectPair, depositedAmount, KlayPool])

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
		let RemoveLiquidity = await DexRouterContract.methods.removeLiquidityKLAY(selectPair.token_address, caver.utils.toBN(WithdrawAmount), 0, 0, address.number, deadline).send(
			{
				from: address.number,
				gas: 50000000,
			}
		)
		setWithdraw(false)
	}
	return (
		<div>
			<Row xs={1} md={1} className="g-4">
				{Array.from({ length: 1 }).map((_, idx) => (
					<Col xs={18} md={12}>
						{KlayData.map((el) => (
							<Card
								bg={'Secondary'}
								key={el.pid}
								text={'dark'}
								border={'Secondary'}
								className="mb-4"
							>
								<Row>
									<Col sm={9}>
										<Card.Body>
											<Row>
												<Col sm={4}>
													<h6>[ KLAY PAIR ]</h6>
													<Card.Title><p className='tname'><h3>{el.pair_name}</h3></p></Card.Title>
												</Col>
												<Col sm={8}>
													<Card.Text>
														<Row>
															<Col>
															<b><p className='ap'>총 예치규모</p></b>
														<h5><p className='num'>{el.totalStaked}</p></h5>
														</Col>
															<Col>
															<b><p className='ap'>나의 예치한 양</p></b>
														<h5><span className='num' key={el.pid}>{Number(el.depositedValue).toFixed(1)}</span><span className='lp'> {el.pair_name}</span></h5>
														</Col>
														</Row>
														
														
													</Card.Text>
												</Col>
											</Row>
										</Card.Body>
									</Col>
									<Col sm={3}>
										<div className="d-grid gap-3">

											<>
												<Button variant="dark" onClick={() => depositShow(el)} >Deposit</Button>
												<Modal
													size="lg"
													show={depo}
													onHide={depositClose}
													backdrop="static"
													keyboard={false}
													aria-labelledby="example-modal-sizes-title-sm"
												>
													<Modal.Header closeButton>
														{/* 선택한 카드의 풀 이름과 맵핑 */}
														<Modal.Title>{selectPair.pair_name} Deposit</Modal.Title>
													</Modal.Header>
													<Modal.Body>
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
														<Form>
															{/* Deposit Input  */}
															{/* 토큰 이름, 심볼, 매핑 필요  */}
															<Form.Label>KLAY</Form.Label>
															<InputGroup className="mb-3">
																<Form.Control
																	type="text"
																	placeholder="예치할 KLAY 수량"
																	autoFocus
																	aria-label="Default"
																	aria-describedby="inputGroup-sizing-default"
																	onChange={(e) => handleDepositInput1(e)}
																/>
																<InputGroup.Text id="inputGroup-sizing-default">KLAY</InputGroup.Text>
															</InputGroup>

															<Form.Label>Token2 Name</Form.Label>
															<p>address: {selectPair.token_address}</p>
															<InputGroup className="mb-3">
																<Form.Control
																	type="text"
																	placeholder="예치할 토큰2 수량"
																	autoFocus
																	aria-label="Default"
																	aria-describedby="inputGroup-sizing-default"
																	onChange={(e) => handleDepositInput2(e)}
																/>
																<InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰2심볼]</InputGroup.Text>
															</InputGroup>
														</Form>
													</Modal.Body>
													<Modal.Footer>
														<Button variant="secondary" onClick={depositClose}>
															취소
														</Button>
														<Button type="submit" variant="primary" onClick={Deposit}>확인</Button>
													</Modal.Footer>
												</Modal>

												<Button variant="outline-secondary" onClick={() => withdrawShow(el)}>Withdraw</Button>
												<Modal
													size="lg"
													show={widr}
													onHide={withdrawClose}
													backdrop="static"
													keyboard={false}
													aria-labelledby="example-modal-sizes-title-sm"
												>
													<Modal.Header closeButton>
														{/* 선택한 카드의 풀 이름과 맵핑 */}
														<Modal.Title>{selectPair.pair_name} Withdraw</Modal.Title>
													</Modal.Header>
													<Modal.Body>
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
														<Form>
															{/* Withdraw Input  */}
															{/* 토큰 이름, 심볼, 매핑 필요  */}
															<Form.Label>{selectPair.pair_name}</Form.Label>
															<p>address: {selectPair.pair_address}</p>
															<p>출금가능한 LP 토큰: {Number(depositedAmount).toFixed(2)}</p>
															<p>수령가능한 리워드: {Number(RewardAmount).toFixed(2)}</p>
															<InputGroup className="mb-3">
																<Form.Control
																	type="text"
																	placeholder="출금할 토큰1 수량"
																	autoFocus
																	aria-label="Default"
																	aria-describedby="inputGroup-sizing-default"
																	onChange={(e) => handleWithdrawInput(e)}
																/>
																<InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰1심볼]</InputGroup.Text>
															</InputGroup>

														</Form>
													</Modal.Body>
													<Modal.Footer>
														<Button variant="secondary" onClick={withdrawClose}>
															취소
														</Button>
														<Button type="submit" variant="primary" onClick={Withdraw}>확인</Button>
													</Modal.Footer>
												</Modal>
											</>
										</div>
									</Col>
								</Row>
							</Card>
						))}
					</Col>
				))}
			</Row>
		</div>

	);
}

export default KlayPair;