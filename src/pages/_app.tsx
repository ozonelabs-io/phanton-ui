import "@/styles/globals.css";
import { WalletContextProvider } from "@/utils/walletProvider";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />;
    </WalletContextProvider>
  );
}
