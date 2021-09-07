export const validateFile = (type: string): boolean =>
  type === "application/vnd.ms-excel" || type === "text/csv";
