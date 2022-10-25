// import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { AppBar, Toolbar, Container, Avatar, Button, MenuItem, Tooltip, IconButton, Box, Menu, Typography, Fade } from '@mui/material';
import { Link } from "react-router-dom";
import React from "react";
import CounterContainer from '../redux/CounterContainer';

function Navigation() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="Navbar">
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<IconButton href="/" sx={{ p: 1 }}>
							<Avatar
								sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
								alt="YDEX"
								src={require("../assets/JDlogo.png")}
							/>
						</IconButton>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Button component={Link} to="/" sx={{ my: 2, color: "white", display: "block" }} size="large">
								Home
							</Button>
							<Button component={Link} to="/mytoken" sx={{ my: 2, color: "white", display: "block" }} size="large">
								My Token
							</Button>
							<Button component={Link} to="/liquidity" sx={{ my: 2, color: "white", display: "block" }} size="large">
								Liquidity
							</Button>
							<Button component={Link} to="/swap" sx={{ my: 2, color: "white", display: "block" }} size="large">
								Swap
							</Button>
							<Button
								id="fade-button"
								size="large"
								sx={{ my: 2, color: "white", display: "block" }}
								aria-controls={open ? 'fade-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								Staking
							</Button>
							<Menu
								id="fade-menu"
								MenuListProps={{
									'aria-labelledby': 'fade-button',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								TransitionComponent={Fade}
							>
								<MenuItem component={Link} to="/staking/single">Single</MenuItem>
								<MenuItem component={Link} to="/staking/pair">Pair</MenuItem>
							</Menu>
							<Button component={Link} to="/dashboard" sx={{ my: 2, color: "white", display: "block" }} size="large">
								DashBoard
							</Button>
						</Box>
						<CounterContainer />
					</Toolbar>

				</Container>
			</AppBar>
		</div>
	);
}


export default Navigation;