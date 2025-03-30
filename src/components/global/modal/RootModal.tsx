import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
function RootModal({
  title,
  showModal,
  handleModal,
  children,
}: {
  title: string;
  showModal: boolean;
  handleModal: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog open={showModal} onOpenChange={handleModal}>
      <DialogContent className="bg-[#000000] pb-0  border-2   px-5  max-w-[400px]  border-[#272727]  font-minecraft ">
        <DialogHeader className="">
          <DialogTitle className="mb-4 text-left text-white ">
            {title}
          </DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RootModal;
