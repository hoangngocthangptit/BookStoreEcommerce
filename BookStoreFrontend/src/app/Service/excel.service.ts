import { Injectable } from '@angular/core';
import * as ExcelJs from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from "exceljs";
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  [x: string]: any;

  constructor() { }
  generateExcel(fileName: string, excelArray: Excel[]) {
    var options = {
        filename: './streamed-workbook.xlsx',
        useStyles: true,
        useSharedStrings: true
    };
    let workbook: ExcelProper.Workbook = new ExcelJs.Workbook(options);
    excelArray.forEach(excel => {
        var worksheet = workbook.addWorksheet(excel.sheetName);

        //Đặt tiêu đề
        this.setTitle(worksheet, excel);

        //Đặt tiêu đề phụ
        this.setSubTitle(worksheet, excel);

        //set group
        let positionGroup = this.setGroup(worksheet, excel);
        //set headers
        this.setHeader(worksheet, excel, positionGroup);

        //merge Group Header
        this.mergerGroup(worksheet, excel);



        //set data
        this.setData(worksheet, excel);

        // merge group data body
        this.mergeGroupBody(worksheet, excel)
    })

    this.saveAsExcelFile(workbook, fileName);


}

//dumv
generateExcelWithTotalRow(fileName: string, excelArray: Excel[], keyTotal,nameKeyTotal,nameToTal) {
    var options = {
        filename: './streamed-workbook.xlsx',
        useStyles: true,
        useSharedStrings: true
    };
    let workbook: ExcelProper.Workbook = new ExcelJs.Workbook(options);
    excelArray.forEach(excel => {
        var worksheet = workbook.addWorksheet(excel.sheetName);

        //Đặt tiêu đề
        this.setTitle(worksheet, excel);

        //Đặt tiêu đề phụ
        this.setSubTitle(worksheet, excel);

        //set group
        let positionGroup = this.setGroup(worksheet, excel);
        //set headers
        this.setHeader(worksheet, excel, positionGroup);

        //merge Group Header
        this.mergerGroup(worksheet, excel);



        //set data
        this.setDataWithTotalRow(worksheet, excel, keyTotal,nameKeyTotal,nameToTal);

        // merge group data body
        this.mergeGroupBody(worksheet, excel)
    })

    this.saveAsExcelFile(workbook, fileName);


}



setWorksheet(workbook: ExcelProper.Workbook, excel: Excel) {
    if (!excel.workSheet) {
        return;
    }

    return workbook.addWorksheet(excel.workSheet);
}

setTitle(worksheet: ExcelProper.Worksheet, excel: Excel) {
    worksheet.mergeCells(`A1: ${this.convertToExcelPosition(excel.headers.length - 1)}1`);
    worksheet.getCell('A1').value = excel.title;
    worksheet.getCell('A1').style = {
        font: { name: 'Times New Roman', size: 24, bold: true },
        alignment: { vertical: 'middle', horizontal: 'center' }
    }
}

setSubTitle(worksheet: ExcelProper.Worksheet, excel: Excel) {
    if (!excel.subTitle)
        return;

    worksheet.mergeCells(`A2:${this.convertToExcelPosition(excel.headers.length - 1)}2`);
    worksheet.getCell('A2').value = excel.subTitle;
    worksheet.getCell('A2').style = {
        font: { name: 'Times New Roman', size: 18, bold: true },
        alignment: { vertical: 'middle', horizontal: 'center' }
    }
}

setGroup(worksheet: ExcelProper.Worksheet, excel: Excel) {
    let rowStart = 2;

    if (!excel.groupHeaders)
        return rowStart;

    if (excel.subTitle) {
        rowStart++;
    }
    worksheet.getRow(rowStart).height = 35;

    if (excel.groupHeaders) {
        excel.groupHeaders.forEach((group) => {
            let data = group.length;
            if (data > 0) {
                rowStart++;
                group.forEach((groupChild, indexChild) => {
                    let startPos = this.convertToExcelPosition(indexChild);

                    worksheet.getCell(`${startPos}${rowStart}`).style = {
                        font: { name: 'Times New Roman', size: 14, bold: true },
                        alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' },
                    };

                    worksheet.getCell(`${startPos}${rowStart}`).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };

                    if (indexChild == 0) {
                        worksheet.getCell(`A${rowStart}`).value = groupChild;
                    } else {
                        worksheet.getCell(`${startPos}${rowStart}`).value = groupChild;
                    }

                });

            }
        });
    }
    return rowStart;
}

mergerGroup(worksheet: ExcelProper.Worksheet, excel: Excel) {
    if (excel.groupMerge) {
        excel.groupMerge.forEach((value) => {
            worksheet.mergeCells(`${value}`);
        });
    }
}

mergeGroupBody(worksheet, excel) {

    if (!excel.groupMerge) {
        let rowStart = 4

        excel.data.forEach((item, idx) => {
            if (item.isGroup && excel.startMergeBody &&  excel.endMergeBody) {
                let startPosMerge = this.convertToExcelPosition(excel.startMergeBody - 1);
                let endPosMerge = this.convertToExcelPosition(excel.endMergeBody - 1);
                worksheet.mergeCells(`${startPosMerge}${rowStart + idx}:${endPosMerge}${rowStart + idx}`);

                worksheet.getRow(rowStart + idx).height = 35;
                worksheet.getRow(rowStart + idx).eachCell(cell => {
                    cell.style = {
                        font: { name: 'Times New Roman', size: 14, bold: true },
                        alignment: { wrapText: true, vertical: 'middle', horizontal: 'left' }
                    };

                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };

                })

            }
        })
    }
}

