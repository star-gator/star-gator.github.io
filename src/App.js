import React, { useState, useEffect } from 'react'
import { ethers, BigNumber } from 'ethers';
import WalletSetup from './metamask';
import * as x from './styles/geral'
import StrategyInterface from './StrategyInterface';
import WriteContract from './writeFunctions';
import ChainToggle from './components/ChainToggle';
import { BrowserRouter, HashRouter, Link, Route, Switch } from "react-router-dom";
import { StyledLink } from './styles';
import Strategies from './views/Strategies';


function App() {


  const [route, setRoute] = useState();
  useEffect(() => {
    console.log(`set path ${window.location.toString().split("/#")[1]}`)
    setRoute(window.location.toString().split("/#")[1]);
  }, [setRoute]);

  function link(currentRoute, dest, label) {
    console.log(`route ${route} des ${dest}`);
    return (
      <StyledLink>
      <Link style={{color: "white", textDecoration: currentRoute == dest ? "" : "none" }}
        onClick={() => {
          setRoute(dest);
         // window.location.reload();
        }}
        to={dest}
      >
        {label}
      </Link>
    </StyledLink>
    )
  }

  function nav() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
      {link(route, "/", "Home")}
      {link(route, "/avax", "AVAX")}
      {link(route, "/ftm", "FTM")}
      {link(route, "/polygon", "Matic")}
    </div>
    )
  }

  return (
    <div style={{backgroundColor: "black"}}>
      <x.StyledApp>
        <x.StyledContainer style={{ justifyContent: "space-between", alignItems: "top", top:"0px" }}>
          <x.TextTitle style={{ marginTop: 5, marginLeft: 10 }}><img src="./logo.png" style={{ height: "50px" }} /> StarGator</x.TextTitle>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <WalletSetup />
          </div>
        </x.StyledContainer>

        <HashRouter>
         {nav()}
          <Switch>
            <Route exact path="/">
              <div style={{padding: "5%"}}>
                <h1 style={{textAlign: "center"}}>Welcome!</h1>
                <p>Thank you for visiting StarGator. These yield aggregators have been built to let us farm STG pools and lower our exposure risks.</p>
                <p>Stargator offers 1% fees to the wallet that compounds the pools each time and collects a 3% fee on top of that. From that 3% fee 50% of it (1.5%) is held in a vault that will be used at the discretion of early StarGator stakers. the other 1.5% goes to paying our patrons (the people behind <a style={{color: "white"}} href="https://umami.finance">Umami</a> & <a style={{color: "white"}} href="https://arbis.finance">Arbis Finance</a>)</p>
                <p>We are very bullish on Stargate and look forward to staking that in STG pools once they open. Stargator is currently unaudited use at your own risk. Please feel free to read our smart contracts. The address is included on each page so you can go and DYOR</p>
              </div>
            </Route>
            <Route exact path="/ftm">
              <Strategies networkId={"0xfa"} strategies={[{strategyAddress: "0x7bFEA70cBa470E2B8f368736c20302D0d19268c7"}]}/>
            </Route>
            <Route exact path="/avax">
              <Strategies networkId={"0xa86a"} strategies={[ {strategyAddress: "0x9350Fe568EF2E7d7e3dbBB3EA76Af95397385c1a"},{strategyAddress: "0xF4e46e88620384397D7a45cacC2203221a1c22E9"}]}/>
            </Route>
            <Route exact path="/polygon">
              <Strategies networkId={"0x89"} strategies={[ {strategyAddress: "0xe956615a08e5b19dd16364f5cc0d04446281baff"}, {strategyAddress: "0x45ce422893265a437c6632323d69b2a4f551e976"}]}/>
            </Route>
          </Switch>
        </HashRouter>

        {/*  <button onClick={async () => {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x89",
                rpcUrls: ["https://polygon-rpc.com/"],
                chainName: "Polygon",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
        window.location.reload();
        }}>Switch to Polygon</button>
        <button onClick={async () => {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: "0x4",
               
            }]
        });
      window.location.reload();
        }}>Switch to rinkeby</button>

<button onClick={() => {
          window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: "0x1",
               
            }]
        });
        }}>Switch to Mainnet</button> */}
      </x.StyledApp>
    </div>
  );
}

export default App;
