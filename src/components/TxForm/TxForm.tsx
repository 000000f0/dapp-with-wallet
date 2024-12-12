import React, { useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const hardcodedAddress = 'UQAqw-tQtVQpkqJ2aYQZHk1oMT71zKhZ2ueVvSAOO_1XKtpi';
const stateInit = 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==';
const payload = 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==';

export function TxForm() {
    const [amount, setAmount] = useState('');
    const wallet = useTonWallet();
    const [tonConnectUi] = useTonConnectUI();

    const handleSubmit = (e) => {
        e.preventDefault();

        const tx: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600, // Transaction valid for 10 minutes
            messages: [
                {
                    address: hardcodedAddress,
                    amount: amount, // User-entered amount
                    stateInit: stateInit,
                    payload: payload,
                },
            ],
        };

        tonConnectUi.sendTransaction(tx).catch((err) => {
            console.error("Transaction failed", err);
        });
    };

    return (
        <div className="send-tx-form">
            <h3>Send TON Transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Amount (nanoTON):</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="Enter amount in nanoTON"
                    />
                
                {wallet ? (
                    <button type="submit">Send Transaction</button>
                ) : (
                    <button type="button" onClick={() => tonConnectUi.openModal()}>
                        Connect Wallet
                    </button>
                )}
				</div>
            </form>
        </div>
    );
}
