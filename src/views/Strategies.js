import React, { useState, useEffect } from 'react'
import { ethers, BigNumber } from 'ethers';
import WalletSetup from '../metamask';
import * as x from '../styles/geral'
import StrategyInterface from '../StrategyInterface';
import ChainToggle from '../components/ChainToggle';
import { BrowserRouter, HashRouter, Link, Route, Switch } from "react-router-dom";
import { StyledLink } from '../styles';


export default function Strategies(props) {

    const {strategies, networkId} = props;
  const [route, setRoute] = useState();

  return (
      <div>
          {strategies.map(strat => {
              return <><StrategyInterface strategyAddress={strat.strategyAddress} networkId={networkId}/><br/></>
          })}
      </div>
  )

}