
BEB-CC3-project-02

# YDEX PROJECT
<br/>

## 1. 팀 소개

### BCC-03-02조

- **팀 명 : YDEX**
- **프로젝트 명 : YDEX**
- **팀장 : 홍유진**
- **팀원 : 김윤겸**
- **Github Repo : https://github.com/yu-uj/YDEX**
- **Date : 2022/10/18 - 2022/11/04**
- **팀 룰**
    
    → 매일 오전 10시, 오후 5시 필수 회의 진행회의록 작성
    
    → 회의록 작성
    
    → 그 날의 진행 계획 및 진행 중인 상황 공유
    
<br/>
<br/>

## 2. 프로젝트 개요

### 💸 **YDEX 프로젝트 목표**

### → *Klaytn 기반의 JDEX(탈중앙화거래소) Code Refactoring.*
**JDEX 참고 링크** : https://github.com/yu-uj/JDEX
### → *De-fi적 기능 추가 구현으로 토큰 이코노미 보강.*

<aside>
➡️ DEX; (Decentralized Exchange)

**기존의 중앙화거래소(CEX)가 아닌 개인 간 금융(P2P)이 가능한 탈중앙화(분산형) 거래소.** 법정화폐와 암호화폐간의 교환을 허용하지 않고, 암호화폐 토큰을 다른 암호화폐 토큰과 거래하여 블록체인(분산 원장) 위에 구축 및 기록된 **스마트계약의 집합**이다.

</aside>
<br/>

### 💸 **YDEX** 란 ?

> **이젠 직접 자산을 관리하고 예치하세요.**
> 

**YDEX**는 기존의 중앙화된 거래소의 제삼자 개입 없이 **개인 간 금융(P2P) 거래가 가능한 탈중앙화 거래소** 입니다.

누구나 YDEX 웹 사이트에 방문하여 **지갑**(Kaikas)를 연결하고 보유하고 있는 토큰을 다른 사용자에게 **전송**하거나 다른 토큰으로 **교환** 할 수 있습니다.

또, 토큰을 지갑에 가지고만 있는 것이 아닌, **단일 풀에 예치**하고, 예치한 토큰 가치의 150% 만큼 **클레이를 대출**할 수 있습니다. 

**토큰 페어쌍으로 유동성 제공 후, 해당 토큰 페어의 LP토큰**을 받아, **페어 풀에 예치**하여 에 대한 **보상**(YDEXToken)을 얻을 수 있습니다.

**YDEXToken**은 단일 풀에 예치하여 lending 서비스를 이용하거나, **NFT Marketplace**를 통해 **NFT 민팅**하는데 사용하여 부가적인 수익을 창출할 수 있습니다.

<br/>

### 💸  **YDEX** 의 대표 기능

- **My Token**
    
    : 소유하고 있는 토큰 목록을 확인하고, 다른 사람에게 원하는 토큰을 **전송** 할 수 있습니다.
    
- **Swap**
    
    : 소유하고 있는 토큰을 다른 토큰들로 **교환**할 수 있습니다.
    
- **Add Liquidity**
    
    : 소유하고 있는 토큰을 토큰 페어쌍으로 **유동성을 제공**하여 **해당 토큰 페어의 LP 토큰**을 받을 수 있습니다.

- **Single Staking**
    
    : 토큰을 **단일 풀**에 **예치**하고, 해당 토큰 가치의 **150% 만큼 클레이를 대출**할 수 있습니다.
    
- **Pair(LP) Staking**
    
    : 소유하고 있는 **LP 토큰**을 **페어 풀**에 **예치**하여 **’YDEXTOken(플랫폼 토큰)’을 보상**으로 받을 수 있습니다.
    
- **NFT Marketplace**
    
    : **예치 보상**으로 받은 **YDEX 토큰**으로 **NFT 민팅**을 하고, **NFT를 거래**할 수 있습니다.
    
<br/>

### ⛓️ 왜 Klaytn 인가 ?

1. **저비용**
    1. 트랜잭션에서 발생하는 **가스비가 1~20원 수준**으로, **이더리움의 1/100**에 해당하는 가스 비용을 필요로 하여 매우 저렴합니다.
2. **높은 확장성(TPS)** 
    1. Klaytn은 실제 **4000TPS**의 트랜잭션 처리량을 가집니다. 이는 **1초에 4000트랜잭션이 한 블록에 들어가는 확장성**으로, 20TPS(Block Interval 15초)의 이더리움과 7TPS(Block Interval 10분)의 비트코인에 비교했을 때 월등히 높은 TPS 입니다.
