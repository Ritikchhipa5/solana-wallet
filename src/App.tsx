import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SolanaProvider from "./provider/SolanaWalletProvider";

import "./App.css";
import WalletsConnectModal from "./components/global/modal/WalletsConnectModal";
import { TooltipProvider } from "./components/ui/tooltip";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import SolanaWalletProvider from "./provider/WalletProvider";
import { SOLANA_RPC_URL } from "./utility/constant";
import Header from "./components/global/Header";

const queryClient = new QueryClient();
function App() {
  return (
    <SolanaProvider>
      <SolanaWalletProvider endpoint={SOLANA_RPC_URL}>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <Header />
                <WalletsConnectModal />
              </PersistGate>
            </Provider>
          </QueryClientProvider>
        </TooltipProvider>
      </SolanaWalletProvider>
    </SolanaProvider>
  );
}

export default App;
