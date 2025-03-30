import { cn } from "@/lib/utils";
import { ModalVisibilityType, TokenBalanceInfo } from "@/types/type";
import RootModal from "./RootModal";

interface Props extends ModalVisibilityType {
  tokenBalances: TokenBalanceInfo[];
}
const MyTokenListModal = ({
  tokenBalances,
  showModal,
  setShowModal,
}: Props) => {
  return (
    <RootModal
      showModal={showModal}
      handleModal={setShowModal}
      title="My Tokens"
    >
      <div
        className={`flex pb-5 flex-col transition-all duration-500 ease-in-out 
              overflow-y-scroll h-full  max-h-[400px]`}
      >
        {!tokenBalances?.length && (
          <div className="flex items-center justify-center py-10">
            Tokens not found
          </div>
        )}
        {tokenBalances?.map((token: TokenBalanceInfo, index: number) => (
          <TokenListItem token={token} key={index} />
        ))}
      </div>
    </RootModal>
  );
};

const TokenListItem = ({ token }: { token: TokenBalanceInfo }) => {
  return (
    <div
      className={cn(
        `flex group items-center w-full p-2.5    transition-all border rounded-xl cursor-pointer border-transparent hover:bg-[#111111] hover:bg-white/10 hover:backdrop-blur-xl hover:shadow-2xl hover:border-[#d4ff00]/50`
      )}
    >
      <div className="flex items-center flex-1 space-x-3 text-left ">
        <div className="flex items-center flex-1 space-x-3 text-left ">
          <img
            src={token?.img}
            className="w-10 h-10 border border-[#d4ff00]/50 rounded-full"
          />
          <div>
            <div className="text-white text-md">{token?.name}</div>
            <div className="text-xs text-white/50">{token?.symbol}</div>
          </div>
        </div>
      </div>
      <div>
        {token?.balance > 0 && (
          <div className=" font-minecraft text-[10px] group-hover:text-[#d4ff00] ">
            {`${Number(token?.balance).toLocaleString()} ${token?.symbol}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTokenListModal;
