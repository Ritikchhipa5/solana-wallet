import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { ModalVisibilityType, Token } from "@/types/type";
import RootModal from "./RootModal";

interface Props extends ModalVisibilityType {
  tokens: Token[];
  handleToken: (token: Token) => void;
  tokenSearch: string;
  handleTokenSearch: (search: string) => void;
}
const SelectTokenModal = ({
  showModal,
  setShowModal,
  tokens,
  handleToken,
  tokenSearch,
  handleTokenSearch,
}: Props) => {
  return (
    <RootModal
      showModal={showModal}
      handleModal={setShowModal}
      title="Select a token"
    >
      <>
        <InputSearch
          tokenSearch={tokenSearch}
          handleTokenSearch={handleTokenSearch}
        />
        <div
          className={`flex pb-5 flex-col transition-all duration-500 ease-in-out 
              overflow-y-scroll h-full  max-h-[400px]`}
        >
          {!tokens?.length && (
            <div className="flex items-center justify-center py-10">
              Token not found
            </div>
          )}
          {tokens?.map((token: Token, index: number) => (
            <TokenListItem
              handleToken={() => {
                handleToken(token);
                setShowModal(false);
              }}
              token={token}
              key={index}
            />
          ))}
        </div>
      </>
    </RootModal>
  );
};

const TokenListItem = ({
  token,
  handleToken,
}: {
  token: Token;
  handleToken: () => void;
}) => {
  return (
    <div
      onClick={handleToken}
      className={cn(
        `flex group items-center w-full p-2.5    transition-all border rounded-xl cursor-pointer border-transparent hover:bg-[#111111] hover:bg-white/10 hover:backdrop-blur-xl hover:shadow-2xl hover:border-[#d4ff00]/50`
      )}
    >
      <div className="flex items-center flex-1 space-x-3 text-left ">
        <img
          src={token?.img}
          className="w-10 h-10 border border-[#d4ff00]/50 rounded-full"
        />
        <div>
          <div className="text-white text-md">{token?.name}</div>
          <div className="text-xs text-white/50">{token?.symbol}</div>
          <div className="text-[10px] text-[#d4ff00]/70 group-hover:text-[#d4ff00]">{`${token?.address?.slice(
            0,
            6
          )}...${token?.address?.slice(-6)}`}</div>
        </div>
      </div>
      <div>
        {token?.balance > 0 && (
          <>
            <div className=" font-minecraft text-[10px] group-hover:text-[#d4ff00] ">
              {`${Number(token?.balance).toLocaleString()} ${token?.symbol}`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const InputSearch = ({
  tokenSearch,
  handleTokenSearch,
}: {
  tokenSearch: string;
  handleTokenSearch: (value: string) => void;
}) => {
  return (
    <div className="py-1 px-5 bg-[#1C1C1C] rounded-full mb-2">
      <div className="flex items-center ">
        <Search size={18} />
        <Input
          onChange={(e) => {
            handleTokenSearch(e.target.value);
          }}
          value={tokenSearch}
          className="text-white border-none focus-visible:ring-0"
          placeholder="Search tokens"
        />
      </div>
    </div>
  );
};
export default SelectTokenModal;
