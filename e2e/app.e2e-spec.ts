import { NgOthelloPage } from './app.po';

describe('ng-othello App', () => {
  let page: NgOthelloPage;

  beforeEach(() => {
    page = new NgOthelloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
