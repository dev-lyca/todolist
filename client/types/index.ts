import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Column<T> = {
  name: string;  
  uid: keyof T | string;    
};

export type DataTableOptions<T> = {
  statusColorMap?: Record<string, "success" | "warning" | "danger" | "default">;
  renderCustomCell?: (row: T, columnKey: keyof T) => React.ReactNode;
};
