import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
import Create from "./create";
import KlayPair from './klaypair';
import Kip7Pair from './kip7pair';
import '../../assets/css/Page.css';

function Pair() {
	const [key, setKey] = useState('ALL PAIR POOL LIST');

	return (
		<div className='Pool'>
			<Row>
				<Col md={8}>
					<div className="pageInfo">
						<h2>Pair Pool List</h2>
						<p>KLAY와 KIP7 토큰의 <b>페어 풀</b> 목록을 확인하고, <br /> 원하는 풀에 <b>예치</b> 및 <b>출금</b> 할 수 있습니다.</p>
					</div>
				</Col>
				<Col md={4}>
					<div className="pageInfo">
						<br />
						<h6 className="pageInfoP">Now you watching </h6>
						<h3 className="pageInfoP">" {key} "</h3>
					</div>
				</Col>
			</Row>
			<br />
			<Tabs
				id="controlled-tab-example"
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className="mb-4"
			>
				<Tab eventKey="ALL PAIR POOL LIST" title="ALL PAIR">
					<KlayPair />
					<Kip7Pair />
				</Tab>
				<Tab eventKey="KLAY PAIR POOL LIST" title="KLAY PAIR">
					<KlayPair />
				</Tab>
				<Tab eventKey="KIP7 PAIR POOL LIST" title="KIP7 PAIR">
					<Kip7Pair />
				</Tab>
			</Tabs>
			<Create />
		</div>

	);
}

export default Pair;