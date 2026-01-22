// Your ata is: C6foJ3rUyVNTycQDgCSDUVgZYrS3CbTDknpYdBiVp3nE
// Your mint txid: 3MrHifixGUQftEB2Xp4soDXsJy9iTBvxNaxZS3zspCTkaBMtqxmmFrjd1Yob4sjxNTMbNAfn6ypPF7mjiSCfHuPy

import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("AcPGSvoEt46p5DAQJwFhoWCK2WCnTWXyPdQk1LoChUiY");

(async () => {
    try {
        // Create an ATA
        const senderAta = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        )
        console.log(`Your ata is: ${senderAta.address.toBase58()}`);


        // Mint to ATA
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            senderAta.address,
            keypair,
            100e9
        );

        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
