import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};



export interface GoogleUser {
  _id?: string;         
  googleId: string;    
  displayName: string;  
  email?: string;       
  photo?: string;       
  createdAt?: string;  
  updatedAt?: string;
}

export type Column<T> = {
  name: string;  
  uid: keyof T | string;    
};

export type DataTableOptions<T> = {
  statusColorMap?: Record<string, "success" | "warning" | "danger" | "default">;
  renderCustomCell?: (row: T, columnKey: keyof T | string) => React.ReactNode;
};


export interface Task {
  _id?: string;            
  user: string;            
  title: string;            
  description?: string;     
  status: "Pending" | "In-progress" | "Completed";
  priority?: "Low" | "Moderate" | "Urgent";
  category?: "Personal" | "School" | "Work";
  deadline?: string;        
  reminderAt?: string;      
  color: string;      
  createdAt?: string;       
  updatedAt?: string;
}