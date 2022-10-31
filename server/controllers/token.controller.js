const tokensmodel = require("../models/tokens");

module.exports = {
    // token 저장함수 이게 client에서 요청해서 쓸이유가 있을까?
    savetoken : async (req, res) => {
        try {
            const TokenData = {
                token_address : req.body.token_address,
                token_symbol : req.body.token_symbol,
                token_name : req.body.token_name
            }
            const Token = await new tokensmodel(TokenData).saveToken();

            return res.status(200).send({
                data : Token,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    gettoken : async (req, res) => {
        try {
            const tokenList = await tokensmodel.getToken();
            console.log("모든 토큰 조회 완료");
            return res.status(200).send({data: tokenList, message:"조회 성공"});
        } catch (err) {
            console.error(err);
            return res.status(404).send({data : null});
        }
    },
    transfer : async (req, res) => {
        // try {
        //     const to = req.body.toAddress
        //     const amount = req.body.amount;

        //     let balance = await caver.klay.getBalance(process.env.FROM_ADDRESS)
        //     balance = caver.utils.convertFromPeb(balance,'KLAY')

        //     if(balance > amount){
        //     const keyring = caver.wallet.keyring.createFromPrivateKey(process.env.PRIVATE_KEY);
        //     const valueTransfer = caver.transaction.valueTransfer.create({
        //     from:keyring.address,
        //     to: to,
        //     value: caver.utils.convertToPeb(`${amount}`, 'KLAY'),
        //     gas: 30000,
        //     });
        //     const signed = await valueTransfer.sign(keyring)
        //     const receipt = await caver.rpc.klay.sendRawTransaction(signed)
        //     console.log(receipt);
        //     res.send(receipt);
        //     }
        // } catch (err) {
        //     console.error(err);
        //     return res.status(400).send("transfer fail")        
        // }
        // try {
        //     const tokenTrans = {
        //         sender_address : req.body.sender_address,
        //         recipient_address : req.body.recipient_address,
        //         token_amount : req.body.token_amount
        //     }
        //     // const tokenTrans = {
        //     //     const from = req.body.sender_address;
        //     //     const to = req.body.recipient_address;
        //     //     const amount = req.body.token_amount;
        //     //     console.log(from, to, amount);
        //     // }
        // }
    }
}