setHeader(worksheet: ExcelProper.Worksheet, excel: Excel, positionGroup: number) {
    let positionHeader = ++positionGroup;
    let isSplitHeaderExcel;

    if(excel.isNotSplitHeader ) {
        isSplitHeaderExcel = false
    } else {
        isSplitHeaderExcel = true
    }
    console.log(isSplitHeaderExcel)

    if(isSplitHeaderExcel) {
        worksheet.getRow(positionHeader).values = excel.headers;
        worksheet.getRow(positionHeader).eachCell((cell, colNum) => {
            cell.style = {
                font: { name: 'Times New Roman', size: 14, bold: true },
                alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' }
            };

            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        })
    }


    //set key header
    worksheet.columns = excel.headers.map((header, index) => {
        return {
            // header: header,
            key: excel.keys[index],
            width: excel.widths[index],
            style: { font: { name: 'Times New Roman', size: 14 }, alignment: { wrapText: true } },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        }
    });
}

//dumv
setDataWithTotalRow(worksheet: ExcelProper.Worksheet, excel: Excel, keyTotal , nameKeyTotal,  nameTotal) {

    const arrRowTotal = [];
    let ind1 = 0;
    let status_add= 0;

    keyTotal.forEach(item => {
            arrRowTotal.push(
                {
                    total: (item !== '')?true:false,
                    cell_s:"",
                    cell_e:"",
                    cell_t:"",
                    key:item
                }
            );
    });
    excel.data.forEach(item => {
        if(ind1=== excel.data.length-1){
            status_add =2;
        }
            ind1++;
        //kiểm tra dữ liệu null trong dữ liệu xuất excel ~ define về ''
        Object.keys(item).forEach(key => {
            if (!item[key]) {
                    item[key] = '';
            }
        })
        let index=0;
        //thêm dữ liệu ~ set style
        let row = worksheet.addRow(item);
        row.eachCell((cell, colNum) => {
            if(status_add==0){
                let obj= arrRowTotal[index];
                if(obj['total']){
                    obj['cell_s'] = cell.address;
                    arrRowTotal[index] = obj;
                }
            }else if(status_add==2){
                let obj= arrRowTotal[index];
                if(obj['total']){
                    obj['cell_e'] = cell.address;
                    arrRowTotal[index] = obj;
                }
            }
            cell.style = {
                font: { name: 'Times New Roman', size: 12 },
                alignment: {
                    wrapText: true,
                    vertical: 'middle',
                    horizontal: typeof cell.value == 'number' ? 'center' : 'left',
                }
            };

            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            index++;
        })
        if(status_add === 0 ){
            status_add = 1;
        }if(status_add==2){
            let items = item;
            Object.keys(items).forEach(key => {
                if(keyTotal.indexOf(key)>=0){
                    items[key] = 0;
                }else{
                    if(key==nameKeyTotal){
                        items[key] = nameTotal;
                    }else{
                        items[key] = '';
                    }
                }
            })
             index=0;
            //thêm dữ liệu ~ set style
            let rows = worksheet.addRow(items);
            rows.eachCell((cell, colNum) => {
                let obj= arrRowTotal[index];
                if(obj['total']){
                    cell.value = { formula: `SUM(${obj['cell_s']}:${obj['cell_e']})`, date1904: false }
                }
                cell.style = {
                    font: { name: 'Times New Roman', size: 12 },
                    alignment: {
                        wrapText: true,
                        vertical: 'middle',
                        horizontal: typeof cell.value == 'number' ? 'center' : 'left',
                    }
                };

                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                index++;
            })
        }
    });
}

setData(worksheet: ExcelProper.Worksheet, excel: Excel) {
    excel.data.forEach(item => {
        //kiểm tra dữ liệu null trong dữ liệu xuất excel ~ define về ''
        Object.keys(item).forEach(key => {
            if (!item[key])
                item[key] = '';
        })
        //thêm dữ liệu ~ set style
        let row = worksheet.addRow(item);
        row.eachCell((cell, colNum) => {
            cell.style = {
                font: { name: 'Times New Roman', size: 12 },
                alignment: {
                    wrapText: true,
                    vertical: 'middle',
                    horizontal: typeof cell.value == 'number' ? 'center' : 'left',
                }
            };

            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        })
    });
}

saveAsExcelFile(workbook: ExcelProper.Workbook, fileName: string) {
    workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: EXCEL_TYPE });
        FileSaver.saveAs(blob, fileName + EXCEL_EXTENSION);
    });
}

convertToExcelPosition(index: number) {
    return String.fromCodePoint(index + 65);
}
}

export interface Excel {
title: string;
subTitle?: string;
workSheet?: string;
headers: any[];
keys: string[];
widths?: number[];
data: any[];
groupHeaders?: any[];
groupMerge?: any[];
sheetName: string;
startMergeBody?: number;
endMergeBody?: number;
isNotSplitHeader?: boolean;
}

