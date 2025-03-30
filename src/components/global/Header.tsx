import { Button } from "../ui/button";
import { useSolanaWallet } from "@/provider/WalletProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import MyTokenListModal from "./modal/MyTokenListModal";
import { useMemo, useState } from "react";
import useNetworkWallet from "@/hooks/useNetworkWallet";
import { SOLANA_ADDRESS } from "@/utility/constant";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { handleSolanaPriceFormat } from "@/utility/formatHandler";

function Header() {
  const { setShowModal } = useSolanaWallet();
  const [showMyTokensModal, setShowMyTokensModal] = useState(false);
  const { tokenBalances, tokenBalancesLoading } = useNetworkWallet();

  const { publicKey, connected, disconnect, connecting, disconnecting } =
    useWallet();

  const solanaBalance = useMemo(
    () =>
      tokenBalances?.find(
        (token) => token.mint.toLowerCase() === SOLANA_ADDRESS.toLowerCase()
      ),
    [tokenBalances]
  );

  const renderSolanaPrice = () => {
    if (tokenBalances?.length && connected) {
      return (
        <Button
          onClick={() => setShowMyTokensModal(true)}
          variant="outline"
          className="rounded-full px-2 border-gray-700 bg-[#111111] hover:bg-[#272727] hover:text-white flex items-center gap-2"
        >
          {tokenBalancesLoading ? (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          ) : (
            <>
              <img
                className="flex items-center justify-center w-6 h-6 text-xs bg-blue-500 rounded-full"
                src={
                  "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                }
              />
              <span>
                ${" "}
                {handleSolanaPriceFormat(
                  Number(solanaBalance?.balance),
                  undefined
                )}{" "}
                {solanaBalance?.symbol}
              </span>
            </>
          )}
        </Button>
      );
    }
    return;
  };

  return (
    <header className="container z-10 flex flex-wrap items-center justify-between px-4 py-4 mx-auto gap-y-3 font-minecraft">
      <div className="flex flex-wrap items-center justify-end flex-1 gap-2 sm:flex-nowrap">
        {renderSolanaPrice()}
        <Button
          onClick={() => {
            if (connected) {
              disconnect().then(() => {
                toast.error("Wallet disconnected.", {
                  description:
                    "Your wallet has been disconnected successfully.",
                });
              });
            } else {
              setShowModal(true);
            }
          }}
          disabled={connecting || disconnecting}
          className="bg-[#d4ff00] font-minecraft hover:bg-[#c2ee00] text-black font-bold rounded-full px-6"
        >
          {connecting
            ? "Connecting..."
            : connected
            ? `${publicKey?.toString()?.slice(0, 4)}...${publicKey
                ?.toString()
                ?.slice(-6)}`
            : "Connect Wallet"}
        </Button>
        <MyTokenListModal
          tokenBalances={tokenBalances}
          showModal={showMyTokensModal}
          setShowModal={setShowMyTokensModal}
        />
      </div>
    </header>
  );
}

export default Header;
