export interface Token {
  address: string;
  decimals: number;
  name: string;
  img: string;
  symbol: string;
  balance: number;
  tags?: string[]; // Optional, assuming it's an array of strings
}
export type TokenBalanceInfo = {
  mint: string;
  balance: number;
  symbol: string;
  decimals: number;
  img: string;
  name: string;
};

export type ModalVisibilityType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};
