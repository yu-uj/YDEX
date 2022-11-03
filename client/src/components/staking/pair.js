import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Typography, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
import Create from "./create";
import KlayPair from './klaypair';
import Kip7Pair from './kip7pair';
import '../../assets/css/Page.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';

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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function Pair() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className='Pool'>

			<div className="pageInfo">
				<h2>Pair Pool List</h2>
				<p>KLAY와 KIP7 토큰의 <b>페어 풀</b> 목록을 확인하고, <br /> 원하는 풀에 <b>예치</b> 및 <b>출금</b> 할 수 있습니다.</p>
			</div>

			<br />

			<ThemeProvider theme={theme}>
				<Stack spacing={2}>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="ALL PAIR" {...a11yProps(0)} />
								<Tab label="KLAY PAIR" {...a11yProps(1)} />
								<Tab label="KIP7 PAIR" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<br />
						<TabPanel value={value} index={0}>
							<Stack spacing={1}>
								<KlayPair />
								<Kip7Pair />
							</Stack>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<KlayPair />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Kip7Pair />
						</TabPanel>
					</Box>

					<Create />
				</Stack>
			</ThemeProvider>

		</div>

	);
}

export default Pair;