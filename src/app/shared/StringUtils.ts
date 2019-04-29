export class StringUtils {
  /**
   * escape string to prevent html and javascript injection
   */
  static escapeString(input: string) {
    let output = input.replace(/</g, '&lt;');
    output = output.replace(/>/g, '&gt;');
    return output;
  }

  static removeHtmlEntities(input: string) {
    if (input) {
      return input.replace(/&#(\d+);/g, function(match, match2) {return String.fromCharCode(+match2); });
    }
  }
}
