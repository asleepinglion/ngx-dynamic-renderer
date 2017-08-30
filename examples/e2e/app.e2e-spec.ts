import { ExamplesPage } from './app.po';

describe('examples App', () => {
  let page: ExamplesPage;

  beforeEach(() => {
    page = new ExamplesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
