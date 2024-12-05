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
        const baseSheet = baseWorkbook.Sheets[sheetName];
        const newSheet = workbook.Sheets[sheetName];
        
        const baseData = utils.sheet_to_json(baseSheet, { header: 1, raw: false }) as ExcelValue[][];
        const newData = utils.sheet_to_json(newSheet, { header: 1, raw: false }) as ExcelValue[][];
        
        const rowsToAdd = newData.slice(7).filter(row => row.some(cell => cell !== null && cell !== ''));
        baseData.push(...rowsToAdd);
        
        const updatedSheet = utils.aoa_to_sheet(baseData);
        
        updatedSheet['!merges'] = baseSheet['!merges'];
        updatedSheet['!cols'] = baseSheet['!cols'];
        updatedSheet['!rows'] = baseSheet['!rows'];
        
        Object.keys(baseSheet).forEach((cell) => {
          if (cell[0] !== '!') {
            updatedSheet[cell] = {
              ...baseSheet[cell],
              v: updatedSheet[cell]?.v,
              s: baseSheet[cell].s
            };
          }
        });
        
        baseWorkbook.Sheets[sheetName] = updatedSheet;
      } else {
        const newSheet = workbook.Sheets[sheetName];
        const newData = utils.sheet_to_json(newSheet, { header: 1, raw: false }) as ExcelValue[][];
        const rowsToAdd = newData.slice(7).filter(row => row.some(cell => cell !== null && cell !== ''));
        const newSheetWithStyles = utils.aoa_to_sheet(rowsToAdd);
        
        baseWorkbook.Sheets[sheetName] = newSheetWithStyles;
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