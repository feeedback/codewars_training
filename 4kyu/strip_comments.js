/**
 * "Strip Comments" {@link https://www.codewars.com/kata/51c8e37cee245da6b40000bd}
 *
 * @param { String } input
 * @param { [String] } markers
 * @return { String } strip and trim
 */
function solution(input, markers) {
  const regex = new RegExp(`\\s*[${markers.join('')}].*`, 'g');
  return input.replace(regex, '');
}

export default solution;
