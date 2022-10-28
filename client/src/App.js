// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, MyToken, Swap, Staking, Liquidity, DashBoard, NFT, NotFound} from './pages'
import { Navigation, Footer } from './components'
import { Single, Pair } from './components/staking'
import './assets/css/App.css';
import { AllNFT,MyNFT } from './components/nft';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytoken" element={<MyToken />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/*" element={<NotFound />} />

            <Route path="/staking/single" element={<Single />} />
            <Route path="/staking/pair" element={<Pair />} />
            <Route path="/nft/mynft" element={<MyNFT />} />
            <Route path="/nft/allnft" element={<AllNFT />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
