import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';
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

	return (
		<>
		<ThemeProvider theme={theme}>
		<Button size="small" variant="contained" color="info" onClick={modalOpen}>{number.slice(0, 7) + "..." + number.slice(38, 42)}</Button>
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
						You can start using YDex right away, using Kaikas.
					</Typography>
					<br/>
					<Button
						className="metaConnect"
						variant="contained"
						color="info"
						onClick={() => {
							connectWallet();
						}}>
						{number1}
					</Button>
				</Box>

			</Modal>
		</ThemeProvider>

		</>
	);

};

export default Counter;