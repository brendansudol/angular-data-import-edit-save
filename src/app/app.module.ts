import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { SheetJSComponent } from './sheetjs.component'

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, SheetJSComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
