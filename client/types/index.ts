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
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "moderate" | "urgent";
  category?: "personal" | "school" | "work";
  deadline?: string;        
  reminderAt?: string;      
  createdAt?: string;       
  updatedAt?: string;
}