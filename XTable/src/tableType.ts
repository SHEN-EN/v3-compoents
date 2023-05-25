type header = { title: string; [key: string]: string }[];
type body = { 
  [key: string]: string 
  id: string 
};
interface tableData {
  header: header;
  body: body[];
}
export type { header, body, tableData };
