import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";
import CounterContainer from '../redux/CounterContainer';
import '../assets/css/Page.css';

function DashBoard() {

    return (

        <div>
            <div className="pageInfo">
				<h2>DashBoard</h2>
                <h3>[구현중]</h3>
				<p>JDEX의 거래 내역에 대한 그래프 확인할 수  있습니다.</p>
			</div>
            <Container>
                <Row>
                    <Col xs={6}>
                        <img src="img/sol.jpeg" />

                    </Col>
                    <Col xs={6}>
                        <div><br></br><h3>현재 claim된 amount보여주기</h3><br></br><br></br><br></br><br></br></div>
                        <div><br></br><h3>보상 token Staking amount 보여주기</h3><br></br><br></br><br></br><br></br></div>
                        <div><br></br><h3>소각 amount 보여주기</h3><br></br><br></br><br></br><br></br></div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default DashBoard;