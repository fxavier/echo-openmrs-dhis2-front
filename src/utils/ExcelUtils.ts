import { read, utils, write, WorkBook } from 'xlsx';

type ExcelValue = string | number | boolean | null;

export const readExcelFile = (file: File): Promise<WorkBook> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        resolve(workbook);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const mergeWorkbooks = (workbooks: WorkBook[]): WorkBook => {
  if (workbooks.length === 0) {
    throw new Error('No workbooks to merge');
  }

  const baseWorkbook = workbooks[0];
  const remainingWorkbooks = workbooks.slice(1);

  remainingWorkbooks.forEach((workbook) => {
    Object.keys(workbook.Sheets).forEach((sheetName) => {
      if (baseWorkbook.Sheets[sheetName]) {
        // Get data and styles from both sheets
        const baseSheet = baseWorkbook.Sheets[sheetName];
        const newSheet = workbook.Sheets[sheetName];
        
        // Convert sheets to JSON with styles
        const baseData = utils.sheet_to_json(baseSheet, { header: 1, raw: false }) as ExcelValue[][];
        const newData = utils.sheet_to_json(newSheet, { header: 1, raw: false }) as ExcelValue[][];
        
        // Skip first 7 rows from the new sheet and append the rest
        const rowsToAdd = newData.slice(7);
        baseData.push(...rowsToAdd);
        
        // Convert back to sheet with styles
        baseWorkbook.Sheets[sheetName] = utils.aoa_to_sheet(baseData);
      } else {
        // If sheet doesn't exist in base workbook, add it (skipping first 7 rows)
        const newSheet = workbook.Sheets[sheetName];
        const newData = utils.sheet_to_json(newSheet, { header: 1, raw: false }) as ExcelValue[][];
        const rowsToAdd = newData.slice(7);
        baseWorkbook.Sheets[sheetName] = utils.aoa_to_sheet(rowsToAdd);
        if (!baseWorkbook.SheetNames.includes(sheetName)) {
          baseWorkbook.SheetNames.push(sheetName);
        }
      }
    });
  });

  return baseWorkbook;
};

export const saveWorkbook = (workbook: WorkBook, fileName: string): void => {
  const wbout = write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
};