import XLSX from 'xlsx'

export function parseEmailsFromExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const emails = [];

  jsonData.forEach((row) => {
    for (const key in row) {
      if (key.toLowerCase().includes("email") && typeof row[key] === "string") {
        emails.push(row[key].trim());
      }
    }
  });

  return emails;
}