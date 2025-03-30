import { Token } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

type Props = {
  manualSwapEnabled: boolean;
  slippageValue: string;
  sellAmount: string;
  buyAmount: string;
  sellCurrency: Token | null;
  buyCurrency: Token | null;
};

const initialState: Props = {
  manualSwapEnabled: false,
  slippageValue: "",
  sellAmount: "",
  buyAmount: "",
  sellCurrency: null,
  buyCurrency: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setSellAmount: (state, action) => {
      state.sellAmount = action.payload;
    },

    setBuyAmount: (state, action) => {
      state.buyAmount = action.payload;
    },

    setSellCurrency: (state, action) => {
      state.sellCurrency = action.payload;
    },

    setBuyCurrency: (state, action) => {
      state.buyCurrency = action.payload;
    },

    setManualSwap: (state, action) => {
      state.manualSwapEnabled = action.payload;
    },
    setSlippageValue: (state, action) => {
      state.slippageValue = action.payload;
    },

    clearGlobal: () => {
      return initialState;
    },
  },
});

export const {
  clearGlobal,
  setManualSwap,
  setSlippageValue,
  setSellAmount,
  setBuyAmount,
  setSellCurrency,
  setBuyCurrency,
} = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;
