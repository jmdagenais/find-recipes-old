export class StringUtils {
  /**
   * escape string to prevent html and javascript injection
   */
  static escapeString(input: string) {
    let output = input.replace(/</g, '&lt;');
    output = output.replace(/>/g, '&gt;');
    return output;
  }

  static convertToHTML(value: string) {
    let output = value.replace(/\[b\]/g, '<b>');
    output = output.replace(/\[\/b\]/g, '</b>');
    output = output.replace(/\[i\]/g, '<i>');
    output = output.replace(/\[\/i\]/g, '</i>');
    output = output.replace(/\[u\]/g, '<u>');
    output = output.replace(/\[\/u\]/g, '</u>');
    output = output.replace(/\n/g, '<br>');
    output = output.replace(/\r/g, '<br>');

    return output;
  }
}
