import { createContext, useContext, useState, ReactNode } from "react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

// Define the shape of the Solana Wallet Context
interface SolanaWalletContextType extends WalletContextState {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  connection: Connection;
}

const SolanaWalletContext = createContext<SolanaWalletContextType | null>(null);

interface SolanaWalletProviderProps {
  children: ReactNode;
  endpoint: string;
}

function SolanaWalletProvider({
  children,
  endpoint,
}: SolanaWalletProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const defaultWalletContext = useWallet();

  const connection = new Connection(endpoint);

  return (
    <SolanaWalletContext.Provider
      value={{ ...defaultWalletContext, showModal, setShowModal, connection }}
    >
      {children}
    </SolanaWalletContext.Provider>
  );
}

export function useSolanaWallet() {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error(
      "useSolanaWallet must be used within a SolanaWalletProvider"
    );
  }
  return context;
}

export default SolanaWalletProvider;
