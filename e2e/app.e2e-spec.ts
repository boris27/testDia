import { TestDiaPage } from './app.po';

describe('test-dia App', () => {
  let page: TestDiaPage;

  beforeEach(() => {
    page = new TestDiaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
