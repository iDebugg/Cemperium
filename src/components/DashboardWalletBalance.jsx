import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faPlus, faMinus, faArrowDown, faArrowUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../styles/DashboardWalletBalance.css';
import { useSelector } from 'react-redux';


const DashboardWalletBalance = () => {
    const balance = useSelector((state)=>state.cryptoAssetsController.totalWalletBalance)
    const ethAddress = useSelector((state) => state.cryptoAssetsController.ethWalletAddress)
    const [showBalance, setShowBalance] = useState(true);
    const [copied, setCopied] = useState(false);


    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ethAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
    };

    const formatAddress = (address) => {
        if (!address) return '';
        const start = address.slice(0, 7);
        const end = address.slice(-4);
        return `${start}...${end}`;
    };

    return (
        <div className="wallet-balance-containerDashboard">
            <div className="balance-headerDasboard">
                <span className='currentBalanceTextDasboard'>Current Balance</span>
                <FontAwesomeIcon 
                    icon={showBalance ? faEyeSlash : faEye} 
                    onClick={toggleShowBalance} 
                    className="iconDasboard" 
                />
            </div>
            <div className="balance-displayDasboard">
                {showBalance ? `$${balance}` : '****'}
            </div>
            <div className="wallet-addressDasboard">
                <div className='walletAndCopyIconDasboard'>
                    {formatAddress(ethAddress)}
                    <FontAwesomeIcon 
                        icon={faCopy} 
                        onClick={copyToClipboard} 
                        className="icon" 
                    />
                    {copied && <div className="copied-messageDasboard">Copied to clipboard!</div>}
                </div>
            </div>
            <div className="actions-containerDasboard">
                <div className="action-buttonDasboard">
                    <button className='transactionBtnDasboard'><FontAwesomeIcon icon={faPlus} className='transactionBtnIconDasboard'/></button>
                    <span>Buy</span>
                </div>
                <div className="action-buttonDasboard">
                    <button className='transactionBtnDasboard'><FontAwesomeIcon icon={faMinus} className='transactionBtnIconDasboard'/></button>
                    <span>Sell</span>
                </div>
                <div className="action-buttonDasboard">
                    <button className='transactionBtnDasboard'><FontAwesomeIcon icon={faArrowDown} className='transactionBtnIconDasboard'/></button>
                    <span>Deposit</span>
                </div>
                <div className="action-buttonDasboard">
                    <button className='transactionBtnDasboard'><FontAwesomeIcon icon={faArrowUp} className='transactionBtnIconDasboard'/></button>
                    <span>Withdraw</span>
                </div>
                <div className="action-buttonDasboard">
                    <button className='transactionBtnDasboard'> <FontAwesomeIcon icon={faExchangeAlt} className='transactionBtnIconDasboard'/></button>
                    <span>Swap</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardWalletBalance;