3. **짧은 완결성(Finality)**
    1. 완결성은 **블록에 담긴 거래가 바뀔 수 없다는 것을 보증하는 시간**으로, 블록 생성 간격(Block Interval) * 검증 횟수로 계산합니다. 클레이튼은 **1초의 완결성**을 가져 초당 한 건의 **합의와 동시에 처리**합니다. 이더리움의 6분, 비트코인의 60분과 비교하여 매우 짧은 완결성을 가집니다.
4. **새로운 시도**
    1. Klaytn에 비하여 ETH는 접할 기회가 많았기 때문에 이번 프로젝트를 통해 **Klaytn Chain을 경험**하고, 배우고 싶었습니다. 

<br/>

### ⛓️ 왜 Klaytn 기반의 DEX인가 ?

1. 기존의 보편화 된 덱스들은 이더리움의 메이저 덱스인 **유니스왑** 혹은 **스시스왑**을 클론 코딩하여 배포하였습니다. **JDEX**는 Klaytn에서 자체적으로 제공하는 **Klaytn Dex Contracts**를 분석하고, 배포하는 과정을 거쳐 KIP 컨트랙트 대신 이더리움의 ERC 컨트랙트를 수정하여 사용한 기존 Klaytn 덱스들과 **차별점**을 두었습니다.
2. **개인 간 금융**(P2P)이 이루어지는 DEX에서 저희가 중요하게 생각한 2가지 **수수료**와 **전송 속도**입니다. 탈중앙화 거래소(DEX)인 만큼 중앙화거래소(은행)과는 다른 장점이 있어야 한다고 생각했고, 수업을 통해 배운 ETH는 비싼 수수료와 느린 전송 속도로 체인으로의 뚜렷한 장점을 찾지 못하였습니다. 그래서 상대적으로 **가스비가 저렴**하고, **속도가 빠른 Klaytn Chain**을 선택하게 되었습니다.

<br/>
<br/>

## 3. 기능별 시연 영상

