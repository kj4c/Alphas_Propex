import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import RunButton from "./Buttons";


export default function Panel({
  title,
  description,
  children,
  runbutton
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-[90vw] pt-8 pb-4 mx-auto flex-col rounded-xl border border-white/30 bg-[linear-gradient(to_top_right,rgba(24,44,88,0.4)_13.2%,rgba(227,228,252,0.02)_88.27%)] px-4 backdrop-blur-20">
      <div className="flex items-start justify-between w-full">
        <div>
          <h2 className="text-2xl text-white font-bold">{title}</h2>
          <p className="text-sm text-white/70 mt-1">{description}</p>
        </div>
        <Button
          size="sm"
          className="bg-transparent my-auto mr-5 cursor-pointer hover:bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transform transition-transform duration-300",
              isOpen ? "rotate-0" : "rotate-90"
            )}
          />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          opacity: isOpen ? "1" : "0",
          overflow: "hidden",
          transition: "max-height 400ms ease-in-out, opacity 400ms ease-in-out",
        }}
        className="flex flex-col gap-4 items-center py-5"
      >
        <div className="w-full flex flex-col gap-4 items-center">{children}</div>
        <div>{runbutton}</div>
      </div>
    </div>
  );
}
