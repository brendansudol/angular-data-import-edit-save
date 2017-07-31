import { browser, by, element } from 'protractor';

export class AngularDataImportEditSavePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
