import { Column, DataTableOptions } from "@/types/index";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  options?: DataTableOptions<T>;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  options = {},
}: DataTableProps<T>) {
  const { statusColorMap = {}, renderCustomCell } = options;

  const renderCell = React.useCallback(
    (row: T, columnKey: keyof T) => {
      const cellValue = row[columnKey];

      // 1. Custom cell rendering from parent
      if (renderCustomCell) {
        const custom = renderCustomCell(row, columnKey);
        if (custom !== undefined) return custom;
      }

      // 2. Predefined rendering for specific columns
      switch (columnKey) {
        case "priority":
          return (
            <Chip
              className="capitalize"
              color={
                cellValue === "High"
                  ? "danger"
                  : cellValue === "Medium"
                    ? "warning"
                    : "success"
              }
              size="sm"
              variant="flat"
            >
              {cellValue as React.ReactNode}
            </Chip>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={(statusColorMap[cellValue as string] || "default") as any}
              size="sm"
              variant="flat"
            >
              {cellValue as React.ReactNode}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex items-center gap-2 justify-center">
              <Tooltip content="View">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FaEye />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="text-lg text-primary-500 cursor-pointer active:opacity-50">
                  <FaEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaTrash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [statusColorMap, renderCustomCell]
  );

  return (
    <Table aria-label="Reusable data table" className="max-w-5xl">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid as string}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={data}>
        {(row) => (
          <TableRow key={row.id}>
            {(columnKey) => (
              <TableCell>{renderCell(row, columnKey as keyof T)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
