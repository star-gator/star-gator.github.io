import React, {useEffect, useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import abi from "../blockchain/abi.json"
import { CONFIG } from '../blockchain/config';

const WriteContract = () => {
    const [addrTo, setAddrTo] = useState("");
    const [value, setValue] = useState(1);
    const [data, setData] = useState("");
    const [subEvent, setSubEvent] = useState([]);
    const [TxId, setTxId] = useState(0);
    const [contractListened, setContractListened] = useState()

    const SubmitTrx = async () => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
                const subTrx = await mswContract.submitTransaction(
                    addrTo,
                    BigNumber.from(value),
                    data
                );
                await subTrx.wait();
                console.log("Submited: ", subTrx);
            }
        } catch (error) {
            console.log(error)
        }
    }

/*     const submitEventLister = () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
    
            mswContract.on("SubmitTransaction", (owner, txIndex, to, value, data) => {
                console.log("EVENT: ", owner, txIndex, to, value, data);
                setSubEvent((currentSub) => [
                    ...currentSub,
                    {
                    owner,
                    txIndex: BigNumber.from(txIndex),
                    to,
                    value: BigNumber.from(value),
                    data
                    }
                ]);
            });
            }
        } catch (error) {
            console.log("Event ", error);
        }
    } */

    useEffect(()=>{
        submitEventLister();
    },[]);



    const confirmTx = async () => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
                const confTx = await mswContract.confirmTransaction(BigNumber.from(TxId));
                await confTx.wait();
                console.log("Confirmed: ", confTx);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitEventLister = () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
    
            mswContract.on("ConfirmTransaction", (owner, txIndex) => {
                console.log("EVENT confimation: ", owner, txIndex);
                setSubEvent((currentSub) => [
                    ...currentSub,
                    {
                    owner,
                    txIndex: BigNumber.from(txIndex).toString(),
                    }
                ]);
            });
            }
        } catch (error) {
            console.log("Event ", error);
        }
    }

    const executeTX = async () => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
                const exeTx = await mswContract.executeTransaction(BigNumber.from(TxId));
                await exeTx.wait();
                console.log("Executed: ", exeTx);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const revokeTX = async () => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, signer);
                const rvkTx = await mswContract.revokeConfirmation(BigNumber.from(TxId));
                await rvkTx.wait();
                console.log("Revoked: ", rvkTx);
            }
        } catch (error) {
            console.log(error);
        }
    }



  return (
      <>
        <h1>Write Contract</h1>
        <form >
        <div>
            <h2>Submit Transaction</h2>
            <input onChange={e => setAddrTo(e.target.value)} placeholder="Address to" style={{marginLeft: 10}}/>
            <input onChange={e => setValue(e.target.value)} 
            placeholder="Value" style={{marginLeft: 10}} />
            <input onChange={e => setData(e.target.value)} placeholder="Data" style={{marginLeft: 10}} />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    SubmitTrx();
                }}
                style={{marginLeft: 10}}>Submit!</button>
            
        
        <h3>Recent Submited:</h3>
            <div>
{/*                 {subEvent.map((item) => (
                    <div>
                        <p>owner: {item.owner}</p>
                        <p>txIndex: {item.txIndex}</p>
                        <p>to: {item.to}</p>
                        <p>value: {item.value}</p>
                        <p>data: {item.data}</p>
                    </div>
                ))} */}
            </div>
        
        </div>
        </form>
        <div>
        <h2>Confirm Transaction</h2>
        <input onChange={e => setTxId(e.target.value)} type="text"
                    name="TxId"
                    placeholder="Transaction Index"/>
        <button onClick={confirmTx} style={{marginLeft: 10}}> Aprrove!</button>
        <div>
            {subEvent.map(subEvent =>
            <>
                <div>Owner: {subEvent.owner}</div>
                <div>Tx Index: {subEvent.txIndex}</div>
            </>
                )}
        </div>
        </div>
        <div>
        <h2>Execute Transaction</h2>
        <input onChange={e => setTxId(e.target.value)} type="text"
                    name="TxId"
                    placeholder="Transaction Index" />
        <button onClick={executeTX} style={{marginLeft: 10}}> Execute!</button>
        </div>
        <div>
        <h2>Revoke Transaction</h2>
        <input onChange={e => setTxId(e.target.value)} type="text"
                    name="TxId"
                    placeholder="Transaction Index"/>
        <button onClick={revokeTX} style={{marginLeft: 10}}> Revoke!</button>
        </div>
    </>
  )
}

export default WriteContract