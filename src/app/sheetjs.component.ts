import { Component } from '@angular/core'
import { saveAs } from 'file-saver'
import * as XLS from 'xlsx'

type AOA = Array<Array<any>>

const { aoa_to_sheet, book_append_sheet, book_new, sheet_to_json } = XLS.utils

const s2ab = s => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff
  }
  return buf
}

@Component({
  selector: 'sheetjs',
  templateUrl: './sheetjs.component.html',
})
export class SheetJSComponent {
  data: AOA = [['foo', 'bar'], [1, 2], [3, 4]]
  wopts: XLS.WritingOptions = { bookType: 'xlsx', type: 'binary' }
  fileName: string = 'foobar.xls'

  onFileChange(e) {
    const self = this

    /* wire up file reader */
    const files = e.target.files

    if (files.length !== 1) {
      console.log('Cannot upload multiple files on the entry')
      return
    }

    const reader = new FileReader()
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr = e.target.result
      const wb = XLS.read(bstr, { type: 'binary' })

      /* grab first sheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]

      /* save data */
      const data = <AOA>sheet_to_json(ws, { header: 1 })
      console.log(data)
      self.data = data
    }
    reader.readAsBinaryString(files[0])
  }

  export() {
    /* generate worksheet */
    const ws = aoa_to_sheet(this.data)

    /* generate workbook and add the worksheet */
    const wb = book_new()
    book_append_sheet(wb, ws, 'Sheet1')

    /* save file to machine */
    const wbout = XLS.write(wb, this.wopts)
    saveAs(new Blob([s2ab(wbout)]), this.fileName)
  }
}
