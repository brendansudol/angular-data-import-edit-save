import { Component } from '@angular/core'
import { saveAs } from 'file-saver'
import * as XLS from 'xlsx'

import { LoadFileService } from './load-file.service'
import { s2ab } from './util'

type AOA = Array<Array<any>>
const { aoa_to_sheet, book_append_sheet, book_new, sheet_to_json } = XLS.utils

@Component({
  selector: 'sheetjs',
  templateUrl: './sheetjs.component.html',
})
export class SheetJSComponent {
  data: AOA = []
  wopts: XLS.WritingOptions = { bookType: 'xlsx', type: 'binary' }
  fileName: string = 'foobar.xls'

  constructor(private loader: LoadFileService) {}

  onFileChange(e) {
    const files = e.target.files

    if (files.length !== 1) {
      console.log('Cannot upload multiple files on the entry')
      return
    }

    this.loader.load(files[0]).then(data => this.processFile(data))
  }

  processFile(bstr) {
    // read workbook
    const wb = XLS.read(bstr, { type: 'binary' })

    // grab first sheet
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]

    // save data
    const data = <AOA>sheet_to_json(ws, { header: 1 })
    console.log('spreadsheet data: ', data)
    this.data = data
  }

  export() {
    // generate worksheet
    const ws = aoa_to_sheet(this.data)

    // generate workbook and add the worksheet
    const wb = book_new()
    book_append_sheet(wb, ws, 'Sheet1')

    // save file to machine
    const wbout = XLS.write(wb, this.wopts)
    saveAs(new Blob([s2ab(wbout)]), this.fileName)
  }
}
