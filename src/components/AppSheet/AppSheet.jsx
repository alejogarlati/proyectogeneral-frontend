import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button} from "@/components/ui/button"

export const AppSheet = (props) => {
  return (
    <div>
      <Sheet>
        <Button asChild>
          <SheetTrigger>{props.buttonTitle}</SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{props.sheetTitle}</SheetTitle>
            <SheetDescription>{props.sheetDescription}</SheetDescription>
          </SheetHeader>
          {props.children}
        </SheetContent>
      </Sheet>
    </div>
  );
};
