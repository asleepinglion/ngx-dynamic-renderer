import { CounterPage } from './app.po';

describe('counter App', () => {
  let page: CounterPage;

  beforeEach(() => {
    page = new CounterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
