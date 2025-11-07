import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AppSheet = (props) => {
  
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button className={props.buttonClassName} asChild>
          <SheetTrigger>{props.buttonTitle}</SheetTrigger>
        </Button>
        <SheetContent className={props.sheetClassName}>
          <SheetHeader>
            <SheetTitle>{props.sheetTitle}</SheetTitle>
            {/*             <SheetDescription>{props.sheetDescription}</SheetDescription> */}
          </SheetHeader>
          <div className="min-h-0 overflow-y-auto">
            {React.cloneElement(props.children, {
              closeSheet: () => setOpen(false),
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
