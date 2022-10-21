const Caver = require('caver-js');
// const caver = new Caver(new Caver.providers.WebsocketProvider("https://public-node-api.klaytnapi.com/v1/baobab"));
const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));


const DexFactoryabi = require('./build/contracts/factory.json')
const DexRouterabi = require('./build/contracts/router.json');
const DexPairabi = require('./build/contracts/pair.json');
const KIP7abi = require('./build/contracts/KIP7.json');

const FactoryAddress = '0xF940F7Be2Cd110Ff96A5f496AE9e2Fd31b789A47';
const RouterAddress = '0xE4a8Df9029030926a5cd1E5851A0Bfd609660C2c';

const yktoken = '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d';
const yjtoken = '0xd7877710190E492561F692a08117c63e32cf8ac1';

const DexFactoryContract = new caver.klay.Contract(DexFactoryabi, FactoryAddress);
const DexRouterContract = new caver.klay.Contract(DexRouterabi, RouterAddress);

const address = '0x026Ad497d9B336A231C22B3ac20734106F69D422';

async function main () {

    const keyring = caver.wallet.keyring.createFromPrivateKey('Input your priv key')
    caver.wallet.add(keyring)
    caver.klay.accounts.wallet.add(caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey));

    const deadline = parseInt(''+new Date().getTime() / 1000) + 100000;

    // let addliquidity = await DexRouterContract.methods.addLiquidity(yktoken, yjtoken, 100000000000, 10000000, 0, 0, '0x026Ad497d9B336A231C22B3ac20734106F69D422', deadline).send(
    //     {
    //         from : keyring.address,
    //         gas: 5000000,
    //     }
    // )
    // console.log(addliquidity);


    let swap = await DexRouterContract.methods.swapExactTokensForTokens(100000, 0, [yktoken, yjtoken], address, deadline).send(
        {
            from : keyring.address,
            gas: 5000000,
        }
    )
    console.log(swap);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// const balance = caver.klay.getBalance(address)
// .then(bal => {
//     console.log(bal)
//     console.log(caver.utils.fromPeb(bal, "KLAY"))
// })
// .catch(e => {
//     return e;
// })
// console.log(balance);


