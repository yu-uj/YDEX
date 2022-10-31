import { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));


function Token(data) {

    const [balance, setbalance] = useState("");
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const address = useSelector(state => state.counter);

    console.log(data.address[0]);
    // const klaybalance = async () => {  
    //     bal = await caver.klay.getBalance(address);
    //     // a = await caver.utils.fromPeb(bal, "KLAY");
    //     return bal;
    // }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={8}>klay</Grid>
                <Grid xs={4}>hi</Grid>
                <Grid xs={4}>price</Grid>
                <Grid xs={4}>
                    <Button variant="primary" onClick={handleShow}>Transfer</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Token;