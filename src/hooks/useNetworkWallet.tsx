import { useEffect, useMemo, useState } from "react";
import { useSolanaWallet } from "@/provider/WalletProvider";
import { TokenBalanceInfo } from "@/types/type";
import { JUPITER_SWAPPER } from "@/services/api/jupiter";

function useNetworkWallet() {
  const { connection, connected, publicKey } = useSolanaWallet();
  const [tokenBalancesLoading, setTokenBalancesLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useState<TokenBalanceInfo[]>([]);
  const { accountInfo, accountInfoRefetch } = JUPITER_SWAPPER.getMyAccountInfo({
    address: publicKey?.toString() as string,
  });
  const apiData: any = useMemo(() => accountInfo?.data, [accountInfo]);

  // Fetch both SOL and SPL token balances
  const fetchTokenBalances = async () => {
    setTokenBalancesLoading(true);

    try {
      const newBalances: TokenBalanceInfo[] = [];

      if (!publicKey) {
        newBalances.push({
          mint: "So11111111111111111111111111111111111111112",
          balance: 0,
          symbol: "SOL",
          decimals: 9,
          img: "",
          name: "Solana",
        });
      } else {
        // Fetch SOL Balance
        const solBalanceLamports = await connection.getBalance(publicKey);
        const solBalance = solBalanceLamports / 1e9; // Convert lamports to SOL
        newBalances.push({
          mint: "So11111111111111111111111111111111111111112",
          balance: solBalance,
          symbol: "SOL",
          name: "Solana",
          decimals: 9,
          img: "",
        });

        // // Fetch SPL Token Balances
        // const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        //   publicKey,
        //   { programId: TOKEN_PROGRAM_ID }
        // );

        // tokenAccounts.value.forEach((account) => {
        //   const info = account.account.data.parsed.info;
        //   newBalances.push({
        //     mint: info.mint,
        //     balance: info.tokenAmount.uiAmount,
        //     symbol: info.tokenAmount.uiAmount > 0 ? "SPL Token" : "Unknown",
        //     decimals: info.tokenAmount.decimals,
        //     img: IMAGES.LOGO, // Placeholder for img, will be populated later
        //   });
        // });

        // Fetch additional token data from Jupiter Swapper

        apiData?.elements.forEach((element: any) => {
          element.data.assets.forEach((asset: any) => {
            const tokenInfo =
              apiData.tokenInfo[asset.networkId]?.[asset.data.address] || {};

            if (
              ["11111111111111111111111111111111"].includes(asset.data.address)
            ) {
              return;
            }
            newBalances.push({
              mint: asset.data.address,
              balance: asset.data.amount,
              symbol: tokenInfo.symbol || "Unknown",
              decimals: tokenInfo.decimals || 9,
              name: tokenInfo?.name,
              img: tokenInfo.logoURI ? tokenInfo.logoURI : tokenInfo.logoURI,
            });
          });
        });
      }

      setTokenBalances(newBalances);
    } catch {
      // console.error("Error fetching balances:", error);
    } finally {
      setTokenBalancesLoading(false);
    }
  };

  useEffect(() => {
    if (connected) fetchTokenBalances();
  }, [connected, publicKey, accountInfo]);

  return {
    tokenBalances,
    tokenBalancesLoading,
    fetchTokenBalances: accountInfoRefetch,
  };
}

export default useNetworkWallet;
