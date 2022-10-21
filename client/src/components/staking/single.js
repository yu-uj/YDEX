import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
// import { Box, Card, CardActions, CardActionArea, CardContent, CardMedia, Typography, Grid, Button, Modal, Form, InputGroup } from '@mui/material';
import '../../assets/css/Page.css';
import { useSelector } from "react-redux";

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
			<Row className="g-4">
				<Col>
					<Card
						bg={'Secondary'}
						key={'Secondary'}
						text={'dark'}
						border={'Secondary'}
						className="mb-4"
					>
						<Row>
							<Col sm={9}>
								<Card.Body>
									<Row>
										<Col sm={3}>
											<h6>[ KIP7 Token ]</h6>
											<Card.Title><p className='tname'><h3>JdToken</h3></p></Card.Title>
										</Col>
										<Col sm={9}>
											<Card.Text>
												<b><p className='ap'>총 예치규모</p></b>
												<h5><p className='num'>{totalstaked}</p></h5>
											</Card.Text>
										</Col>
									</Row>
								</Card.Body>
							</Col>
							<Col sm={3}>
								<div className="d-grid gap-3">

									<>
										<Button variant="dark" onClick={depositShow} >Deposit</Button>
										<Modal
											show={depo}
											onHide={depositClose}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>JdToken Deposit</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Deposit Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">JdToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">JD</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={depositClose}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer1}>확인</Button>
											</Modal.Footer>
										</Modal>

										<Button variant="outline-secondary" onClick={withdrawShow}>Withdraw</Button>
										<Modal
											show={widr}
											onHide={withdrawClose}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>JdToken Withdraw</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Withdraw Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">JdToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">JD</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>

											<Modal.Footer>
												<Button variant="secondary" onClick={withdrawClose}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer2}>확인</Button>
											</Modal.Footer>
										</Modal>
									</>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>


			<Row className="g-4">
				<Col>
					<Card
						bg={'Secondary'}
						key={'Secondary'}
						text={'dark'}
						border={'Secondary'}
						className="mb-4"
					>
						<Row>
							<Col sm={9}>
								<Card.Body>
									<Row>
										<Col sm={3}>
											<h6>[ KIP7 Token ]</h6>
											<Card.Title><p className='tname'><h3>YUToken</h3></p></Card.Title>
										</Col>
										<Col sm={9}>
											<Card.Text>
												<b><p className='ap'>총 예치규모</p></b>
												<h5><p className='num'>{totalstaked1}</p></h5>
											</Card.Text>
										</Col>
									</Row>
								</Card.Body>
							</Col>
							<Col sm={3}>
								<div className="d-grid gap-3">

									<>
										<Button variant="dark" onClick={depositShow1} >Deposit</Button>
										<Modal
											show={depo1}
											onHide={depositClose1}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>YUToken Deposit</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Deposit Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">YUToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">YU</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={depositClose1}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer3}>확인</Button>
											</Modal.Footer>
										</Modal>

										<Button variant="secondary" onClick={withdrawShow1}>Withdraw</Button>
										<Modal
											show={widr1}
											onHide={withdrawClose1}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>YUToken Withdraw</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Withdraw Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">YUToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">YU</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>

											<Modal.Footer>
												<Button variant="secondary" onClick={withdrawClose1}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer4}>확인</Button>
											</Modal.Footer>
										</Modal>
									</>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>


			<Row className="g-4">
				<Col>
					<Card
						bg={'Secondary'}
						key={'Secondary'}
						text={'dark'}
						border={'Secondary'}
						className="mb-4"
					>
						<Row>
							<Col sm={9}>
								<Card.Body>
									<Row>
										<Col sm={3}>
											<h6>[ KIP7 Token ]</h6>
											<Card.Title><p className='tname'><h3>YKToken</h3></p></Card.Title>
										</Col>
										<Col sm={9}>
											<Card.Text>
												<b><p className='ap'>총 예치규모</p></b>
												<h5><p className='num'>{totalstaked2}</p></h5>
											</Card.Text>
										</Col>
									</Row>
								</Card.Body>
							</Col>
							<Col sm={3}>
								<div className="d-grid gap-3">

									<>
										<Button variant="dark" onClick={depositShow2}>Deposit</Button>
										<Modal
											show={depo2}
											onHide={depositClose2}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>YKToken Deposit</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Deposit Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">YKToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="예치할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">YKT</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={depositClose2}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer5}>확인</Button>
											</Modal.Footer>
										</Modal>

										<Button variant="secondary" onClick={withdrawShow2}>Withdraw</Button>
										<Modal
											show={widr2}
											onHide={withdrawClose1}
											backdrop="static"
											keyboard={false}
											aria-labelledby="example-modal-sizes-title-sm"
										>
											<Modal.Header closeButton>
												{/* 선택한 카드의 풀 이름과 맵핑 */}
												<Modal.Title>YKToken Withdraw</Modal.Title>
											</Modal.Header>
											<Modal.Body>
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
												<Form>
													{/* Withdraw Input  */}
													{/* 토큰 이름, 심볼, 매핑 필요  */}
													<Form.Label as="h5">YKToken</Form.Label>
													<InputGroup className="mb-3">
														<Form.Control
															type="text"
															placeholder="출금할 토큰 수량"
															autoFocus
															aria-label="Default"
															aria-describedby="inputGroup-sizing-default"
															onChange={(e) => handleInput2(e)}
														/>
														<InputGroup.Text id="inputGroup-sizing-default">YKT</InputGroup.Text>
													</InputGroup>
												</Form>
											</Modal.Body>

											<Modal.Footer>
												<Button variant="secondary" onClick={withdrawClose2}>
													취소
												</Button>
												<Button type="submit" variant="primary" onClick={handleTransfer6}>확인</Button>
											</Modal.Footer>
										</Modal>
									</>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>


		</div>


	);
}

export default Single;