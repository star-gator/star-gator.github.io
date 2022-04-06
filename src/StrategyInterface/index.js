import React, { useState, useEffect } from 'react'
import { ethers, BigNumber, eth } from 'ethers';
import { CONFIG } from '../blockchain/config';
import abi from "../blockchain/abi.json";
import erc20Abi from "../blockchain/erc20Abi.json";
import strategyAbi from "../blockchain/startegyAbi.json";
import { getAddress, parseEther, formatEther, parseUnits } from 'ethers/lib/utils';
import { Chains } from '../constants';
import { StyledButton } from '../styles';

const truncate = (input, len, len2, len3) =>
    input.length > len ? `${input.substring(0, len)}and ${input.substring(43, len2)}and ${input.substring(84, len3)} ` :
        input;


const StrategyInterface = (props) => {

    const { strategyAddress, networkId } = props;

    const [rightNetwork, setRightNetwork] = useState(false);
    const [currentReward, setCurrentReward] = useState(0);
    const [depositToken, setDepositToken] = useState("");
    const [depositTokenSymbol, setDepositTokenSymbol] = useState("");
    const [depositTokenDecimals, setDepositTokenDecimals] = useState(8);
    const [rewardToken, setRewardToken] = useState("");
    const [rewardTokenSymbol, setRewardTokenSymbol] = useState("");
    const [depositTokenBalance, setDepositTokenBalance] = useState(0);
    const [depositTokenTotalSupply, setDepositTokenTotalSupply] = useState(0);
    const [depositTokenApproved, setDepositTokenApproved] = useState(0);
    const [shareBalance, setShareBalance] = useState("");
    const [shareApproved, setShareApproved] = useState(0);
    const [shareTotalSupply, setShareTotalSupply] = useState(0);
    const [shareDecimals, setShareDecimals] = useState(8);
    const [shareSymbol, setShareSymbol] = useState("");
    const [strategyName, setStrategyName] = useState("");
    const [tvl, setTvl] = useState();


    const [toWithdraw, setToWithdraw] = useState("");
    const [toDeposit, setToDeposit] = useState("");

    const [loadingMsg, setLoadingMsg] = useState("");

    const [OwnersAddr1, setOwnersAddr1] = useState([]);
    const [OwnersAddr2, setOwnersAddr2] = useState([]);
    const [TxId, setTxId] = useState(0);
    const [Addr, setAddr] = useState("");
    const [totalCount, setTotalCount] = useState();
    const [getTrx, setGetTrx] = useState([]);
    const [AddConfirmed, setAddConfirmed] = useState();

    async function getData() {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chainId != networkId) {
            console.log(`chain ${chainId} want ${networkId}`)
            //  alert("wrong network");

        } else {
            setRightNetwork(true);
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts[0])
            console.log(strategyAddress)
            const strategyContract = new ethers.Contract(strategyAddress, strategyAbi.abi, provider);
            const curReward = await strategyContract.checkReward();
            const name = await strategyContract.name();
            const depToken = await strategyContract.depositToken();
            const rewToken = await strategyContract.rewardToken1();
            const shareSym = await strategyContract.symbol();
            const shareDec = await strategyContract.decimals();
            const shareTs = await strategyContract.totalSupply();
            const shareBal = await strategyContract.balanceOf(accounts[0]);
            const tvl = await strategyContract.getDepositTokensForShares(shareTs);
            const shareApprove = await strategyContract.allowance(accounts[0], strategyAddress);
            const rewardTokenContract = new ethers.Contract(rewToken, erc20Abi.abi, provider);
            const rewSymbol = await rewardTokenContract.symbol();
            const depositTokenContract = new ethers.Contract(depToken, erc20Abi.abi, provider);
            const depBalance = await depositTokenContract.balanceOf(accounts[0]);
            const depSymbol = await depositTokenContract.symbol();
            const depDecimals = await depositTokenContract.decimals();
            const ts = await depositTokenContract.totalSupply();
            const approved = await depositTokenContract.allowance(accounts[0], strategyAddress);
            console.log(`approved ${approved} ts ${ts}`)
            setCurrentReward(curReward);
            setDepositToken(depToken);
            setDepositTokenSymbol(depSymbol);
            setDepositTokenBalance(depBalance);
            setDepositTokenDecimals(depDecimals);
            setDepositTokenTotalSupply(ts);
            setDepositTokenApproved(approved);
            setRewardToken(rewToken);
            setShareBalance(shareBal);
            setShareSymbol(shareSym);
            setShareDecimals(shareDec);
            setShareApproved(shareApprove);
            setShareTotalSupply(shareTs);
            setRewardTokenSymbol(rewSymbol);
            setStrategyName(name);
            setTvl(tvl);
        }
    }

    async function getNumTransactions() {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const strategyContract = new ethers.Contract(strategyAddress, strategyAbi.abi, provider);
        //  const txCount = await strategyContract.getTransactionCount();
        //  let total = BigNumber.from(txCount._hex).toString();
        //  setTotalCount(total);
    }

    useEffect(() => {
        getData();
        getNumTransactions();
    }, [window.ethereum]);


    // get transaction

    const getTransactions = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, provider);
                setTxId(TxId);
                const getTrx = await mswContract.getTransaction(BigNumber.from(TxId));
                setGetTrx([
                    getAddress(getTrx[0]) + " ",
                    BigNumber.from(getTrx[1]._hex).toString() + " ",
                    getTrx[2] + " ",
                    getTrx[3] + " ",
                    (getTrx[4]).toString()
                ]);
                console.log("foi: ", getTrx)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleApproval = async (tokenAddy, amount) => {
        try {
            console.log("app");
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(tokenAddy, erc20Abi.abi, signer);
                const exeTx = await con.approve(strategyAddress, amount);
                await exeTx.wait();
                alert(`approval transaction submitted!`);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleDeposit = async () => {
        try {
            console.log();
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(strategyAddress, strategyAbi.abi, signer);
                const amountToDeposit = prepForDeposit(toDeposit, depositTokenDecimals);
                console.log(`depositing ${amountToDeposit}`)
                const exeTx = await con.deposit(amountToDeposit);
                alert("Your transaction has been sent");
                await exeTx.wait();
                alert("Your Deposit has completed");
                window.location.reload();
            }
        } catch (e) {
            alert("Your deposit has failed");
            console.log(e);
        }
    }

    const handleWithdraw = async () => {
        try {
            console.log();
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(strategyAddress, strategyAbi.abi, signer);
                const exeTx = await con.withdraw(prepForDeposit(toWithdraw, shareDecimals));
                alert("Your transaction has been sent");
                await exeTx.wait();
                alert("Your Withdraw has completed");
                window.location.reload();
            }
        } catch (e) {
            alert("Your Withdraw has failed");
            console.log(e);
        }
    }

    const handleReinvest = async () => {
        try {
            console.log();
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(strategyAddress, strategyAbi.abi, signer);
                const exeTx = await con.reinvest();
                alert("Your transaction has been sent");
                await exeTx.wait();
                alert("Your Reinvest has completed");
                window.location.reload();
            }
        } catch (e) {
            alert("Your reinvest has failed");
            console.log(e);
        }
    }

    const formatDepositBalance = (balance, decimals) => {
        if (decimals == 18) {
            return formatEther(`${balance}`);
        } else {
            return balance / (Math.pow(10, decimals));
        }
    }
    const prepForDeposit = (amount, decimals) => {
        if (decimals == 18) {
            console.log("18")
            return parseEther(`${amount}`);
        } else {
            return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
        }

    }

    const showTVL = () => {
        return (
            tvl ?
                <div>
                    <h4>TVL ${depositTokenDecimals == 18 ? parseEther(tvl): formatDepositBalance(tvl.toString(), depositTokenDecimals)}</h4>
                </div>
                :
                <></>
            );
    }



    return rightNetwork ? (
        rewardTokenSymbol != "" ?
            (

                <div style={{ border: "1px solid grey" }}>
                    <div>
                        <h3 style={{ color: "grey" }}>{strategyAddress}</h3>
                    </div>
                    <div>
                        <h1>{strategyName}</h1>
                    </div>

                    {showTVL()}

                    <div>
                        <h2>Current Reward</h2>
                        <p>{formatEther(currentReward)} {rewardTokenSymbol}</p>
                        <br />
                        <p>{"Share Balance:" + formatEther(shareBalance)}</p>
                    </div>
                    <div>
                        <h2>Deposit:</h2>
                        <p onClick={() => {
                            setToDeposit(formatDepositBalance(depositTokenBalance, depositTokenDecimals))
                        }} style={{ color: "grey", opacity: "95%", cursor: "pointer" }}>Max: {formatDepositBalance(depositTokenBalance, depositTokenDecimals)} {depositTokenSymbol}</p>

                        <input onChange={e => setToDeposit(e.target.value)} type="text"
                            name="toDeposit"
                            placeholder={`Amount of ${depositTokenSymbol} to deposit`}
                            value={toDeposit} />
                        {
                            BigNumber.from(depositTokenBalance).lte(BigNumber.from(depositTokenApproved)) ?
                                <StyledButton onClick={() => {
                                    handleDeposit();
                                }} style={{ marginLeft: 10 }}> Deposit</StyledButton>
                                :
                                <StyledButton onClick={() => {
                                    handleApproval(depositToken, depositTokenTotalSupply);
                                }} style={{ marginLeft: 10 }}> Approve</StyledButton>
                        }
                    </div>
                    <div>
                        <h2>Withdraw:</h2>
                        <p onClick={() => {
                            setToWithdraw(formatDepositBalance(shareBalance, shareDecimals))
                        }} style={{ color: "grey", opacity: "95%", cursor: "pointer" }}>Max: {formatDepositBalance(shareBalance, shareDecimals)} {shareSymbol}</p>

                        <input onChange={e => setToWithdraw(e.target.value)} type="text"
                            name="toWithdraw"
                            placeholder={`Amount of ${shareSymbol} to withdraw`}
                            value={toWithdraw} />
                        {
                            BigNumber.from(shareBalance).lte(BigNumber.from(shareApproved)) ?
                                <StyledButton onClick={() => {
                                    handleWithdraw();
                                }} style={{ marginLeft: 10 }}> Withdraw</StyledButton>
                                :
                                <StyledButton onClick={() => {
                                    handleApproval(strategyAddress, shareTotalSupply);
                                }} style={{ marginLeft: 10 }}> Approve</StyledButton>
                        }

                    </div>

                    <div>
                        <h2>Reinvest</h2>
                        <p>Earn {formatEther(currentReward)} {rewardTokenSymbol} compounding this pool</p>
                        <StyledButton onClick={() => {
                            handleReinvest();
                        }}>
                            Compound
                        </StyledButton>
                    </div>
                </div>
            ) : <div> Loading... </div>) : (
        <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            Please Switch to the correct Network:<br />
            <StyledButton onClick={async () => {
                if (networkId == "0x1") {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{
                            chainId: "0x1",
                        }]
                    });
                } else {
                    console.log(Chains[networkId]);
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: Chains[networkId].chainId,
                            rpcUrls: [Chains[networkId].rpcUrl],
                            chainName: Chains[networkId].chainName,
                            nativeCurrency: Chains[networkId].nativeCurrency,
                            blockExplorerUrls: Chains[networkId].blockExplorerUrls
                        }]
                    });
                }
                window.location.reload();
            }}>Switch to {Chains[networkId].chainName}</StyledButton>
        </div>
    )
}

export default StrategyInterface