import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faPlus, faMinus, faArrowDown, faArrowUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../styles/WalletBalance.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateWalletBalance } from '../controller/assetscontroller';
import { updateEthWalletAddress } from '../controller/assetscontroller';

const WalletBalance = () => {
    const balance = useSelector((state) => state.cryptoAssetsController.totalWalletBalance);
    const ethAddress = useSelector((state) => state.cryptoAssetsController.ethWalletAddress);
    const [showBalance, setShowBalance] = useState(true);
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${process.env.REACT_APP_BALANCE_API_URL}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => {
                dispatch(updateWalletBalance(response.data.estimatedUSDBalance));
            })
            .catch(error => {
                console.error('There was an error fetching the balance!', error);
            });

            // Fetching wallet addresses
            axios.get(`${process.env.REACT_APP_ADDRESS_API_URL}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => {
                const ethAddress = response.data.walletAddresses.ETH;
                if (ethAddress) {
                    dispatch(updateEthWalletAddress(ethAddress));
                } else {
                    console.log('ETH address not found');
                }
            })
            .catch(error => {
                console.error('There was an error fetching the wallet addresses!', error);
            });
        }
    }, [dispatch]);

    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };

    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(ethAddress).then(() => {
                console.log('Text copied to clipboard');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
            }).catch(err => {
                console.error('Failed to copy text to clipboard: ', err);
            });
        } else {
            // Fallback for browsers that don't support navigator.clipboard
            console.warn('Clipboard API not supported, using fallback');
            const textArea = document.createElement("textarea");
            textArea.value = ethAddress;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                console.log('Text copied to clipboard using fallback');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text to clipboard: ', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const formatAddress = (address) => {
        if (!address) return '';
        const start = address.slice(0, 7);
        const end = address.slice(-4);
        return `${start}...${end}`;
    };

    return (
        <div className="wallet-balance-container">
            <div className="balance-header">
                <span className='currentBalanceText'>Current Balance</span>
                <FontAwesomeIcon 
                    icon={showBalance ? faEyeSlash : faEye} 
                    onClick={toggleShowBalance} 
                    className="icon" 
                />
            </div>
            <div className="balance-display">
                {showBalance ? `$${balance}` : '****'}
            </div>
            <div className="wallet-address">
                <div className='walletAndCopyIcon'>
                    {formatAddress(ethAddress)}
                    <FontAwesomeIcon 
                        icon={faCopy} 
                        onClick={copyToClipboard} 
                        className="icon" 
                    />
                    {copied && <div className="copied-message">Eth wallet Copied to clipboard!</div>}
                </div>
            </div>
            <div className="actions-container">
                <div className="action-button">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faPlus} className='transactionBtnIcon'/></button>
                    <span>Buy</span>
                </div>
                <div className="action-button">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faMinus} className='transactionBtnIcon'/></button>
                    <span>Sell</span>
                </div>
                <div className="action-button">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faArrowDown} className='transactionBtnIcon'/></button>
                    <span>Deposit</span>
                </div>
                <div className="action-button">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faArrowUp} className='transactionBtnIcon'/></button>
                    <span>Withdraw</span>
                </div>
                <div className="action-button">
                    <button className='transactionBtn'> <FontAwesomeIcon icon={faExchangeAlt} className='transactionBtnIcon'/></button>
                    <span>Swap</span>
                </div>
            </div>
        </div>
    );
};

export default WalletBalance;
