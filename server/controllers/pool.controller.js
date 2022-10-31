const kip7pairmodel = require("../models/kip7pair");
const klaypairmodel = require("../models/klaypair");
const stakedtokenmodel = require("../models/stakedtoken");

module.exports = {
    // klay-kip7 풀 정보 조회
    getklaypool: async (req, res) => {
        try {
            const klaypoolList = await klaypairmodel.getKlaypair();
            console.log("klay-kip7 pool 조회");
            return res.status(200).send({
                data : klaypoolList,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    // klay-kip7 풀 정보 db에 저장
    saveklaypool: async (req, res) => {
        try {
            const klaypoolData = {
                pair_address : req.body.pair_address,
                pair_name : req.body.pair_name,
                token_address : req.body.token_address,
                pid : req.body.pid
            }
            const klaypool = await new klaypairmodel(klaypoolData).saveKlaypair();

            return res.status(200).send({
                data : klaypool,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    // kip7-kip7 풀 정보 요청
    getkip7pool: async (req, res) => {
        try {
            const kip7poolList = await kip7pairmodel.getKIP7pair();
            console.log("kip7-kip7 pool 조회 완료");
            return res.status(200).send({
                data : kip7poolList,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    // kip7-kip7풀 정보 db에 저장
    savekip7pool: async (req, res) => {
        try {
            const kip7poolData = {
                pair_address : req.body.pair_address,
                pair_name : req.body.pair_name,
                tokenA_address : req.body.tokenA_address,
                tokenB_address : req.body.tokenB_address,
                pid : req.body.pid,
            }
            const kip7pool = await new kip7pairmodel(kip7poolData).saveKIP7pair();

            return res.status(200).send({
                data : kip7pool,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    getsinglepool: async (req, res) => {
        try {
            const singlepoolList = await stakedtokenmodel.getstakedToken();
            console.log("단일 풀 조회");
            return res.status(200).send({
                data: singlepoolList,
                message: 'success'
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request"
            })
        }
    },
    savesinglepool: async (req, res) => {
        try {
            const singlepoolData = {
                token_address: req.body.token_address,
                token_name: req.body.token_name,
                token_symbol: req.body.token_symbol
            }

            const singlepool = await new stakedtokenmodel(singlepoolData).savestakedToken();

            return res.status(200).send({
                data: singlepool,
                message: "success"
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request"
            });
        }
    },
    single_staking : async (req, res) => {

    },
    kip7pool_staking : async (req, res) => {
        
    },
    klaypool_staking : async (req, res) => {

    },
    claim : async (req, res) => {

    }
}