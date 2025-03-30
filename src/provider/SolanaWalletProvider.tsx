import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { useMemo, ReactNode } from "react";
import { SOLANA_RPC_URL } from "@/utility/constant";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader,
  XCircle,
} from "lucide-react";

interface SolanaProviderProps {
  children: ReactNode;
}

function SolanaProvider({ children }: SolanaProviderProps) {
  // Define the Solana RPC endpoint
  const endpoint = useMemo(() => SOLANA_RPC_URL, []);
  // const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  // Initialize the wallet adapter
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({
        // config: {
        //   linkingUri: window.location.origin + "/wallet-redirect",
        // },
      }),
      new SolflareWalletAdapter(),
    ],
    []
  );

  // Handle wallet connection errors
  // const onError = useCallback((error: WalletError) => {
  //   toast.error("Wallet Connection Error:", {
  //     description: error?.message,
  //   });
  // }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            classNames: {
              toast:
                "group toast group-[.toaster]:bg-[#111] group-[.toaster]:text-white group-[.toaster]:border-[#27272a] group-[.toaster]:shadow-lg",
              description: "group-[.toast]:text-muted-foreground",
              actionButton:
                "group-[.toast]:bg-primary  group-[.toast]:text-primary-foreground",
              cancelButton:
                "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
          }}
          icons={{
            success: <CheckCircle className="w-4 h-4 text-green-500" />,
            info: <Info className="w-4 h-4 text-blue-500" />,
            warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
            error: <XCircle className="w-4 h-4 text-red-500" />,
            loading: <Loader className="w-4 h-4 text-gray-500 animate-spin" />,
          }}
        />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default SolanaProvider;
