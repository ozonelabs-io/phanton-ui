import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { WalletMultiButton } from "./_app";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import { connection } from "@/utils/walletProvider";
import { toast } from "react-toastify";

export default function Home() {
  const wallet = useWallet();
  const handleClaim = async () => {
    if (!wallet || !wallet.publicKey || !wallet.connected) {
      return;
    }

    const message = "The quick brown fox jumps over the lazy dog";
    const messageBytes = new TextEncoder().encode(message);
    try {
      const signature = await wallet.signMessage(messageBytes);
      console.log(base58.encode(signature));
      toast.success("Signing Mesaage Done ");
    } catch (error) {
      toast.error("Signing Mesaage Error ");

      console.log("Signature failed");
    }
  };

  return (
    <>
      <Head>
        <title>CoinCorp HQ</title>
        <meta name="description" content="CoinCorp HQ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={styles.MainContainer}>
        <div className={styles.Navbar}>
          <Image src="/logo.png" alt="error" width={40} height={40} />
          <span>Terms Of Services</span>
          {/* <button>Connect Wallet</button> */}
          <WalletMultiButton />
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.contentHead}>
            <span>Welcome 👋</span>
            <h2>Pre-Register via HQ</h2>
          </div>
          <span className={styles.contentDesc}>
            Complete a few simple steps to start collecting with CoinCorp.
          </span>
          <Image src="/banner.png" alt="error" width={100} height={100} />
          <div className={styles.contentsteps}>
            <span>1</span>
            <span>Connect Wallet</span>
          </div>
          <div className={styles.contentsteps}>
            <span>2</span>
            <span>Claim FREE Raffle Ticket</span>
          </div>
          <button onClick={() => handleClaim()}>
            Claim Raffle
            <Image src="/btn.png" alt="error" width={20} height={20} />
          </button>
        </div>

        <div className={styles.Footer}>
          <div className={styles.footerIcons}>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-telegram"></i>
            <i className="fa-brands fa-discord"></i>
            <span>?</span>
            <span>Help</span>
            <span>BETa</span>
          </div>
          <span className={styles.footerBottom}>
            © 2024 CoinCorp. All rights reserved.
          </span>
        </div>
      </main>
    </>
  );
}
