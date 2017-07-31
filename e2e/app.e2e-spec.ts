import { AngularDataImportEditSavePage } from './app.po';

describe('angular-data-import-edit-save App', () => {
  let page: AngularDataImportEditSavePage;

  beforeEach(() => {
    page = new AngularDataImportEditSavePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
