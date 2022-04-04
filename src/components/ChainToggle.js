import React, { useState, useEffect } from 'react'
import { ethers, BigNumber } from 'ethers';
import { Chains } from "../constants";
import * as s from "../styles";

export default function ChainToggle(props) {

    const [chain, setChain] = React.useState("");
    const [showChains, setShowChains] = React.useState(false);

    React.useEffect(() => {
        getChainName();
    }, [window.ethereum]);

    async function getChainName() {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        const { chainName } = Chains[chainId];
        setChain(chainName);
    }

    // function showChain() {

    if (window.ethereum) {
        return (
            <>

                <s.StyledButton onClick={() => setShowChains(!showChains)}><b>{chain}⬇️</b></s.StyledButton>
                {showChains ?
                <div>
                <div onClick={() => setShowChains(!showChains)} style={{position: "absolute", opacity: "95%", backgroundColor: "black", zIndex: "4", width: "100%", height: "100%", top: "0px", left: "0px"}}></div>
                    <div style={{ left:"40%", backgroundColor: "grey", border: "1px solid grey", borderBottom: "none", width: "100px", zIndex: "5", position: "absolute", marginTop: "235px", display: "flex", flexDirection: "column" }}>

                        {Object.keys(Chains).map(ch => {
                            if (Chains[ch].chainName != chain) {
                                return (
                                    <div>
                                        <div style={{ cursor: "pointer", marginBottom: "5px" }} onClick={async () => {
                                            if (ch == "0x1") {
                                                await window.ethereum.request({
                                                    method: "wallet_switchEthereumChain",
                                                    params: [{
                                                        chainId: "0x1",
                                                    }]
                                                });
                                            } else {
                                                console.log(Chains[ch]);
                                                await window.ethereum.request({
                                                    method: "wallet_addEthereumChain",
                                                    params: [{
                                                        chainId: Chains[ch].chainId,
                                                        rpcUrls: [Chains[ch].rpcUrl],
                                                        chainName: Chains[ch].chainName,
                                                        nativeCurrency: Chains[ch].nativeCurrency,
                                                        blockExplorerUrls: Chains[ch].blockExplorerUrls
                                                    }]
                                                });
                                            }


                                            window.location.reload();
                                        }}>
                                            {Chains[ch].chainName}
                                        </div>
                                        <hr style={{ width: "100%" }} />
                                    </div>
                                )
                            }
                        })}

                    </div></div>
                    : <></>}
            </>
        )
        //  } else {return <></>}
    }
}