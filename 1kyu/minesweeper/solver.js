import Minesweeper from './minesweeper.js';

const symbolsMap = Minesweeper.mapDefinitionToSymbol;

const mapCellValueToDisplayedValueCodewars = {
  [symbolsMap.ZERO_MINES_NEARBY]: 0,
  [symbolsMap.ONE_MINES_NEARBY]: 1,
  [symbolsMap.TWO_MINES_NEARBY]: 2,
  [symbolsMap.THREE_MINES_NEARBY]: 3,
  [symbolsMap.FOUR_MINES_NEARBY]: 4,
  [symbolsMap.FIVE_MINES_NEARBY]: 5,
  [symbolsMap.SIX_MINES_NEARBY]: 6,
  [symbolsMap.SEVEN_MINES_NEARBY]: 7,
  [symbolsMap.EIGHT_MINES_NEARBY]: 8,

  [symbolsMap.CELL_CLOSED]: '?',
  [symbolsMap.MINE]: 'x',
  [symbolsMap.FLAG]: 'x',
};
/**
 * "Mine Sweeper" {@link https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa/}
 *
 * @param { string } map
 * @param { number } mines
 * @param { string } solvedMap expected result (for tests)
 * @param { boolean } [isTest=false] is test? (for tests)
 * @return { string } solved area
 */
const solveMine = (map, mines, solvedMap, isTest = false) => {
  // TODO: работает для простых случаев, но не работает для групп связанных клеток
  // , нужно добавить их обработку

  // read:
  // https://quantum-p.livejournal.com/19616.html
  // https://massaioli.wordpress.com/2013/01/12/solving-minesweeper-with-matricies/

  const mapArr = map
    .split('\n')
    .map((line) =>
      line.split(' ').map((char) => (Number.isInteger(Number(char)) ? Number(char) : char))
    );
  const yMax = mapArr.length;
  const xMax = mapArr[0].length;
  console.log({ mapArr });
  console.log({ xMax, yMax, mines });

  let newGame = null;

  const solvedMapArr = (solvedMap || [])
    .split('\n')
    .map((line) =>
      line.split(' ').map((char) => (Number.isInteger(Number(char)) ? Number(char) : char))
    );

  if (isTest) {
    newGame = new Minesweeper(xMax, yMax, mines, solvedMapArr);
  } else {
    newGame = new Minesweeper(xMax, yMax, mines, global?.open);
  }

  // console.log(newGame.openFn(0,1))
  newGame.init(mapArr, solvedMapArr);
  // console.table(newGame.drawMesh('closed'));
  // newGame.closedField[0][0] = mapDefinitionToSymbol.ZERO_MINES_NEARBY;
  newGame.step();
  console.log(newGame.closedField);
  console.table(newGame.drawMesh('closed', true));
  // console.table(newGame.drawMesh('open', true));
  if (newGame.gameState !== 'win') {
    return '?';
  }
  return newGame.closedField
    .map((row) => row.map((cell) => `${mapCellValueToDisplayedValueCodewars[cell]}`).join(' '))
    .join(`\n`);
};

export default solveMine;

/**
1. Получите список квадратов, содержащих числа И, примыкающих хотя бы к одному квадрату, который не
был нажат или отмечен флажком.

2. Для каждого пронумерованного квадрата в списке присвойте этому квадрату уникальный номер столбца
матрицы. Это сделано для того, чтобы мы могли сопоставить наши столбцы Матрицы с квадратами Сапера.

3. Для каждого пронумерованного квадрата в списке создайте строку матрицы, которая представляет
соседние квадраты без щелчка и номер, которого они касаются. Не забудьте поставить нули во все
несмежные столбцы матрицы.

4. Гауссовское исключение матрицы.

5. Попытайтесь использовать стандартную матрицу сокращения и специальное правило, которое мы
разработали, чтобы получить частичное (или даже полное) решение текущей конфигурации Minesweeper.
Не забудьте брать матрицу снизу вверх, чтобы вы могли использовать частичные решения по ходу дела.

6. Используйте (возможно, частичное) решение, которое вы разработали, чтобы сгенерировать список
кликов, которые необходимо сделать: пометить известные мины и щелкнуть известные пустые квадраты.
Оставьте все остальное в покое и дождитесь дополнительной информации.

7. Продолжайте выполнять все предыдущие шаги в цикле до тех пор, пока вы либо не сможете делать
какие-либо ходы (это означает, что вы не сможете продвинуться дальше, не угадывая), либо пока игра
не будет завершена и выиграна.
*/