- **Connect Wallet**
    
    ![ConnectWallet](https://user-images.githubusercontent.com/99964401/201844099-0527dc04-3124-4bbd-9b35-5eff6a7eb985.gif)
    
    - Kailkas 지갑 연결을 위한 모달 창을 보여줍니다.
- **My Token**
    
    ![MyToken](https://user-images.githubusercontent.com/99964401/201844183-bc59167e-eec2-4d6f-addf-212f26e16287.gif)

    
    - **My Token List**
        - 연결된 지갑 보유한 Klay 토큰 및 KIP7 토큰 리스트업 합니다.
    - **Transfer - 토큰 전송**
        - 보유한 토큰을 다른 사람에게 전송할 수 있습니다.
- **Swap**
    
    ![Swap](https://user-images.githubusercontent.com/99964401/201844260-4b978352-a420-4dee-9211-2211bf3e79d7.gif)
    
    - 보유한 Klay / KIP7 토큰을 원하는 다른 KIP7 토큰으로 교환 할 수 있습니다.

- **Add Liquidity**
    
    ![AddLiquidity](https://user-images.githubusercontent.com/99964401/201844408-b5e459e4-eff7-4e6d-9ca2-009526be3244.gif)
    
    - Klay / KIP7 토큰 페어쌍을 선택하여 유동성을 공급하고 해당 토큰 페어의 LP 토큰을 받을 수 있습니다.

- **Single Staking - 단일 예치**
    - 토큰을 단일 예치하고, Lending 서비스를 이용할 수 있습니다.
    - **Single Pool List**
        
        **[ Deposit - 예치 ]**
        
        ![SingleDeposit](https://user-images.githubusercontent.com/99964401/201844933-288fd1a4-4b9e-4413-bbe3-3940f4cf0a6c.gif)

        
        **[ Withdraw - 출금 ]**
        
        ![SingleWithdraw](https://user-images.githubusercontent.com/99964401/201844966-add8992b-9de0-4305-9eba-34755a1ddd06.gif)
        
        
        **[ Borrow - 대출 / RePay - 상환  ]**
        
        ![SingleLending](https://user-images.githubusercontent.com/99964401/201845671-c4eab4a5-a1c3-47ee-8278-5585516741df.gif)

        
        - 단일 풀 목록이 리스트 업 됩니다.
        - 풀을 선택하여 단일 예치(Deposit)와 출금(Withdraw)가 가능합니다.
        - 예치한 토큰 가치의 150% 만큼 Klay를 대출 받고, 상환할 수 있습니다.
   
- **Pair Staking - 페어 예치**
    - 보유한 LP 토큰을 예치하고, 유동성에 대한 보상(YDEXToken : Platform Token)을 받습니다.
    - **Pair Pool List**
        
        **[ Deposit - 예치 ]**
        
       ![PairDeposit](https://user-images.githubusercontent.com/99964401/201846419-2edfe123-9e25-439b-8f4f-e39d92919a90.gif)
        
        **[ Withdraw - 출금 ]**
        
        ![PairWithdraw](https://user-images.githubusercontent.com/99964401/201846495-49a39003-9862-4fab-a926-154f7607fdae.gif)
        
        - ALL / Klay / KIP 페어 풀 목록이 리스트 업 됩니다.
        - 원하는 페어 풀을 선택하여 LP 토큰 예치(Deposit)와 출금(Withdraw)가 가능합니다.
        
    - **Create Pool**
        
        ![create](https://user-images.githubusercontent.com/99964401/193565047-24599c7c-2e84-4a2a-b995-0fbd10f6f177.gif)
        
        - 원하는 토큰 페어의 유동성 풀을 생성할 수 있습니다.
        
     - **NFT Marketplace**
        
        ![NFTMarket](https://user-images.githubusercontent.com/99964401/201846760-70c2c7f9-38a1-4289-9348-e8dff27cae1b.gif)
        
        - 예치 보상으로 받은 YDEXToken을 사용하여 NFT를 민팅하고, 거래할 수 있습니다.
        

<br/>
<br/>

## 4. 관련 문서

### 📋 DB Schema

<img width="613" alt="DB" src="https://user-images.githubusercontent.com/99964401/193568157-2b32a512-8f18-4274-b14f-9d59167e2f0a.png">

<br/>

### 📋 DB Api

### API 리스트

<img width="698" alt="API_List" src="https://user-images.githubusercontent.com/99964401/193606675-3742b16f-c9fc-49aa-9127-11a96ad83b4b.png">

<br/>

### 📋 Flow Chart

![YDEX drawio](https://user-images.githubusercontent.com/99964401/201847182-a4cd54ce-a9a6-4d96-bf5b-caca8552d81e.png)

<br/>

### 📋 Token Economy

<img width="1709" alt="YDEX_TokenEconomy" src="https://user-images.githubusercontent.com/99964401/193568712-eba90a3c-1c83-4d93-9294-a3795ec1a5b1.png">

**[YDEX의 Token Economy]**

- **개발자, 투자자, 유저**들에게 적절한 양의 **토큰을 분배**하고, **예치**(단일, 페어 풀)에 대한 **보상**으로 **YDEX토큰을 지급** 받습니다.
- 보상으로 주어지는 **YDEX토큰**을 **일정 지분 보유**시 **YDEX의 운영 방향성 및 협의**에 대한 **투표 거버넌스에 참여**할 수 있습니다.
- YDEX토큰은 **풀에 예치**한 순간부터 **블록당 보상**이 제공되고, 보상으로 받는 YDEX토큰을 **단일 풀**에 예치하여 **Klay를 대출받는 시스템과 NFT 민팅 및 거래에 사용**합니다. 
- **토큰 스왑 수수료** 0.3%와 **NFT 민팅과 거래에 사용되는 수수료**를 **바이백 펀드를 활용**하여 YDEX 토큰을 **소각**하는 등으로 지속가능한 시스템을 구축하였습니다.

<br/>
<br/>

<div align=center><h1>📚 YDEX STACKS</h1></div>

<div align=center> 

  <div align=center><h3>COLLABORATION TOOL</h3></div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <br>
  
  <div align=center><h3>FRONTEND</h3></div>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
   <br>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Caver-005A2B?style=for-the-badge&logo=Caver&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=redux&logoColor=white">
  <br>
  
  <div align=center><h3>BACKEND</h3></div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/Mongoose-D0021B?style=for-the-badge&logo=Mongoose&logoColor=white">
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=white">
  <br>
  
  <div align=center><h3>BLOCKCHAIN</h3></div>
  <img src="https://img.shields.io/badge/solidity-363636?style=for-the-badge&logo=solidity&logoColor=white">
  <img src="https://img.shields.io/badge/hardhat-124191?style=for-the-badge&logo=hardhat&logoColor=white">
  <img src="https://img.shields.io/badge/truffle-840010?style=for-the-badge&logo=truffle&logoColor=white">
  <img src="https://img.shields.io/badge/Kaikas-F5AE29?style=for-the-badge&logo=Kailkas&logoColor=black">
  <img src="https://img.shields.io/badge/KlaytnIDE-003366?style=for-the-badge&logo=KlaytnIDE&logoColor=white">
  <img src="https://img.shields.io/badge/ganache-A42E2B?style=for-the-badge&logo=ganache&logoColor=white">
  <br>
  
</div>

<!-- pdf parameters

---
urlcolor: #e3232c
linkcolor: #e3232c
---

-->
<!-- start intro: only for github, remove if creating a pdf -->

</br>
</br>



