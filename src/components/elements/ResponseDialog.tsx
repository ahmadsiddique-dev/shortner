import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CopyLink from "./CopyLink";

const ResponseDialog = ({open, setIsOpen, link}: {open: boolean; setIsOpen: any, link: string}) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-3.5">Please Copy your Url!</DialogTitle>
          <div className="relative">
            <Input
              readOnly
              className="pr-7.5 text-blue-500 mask-r-from-65% underline pointer-events-none! select-none!"
              value={
                link
              }
              type="text"
            />
             <CopyLink link={link}/>
          </div>
          <Button variant={"link"} className="max-w-30 my-3.5">
            Go to <ExternalLink />
          </Button>
          <DialogDescription>Payment: Just a ⭐ on <a target="_blank" href="https://github.com/ahmadsiddique-dev/shortner">GitHub</a>.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
