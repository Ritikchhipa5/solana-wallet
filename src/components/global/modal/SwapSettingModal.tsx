import { ModalVisibilityType } from "@/types/type";
import { Switch } from "../../ui/switch";
import { Info, LucideMessageCircleWarning, Percent } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Input } from "../../ui/input";
import { ReactNode } from "react";
import { handleDecimalCountWithRange } from "@/utility/formatHandler";
import { useAppDispatch } from "@/store/hooks";
import { setManualSwap, setSlippageValue } from "@/store/reducers/globalSlice";
import RootModal from "./RootModal";

interface Props extends ModalVisibilityType {
  manualSwapEnabled: boolean;
  slippageValue: string;
}
const SwapSettingModal = ({
  showModal,
  setShowModal,
  manualSwapEnabled,
  slippageValue,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <RootModal
      showModal={showModal}
      handleModal={setShowModal}
      title="Swap Settings"
    >
      <div
        className={`flex pb-5 flex-col transition-all duration-500 ease-in-out 
              overflow-y-scroll h-full  max-h-[400px] gap-3`}
      >
        {Number(slippageValue) > 50 && (
          <div className="flex items-center text-left bg-[#fdb022] p-2 rounded-lg text-[#5d3500] space-x-2 border border-[#5d3500]">
            <LucideMessageCircleWarning size={22} />
            <div className="text-[10px] leading-3">
              Your transaction may be frontrun and result in an unfavourable
              trade.
            </div>
          </div>
        )}
        <SettingItem
          title="Mode Enable Manual Swap"
          infoDescription={
            <>
              Zpaswap sets everything up automatically. <br />
              If you turn it on, you must configure it manually
            </>
          }
        >
          <Switch
            checked={manualSwapEnabled}
            onCheckedChange={(e) => {
              if (!e) {
                dispatch(setSlippageValue(""));
              }
              dispatch(setManualSwap(e));
            }}
          />
        </SettingItem>

        <>
          {!manualSwapEnabled ? (
            <p className="p-5 text-xs text-center">
              <span className="text-[#d4ff00] animate-pulse">Zpaswap</span> sets
              everything up automatically. <br />
              If you turn it on, you must configure it manually
            </p>
          ) : (
            <SettingItem
              title="Slippage Setting"
              infoDescription={
                <>Set a fixed slippage, and we'll apply the exact amount</>
              }
            >
              <div className="flex rounded-lg  text-xs items-center border-[#27272a] border h-7 p-2">
                <Input
                  className="w-[35px] font-sans h-6 outline-none text-white border-none  rounded-lg p-0 "
                  placeholder="0.00%"
                  value={slippageValue}
                  onChange={(e) =>
                    dispatch(
                      setSlippageValue(
                        handleDecimalCountWithRange(e.target.value)
                      )
                    )
                  }
                />
                {slippageValue && <Percent color="white" size={12} />}
              </div>
            </SettingItem>
          )}
        </>
      </div>
    </RootModal>
  );
};

const SettingItem = ({
  infoDescription,
  title,
  children,
}: {
  infoDescription: React.ReactElement;
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={10} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{infoDescription}</p>
            </TooltipContent>
          </Tooltip>
          <div className="text-xs">{title}</div>
        </div>
        {children}
      </div>
    </>
  );
};
export default SwapSettingModal;
