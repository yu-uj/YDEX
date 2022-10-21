import '../assets/css/Home.css'

import CounterContainer from '../redux/CounterContainer';

const Home = () => {
    return (
        <div>
            <div className="banner">
                <strong>JDEX</strong>
            </div>

            <div className="info">
                <br></br><br></br>
                <h1>Manage and deposit your assets <br></br>In JongDex </h1><br></br>
                Enjoy swaps, staking, and transfers in decentralization
            </div>

            <br />
            <div className="wbtn">
                <div className="wb">
                    <h6 className='wc'>JDEX 이용을 위해</h6>
                    <h5 className='wc'>클레이튼 지갑을 연결 해주세요!</h5>
                    <br />
                    <CounterContainer />
                    <br />
                </div>

            </div>
        </div>

    );
};

export default Home;