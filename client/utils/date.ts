export const formatShortDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
};


export const formatDate = (dateString: string | Date | null): string => {
  if (!dateString) return "No deadline";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


export function formatDateToYMD(date: Date) {
  return date.toLocaleDateString("en-CA"); 
}
