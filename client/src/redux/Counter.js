import React, { useState } from "react";
// import Modal from 'react-modal';
import { Box, Typography, Modal, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";

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

function Counter(props) {
    const { number, number1 } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cw, setCw] = useState("Connect Wallet");
    const [ctk, setCtk] = useState("Connect to Kaikas");

    const modalClose = () => setModalIsOpen(false);
    const modalOpen = () => setModalIsOpen(true);

    const dispatch = useDispatch();
    const dispatchSetCW = (cw) => dispatch({ type: "SET_CW", number: cw });
    const dispatchSetCtk = (cw) => dispatch({ type: "SET_CTK", number1: cw });

    const connectWallet = async () => {
        if (window.klaytn !== 'undefined') { // 카이카스가 설치되어있으면
            if (window.klaytn.isKaikas) {
                const accounts = await window.klaytn.enable()
                setCw(accounts[0]);
                setCtk(accounts[0]);
                dispatchSetCW(accounts[0]);
                dispatchSetCtk(accounts[0]);
            }
            setModalIsOpen(false);
        } else { //카이카스 설치가 되어있지 않을때
            //          카이카스 설치 팝업 
        }
    };

    // const address = ([{number}]) => {
    //     let number2 = [number];
    //     let sliceAddressEnd = number2.to.slice(-8);
    //     let sliceAddressStart = number2.to.slice(0,6);
    //     let num = sliceAddressStart + "..." + sliceAddressEnd;
    //     return num;
    //     console.log(num);
    // } 
    // console.log(address)
    
    
    // const num = [number1];
    //     const sliceAddressEnd = num.to.slice(-8);
    //     const sliceAddressStart = num.to.slice(0,6);
    //     if (num.length ==! 0){
    //         return sliceAddressStart + "..." + sliceAddressEnd;
    //     }

    return (
        <>
            <Button size="small" variant="outlined" color="secondary" onClick={modalOpen}>{number}</Button>
            <Modal
                open={modalIsOpen}
                onClose={modalClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setModalIsOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>

                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        Connect Wallet
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You can start using JDex right away, using Kaikas.
                    </Typography>
                    <Button
                        className="metaConnect"
                        color="primary"
                        onClick={() => {
                            connectWallet();
                        }}>
                        {number1}
                    </Button>
                </Box>

            </Modal>



        </>
    );

};

export default Counter;