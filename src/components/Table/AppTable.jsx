import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AppTable = (props) => {
  return (
    <div>
      <Table className={props.tableStyle}>
        <TableCaption className={props.captionStyle}>{(props.userData.length > 0) && props.caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {props.headers.map((header) => (
              <TableHead className={props.headStyle}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.userData.map((row) => (
            <TableRow>
              {props.columns.map((data) => (
                <TableCell
                  className={
                    (data === "userName" ? "font-bold " : "") +
                    (props.userData.length > 8 ? "h-15" : "h-20")
                  }
                >
                  {row[data]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.userData.length == 0 && (
        <div className="mx-auto pt-4 text-center font-medium w-full">
          No se encontraron datos
        </div>
      )}
    </div>
  );
};
