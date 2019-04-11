import {StringUtils} from './StringUtils';

describe('Test StringUtils', () => {

  it('should escape string correctly', () => {
    const output = StringUtils.escapeString('this is <b>bold</b>');

    expect(output).toEqual('this is &lt;b&gt;bold&lt;/b&gt;');
  });


});
