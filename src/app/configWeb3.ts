import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const configWeb3 = () => {
  const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [
      jsonRpcProvider({
        rpc: (chain) =>
          chain.id === 80001
            ? {
                http: `https://polygon-mumbai-bor.publicnode.com`,
              }
            : null,
      }),
      alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID || "" }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Prediction Game",
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return { chains, wagmiConfig };
};
