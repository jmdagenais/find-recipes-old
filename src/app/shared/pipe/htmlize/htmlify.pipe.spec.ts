import { HtmlifyPipe } from './htmlify.pipe';

describe('HtmlizePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlifyPipe();
    expect(pipe).toBeTruthy();
  });

  it('convert BBcode to html', () => {
    const pipe = new HtmlifyPipe();
    const htmlText = pipe.transform('[b]bold[/b] \n [i]italic[/i] \r [u]underline[/u]');

    expect(htmlText).toEqual('<b>bold</b> <br> <i>italic</i> <br> <u>underline</u>');
  });
});
