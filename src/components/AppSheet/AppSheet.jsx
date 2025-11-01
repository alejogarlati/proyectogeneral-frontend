import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const AppSheet = (props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>{props.buttonTitle}</SheetTrigger>
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
