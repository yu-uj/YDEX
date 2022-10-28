import { Link } from "react-router-dom";
import { MyNFT, AllNFT } from '../components/nft'
import '../assets/css/Page.css';

function NFT() {

	return (
		<main>
			<div className="Pool">

				<MyNFT as={Link} to="/nft/mynft" />
				<AllNFT as={Link} to="/nft/allnft" />
			</div>
		</main>
	);
};

export default NFT;