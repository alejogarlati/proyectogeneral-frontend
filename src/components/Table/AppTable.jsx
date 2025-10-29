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
            {props.headers.map((header, index) => (
              <TableHead key={index} className={props.headStyle}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.userData.map((row) => (
            <TableRow key={row.id} onClick={()=>props.onSelect?.(row)}>
              {props.columns.map((data, index) => (
                <TableCell
                  key={index}
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
        <div className={props.noDataStyle}>
          No se encontraron datos
        </div>
      )}
    </div>
  );
};
