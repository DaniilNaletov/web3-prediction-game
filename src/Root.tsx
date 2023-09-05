import React from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  //   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  [
    // jsonRpcProvider({
    //   rpc: (chain) =>
    //     chain.id === ChainId.Mumbai
    //       ? {
    //           http: `https://mumbai.rpc.thirdweb.com`,
    //         }
    //       : null,
    // }),
    jsonRpcProvider({
      rpc: (chain) => ({
        // http: `https://mumbai.rpc.thirdweb.com`,
        http: `https://polygon-mumbai-bor.publicnode.com`,
      }),
    }),
    alchemyProvider({ apiKey: "wbDnOoJkUNVUNnbv0egtj8odoWrvtmMB" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Prediction Game",
  projectId: "3cd75cc58e9b1054259255c55bd8cfa2",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Root: React.FC = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Root;
