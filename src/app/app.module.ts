import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { SheetJSComponent } from './sheetjs.component'

import { LoadFileService } from './load-file.service'

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, SheetJSComponent],
  providers: [LoadFileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
