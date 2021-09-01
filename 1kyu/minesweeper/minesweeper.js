/* eslint-disable no-underscore-dangle */
const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomIndex = (max) => getRandomInt(0, max - 1);
const mapDefinitionToSymbol = {
  ZERO_MINES_NEARBY: 0,
  ONE_MINES_NEARBY: 1,
  TWO_MINES_NEARBY: 2,
  THREE_MINES_NEARBY: 3,
  FOUR_MINES_NEARBY: 4,
  FIVE_MINES_NEARBY: 5,
  SIX_MINES_NEARBY: 6,
  SEVEN_MINES_NEARBY: 7,
  EIGHT_MINES_NEARBY: 8,

  CELL_CLOSED: '?',
  MINE: 'x',
  MINE_EXPLOSION: 'ME',
  FLAG: 'F',
  FLAG_IN_WRONG_POSITION: 'FW',
};

const mapCellValueToDisplayedValue = {
  [mapDefinitionToSymbol.ZERO_MINES_NEARBY]: '0', // '⬛',
  [mapDefinitionToSymbol.ONE_MINES_NEARBY]: '1',
  [mapDefinitionToSymbol.TWO_MINES_NEARBY]: '2',
  [mapDefinitionToSymbol.THREE_MINES_NEARBY]: '3',
  [mapDefinitionToSymbol.FOUR_MINES_NEARBY]: '4',
  [mapDefinitionToSymbol.FIVE_MINES_NEARBY]: '5',
  [mapDefinitionToSymbol.SIX_MINES_NEARBY]: '6',
  [mapDefinitionToSymbol.SEVEN_MINES_NEARBY]: '7',
  [mapDefinitionToSymbol.EIGHT_MINES_NEARBY]: '8',

  [mapDefinitionToSymbol.CELL_CLOSED]: '🔳',
  [mapDefinitionToSymbol.MINE]: '💣',
  [mapDefinitionToSymbol.MINE_EXPLOSION]: '💥',
  [mapDefinitionToSymbol.FLAG]: '🚩',
  [mapDefinitionToSymbol.FLAG_IN_WRONG_POSITION]: '🏁',
};

class Minesweeper {
  static mapDefinitionToSymbol = mapDefinitionToSymbol;

  static mapCellValueToDisplayedValue = mapCellValueToDisplayedValue;

  static _calcInitCellEqualValue(field, queryValue) {
    return field
      .reduce((acc, val) => acc.concat(val), [])
      .reduce((sum, cell) => (cell === queryValue ? sum + 1 : sum), 0);
  }

  constructor(x = 9, y = 9, mines = 10, openFn) {
    if (mines > x * y) {
      throw new Error('ERROR: mines more than cell');
    }

    this.x = x;
    this.y = y;
    this.mines = mines;

    this.field = [];
    this.closedField = [];

    this.leftFlags = mines;
    this.leftClosed = x * y;

    this.gameState = 'non-started';

    const openDefault = (_y, _x) => this.field[_y][_x];

    if (Array.isArray(openFn)) {
      this.solvedField = openFn;
    }
    this.openFn = (...args) => {
      const cellValue = (typeof openFn === 'function' ? openFn : openDefault)(...args);
      console.log('openFn', args, { cellValue });
      return Number.isInteger(Number(cellValue)) ? Number(cellValue) : cellValue;
    };
  }

  _initMines() {
    let tailMines = this.mines;
    while (tailMines !== 0) {
      const x = getRandomIndex(this.x);
      const y = getRandomIndex(this.y);

      if (this.field[y][x] !== mapDefinitionToSymbol.MINE) {
        this.field[y][x] = mapDefinitionToSymbol.MINE;
        tailMines -= 1;
      }
    }
  }

  _getArea8(cellX, cellY) {
    const area8 = [];
    for (let y = cellY - 1; y <= cellY + 1; y += 1) {
      for (let x = cellX - 1; x <= cellX + 1; x += 1) {
        if (y >= 0 && y < this.y && x >= 0 && x < this.x && !(cellX === x && cellY === y)) {
          area8.push({ x, y });
        }
      }
    }
    return area8;
  }

  _getArea8Closed(cellX, cellY, area8 = this._getArea8(cellX, cellY)) {
    return area8.filter(({ x, y }) => this.closedField[y][x] === mapDefinitionToSymbol.CELL_CLOSED);
  }

  _getArea8Flagged(cellX, cellY, area8 = this._getArea8(cellX, cellY)) {
    return area8.filter(({ x, y }) => this.closedField[y][x] === mapDefinitionToSymbol.FLAG);
  }

  _increaseMineCounterInArea8(mineX, mineY) {
    this._getArea8(mineX, mineY).forEach(({ x, y }) => {
      const cellValue = this.field[y][x];
      if (cellValue !== mapDefinitionToSymbol.MINE) {
        this.field[y][x] = cellValue + 1;
      }
    });
  }

  _calculateMinesAndSetCounterValues() {
    this.field.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === mapDefinitionToSymbol.MINE) {
          this._increaseMineCounterInArea8(x, y);
        }
      })
    );
  }

  _decreaseMineCounterInArea8(mineX, mineY) {
    this._getArea8(mineX, mineY).forEach(({ x, y }) => {
      const cellValue = this.tempField[y][x];

      if (Number.isInteger(cellValue)) {
        this.tempField[y][x] = cellValue - 1;
      }
    });
  }

  _decalculateMinesAndSetCounterValues() {
    this.tempField.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === mapDefinitionToSymbol.MINE || cell === mapDefinitionToSymbol.FLAG) {
          this._decreaseMineCounterInArea8(x, y);
        }
      })
    );
    this.tempField.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === mapDefinitionToSymbol.MINE || cell === mapDefinitionToSymbol.FLAG) {
          this.tempField[y][x] = 0;
        }
      })
    );
  }

  _initFieldAndFillValue(value) {
    return Array.from({ length: this.y }, () => new Array(this.x).fill(value));
  }

  init(field, solvedField) {
    if (!field) {
      this.closedField = this._initFieldAndFillValue(mapDefinitionToSymbol.CELL_CLOSED);
      this.field = this._initFieldAndFillValue(mapDefinitionToSymbol.ZERO_MINES_NEARBY);
      this._initMines();
      this._calculateMinesAndSetCounterValues();
    } else {
      this.closedField = field;

      if (solvedField) {
        this.field = this.solvedField;
      } else {
        this.field = this.closedField;
      }

      this.leftClosed = Minesweeper._calcInitCellEqualValue(
        field,
        mapDefinitionToSymbol.CELL_CLOSED
      );
      this.leftFlags -= Minesweeper._calcInitCellEqualValue(field, mapDefinitionToSymbol.MINE);
      this.gameMode = 'network';
    }

    this.gameState = 'playing';
    return this;
  }

  _markAllWrongFlag() {
    this.closedField.forEach((row, y) =>
      row.forEach((closedCellValue, x) => {
        if (
          closedCellValue === mapDefinitionToSymbol.FLAG &&
          this.field[y][x] !== mapDefinitionToSymbol.MINE
        ) {
          this.closedField[y][x] = mapDefinitionToSymbol.FLAG_IN_WRONG_POSITION;
        }
      })
    );
  }

  _markAllTailClosedFlag() {
    this.closedField.forEach((row, y) =>
      row.forEach((closedCellValue, x) => {
        if (
          closedCellValue === mapDefinitionToSymbol.CELL_CLOSED &&
          (this.gameMode === 'network' || this.field[y][x] === mapDefinitionToSymbol.MINE)
        ) {
          this.closedField[y][x] = mapDefinitionToSymbol.FLAG;
        }
      })
    );
  }

  _showAllClosedMine() {
    this.closedField.forEach((row, y) =>
      row.forEach((closedCellValue, x) => {
        if (
          closedCellValue === mapDefinitionToSymbol.CELL_CLOSED &&
          (this.gameMode === 'network' || this.field[y][x] === mapDefinitionToSymbol.MINE)
        ) {
          this.closedField[y][x] = mapDefinitionToSymbol.MINE;
        }
      })
    );
  }

  _exitLoseExplosion(x, y) {
    console.log('💣Explosion💣! GAME OVER');
    this.closedField[y][x] = mapDefinitionToSymbol.MINE_EXPLOSION;
    this.gameState = 'lose';
    this._markAllWrongFlag();
    this._showAllClosedMine();
  }

  _exitWinAllOpened() {
    this.gameState = 'win';
    // this._showAllClosedMine();
    this._markAllTailClosedFlag();

    console.log('All opened!  You win!🏆');
  }

  _openCell(x, y) {
    this.leftClosed -= 1;
    // this.closedField[y][x] = this.field[y][x];
    this.closedField[y][x] = this.openFn(y, x);
  }

  stepToOpenCell(startOpenX, startOpenY) {
    const timeStart = Date.now();
    const opened = new Set();
    const queuePositions = [{ x: startOpenX, y: startOpenY }];

    while (queuePositions.length > 0 && this.gameState === 'playing') {
      const position = queuePositions.shift();
      if (!position) {
        continue;
      }
      const { x, y } = position;
      opened.add(`${x},${y}`);

      if (this.closedField[y][x] !== mapDefinitionToSymbol.CELL_CLOSED) {
        continue;
      }

      this._openCell(x, y);

      if (this.field[y][x] === mapDefinitionToSymbol.MINE) {
        this._exitLoseExplosion(x, y);
        break;
      }
      // остались закрытыми только мины
      console.log({ leftClosed: this.leftClosed, leftFlags: this.leftFlags });
      if (this.leftClosed === this.leftFlags) {
        this._exitWinAllOpened();
        break;
      }

      if (this.field[y][x] === mapDefinitionToSymbol.ZERO_MINES_NEARBY) {
        const areaNoOpened = this._getArea8Closed(x, y).filter(({ x: neighborX, y: neighborY }) => {
          const isHasNot = !opened.has(`${neighborX},${neighborY}`);
          if (isHasNot) {
            opened.add(`${neighborX},${neighborY}`);
          }
          return isHasNot;
        });
        queuePositions.push(...areaNoOpened);
      }
    }

    console.log(
      'stepToOpenCell ( x',
      startOpenX,
      ', y',
      startOpenY,
      ') end: ',
      Date.now() - timeStart,
      'ms'
    );
  }

  step(isRandom = false) {
    // console.log(`${getTimeFormat()}  START STEP`);

    if (isRandom) {
      const y = getRandomIndex(this.y);
      const x = getRandomIndex(this.x);
      console.log(this.closedField[y][x]);

      if (this.closedField[y][x] !== mapDefinitionToSymbol.CELL_CLOSED) {
        // console.log(this.drawMesh('closed'));
        if (this.gameState === 'playing') {
          return this.step(true);
        }
      }

      this.stepToOpenCell(x, y);

      if (this.gameState === 'playing') {
        while (this.markMine()) {
          while (this.openSafeCell()) {
            //
          }
        }
      }

      if (this.gameState === 'playing') {
        return this.step(true);
      }
      return false;
    }

    if (this.gameState === 'playing') {
      while (this.openSafeCell()) {
        //
      }
    }
    if (this.gameState === 'playing') {
      while (this.markMine()) {
        while (this.openSafeCell()) {
          //
        }
      }
    }
    if (this.gameState === 'playing') {
      this.tempField = JSON.parse(JSON.stringify(this.closedField));
      this._decalculateMinesAndSetCounterValues();
      console.log(this.tempField);
    }
    return false;
  }

  _setFlag(x, y) {
    this.leftFlags -= 1;
    this.leftClosed -= 1;
    this.closedField[y][x] = mapDefinitionToSymbol.FLAG;
    console.log('FLAG THE MINE 🚩', x, y);
  }

  _removeFlag(x, y) {
    this.leftFlags += 1;
    this.leftClosed += 1;
    this.closedField[y][x] = mapDefinitionToSymbol.CELL_CLOSED;
  }

  _findSafeToOpenCell() {
    for (let y = 0; y < this.y; y += 1) {
      for (let x = 0; x < this.x; x += 1) {
        const area = this._getArea8Flagged(x, y);
        const areaFlagged = this._getArea8Flagged(x, y, area);
        const areaClosed = this._getArea8Closed(x, y);
        const cell = this.closedField[y][x];

        if (Number.isInteger(cell) && areaClosed.length && cell === areaFlagged.length) {
          const [{ x: safeX, y: safeY }] = areaClosed;
          return { safeX, safeY };
        }
      }
    }
    return false;
  }

  openSafeCell() {
    const cell = this._findSafeToOpenCell();
    if (cell === false) {
      return false;
    }
    const { safeX, safeY } = cell;
    // console.log('OPEN SAFE CELL', safeX, safeY);
    this.stepToOpenCell(safeX, safeY);

    return true;
  }

  _findMineWithoutFlag() {
    for (let y = 0; y < this.y; y += 1) {
      for (let x = 0; x < this.x; x += 1) {
        const area = this._getArea8Flagged(x, y);
        const areaFlagged = this._getArea8Flagged(x, y, area);
        const areaClosed = this._getArea8Closed(x, y);
        const cell = this.closedField[y][x];

        if (
          Number.isInteger(cell) &&
          areaClosed.length &&
          cell === areaClosed.length + areaFlagged.length
        ) {
          const [{ x: mineX, y: mineY }] = areaClosed;
          return { mineX, mineY };
        }
      }
    }
    return false;
  }

  markMine() {
    const cellForFlag = this._findMineWithoutFlag();
    if (cellForFlag === false) {
      return false;
    }

    this._setFlag(cellForFlag.mineX, cellForFlag.mineY);
    return true;
  }

  getNearestNotZeroCell(currentX, currentY) {
    if (
      !this.closedField[currentY] ||
      this.closedField[currentY][currentX] !== mapDefinitionToSymbol.ZERO_MINES_NEARBY
    ) {
      return null;
    }

    const notZeroCellsWithDistance = [];
    const getDistance = (x, y) => Math.sqrt((x - currentX) ** 2 + (y - currentY) ** 2);

    this.closedField.forEach((row, y) =>
      row.forEach((cellValue, x) => {
        if (cellValue !== mapDefinitionToSymbol.ZERO_MINES_NEARBY) {
          notZeroCellsWithDistance.push({ x, y, distance: getDistance(x, y) });
        }
      })
    );
    if (notZeroCellsWithDistance.length === 0) {
      return null;
    }

    const [nearestCell] = notZeroCellsWithDistance.sort((a, b) => a.distance - b.distance);
    return nearestCell;
  }

  drawMesh(fieldType = 'open', isTable = false) {
    const field = fieldType === 'closed' ? this.closedField : this.field;

    if (isTable) {
      return field.map((row) => row.map((cell) => `${mapCellValueToDisplayedValue[cell]}`));
    }

    return field
      .map((row) => row.map((cell) => `${mapCellValueToDisplayedValue[cell]}`).join('	'))
      .join(`\n`)
      .concat('\n');
  }
}

export default Minesweeper;

// const loop = (x, y, mines) => {
//   console.time('init');
//   const newGame = new Minesweeper(x, y, mines);
//   newGame.init();
//   console.timeEnd('init');
//   // console.table(newGame.drawMesh('closed'));

//   console.time('Played');
//   newGame.step(true);
//   console.timeEnd('Played');

//   // console.log(newGame.closedField);
//   // console.log(newGame.field);
//   console.table(newGame.drawMesh('closed', true));
//   // console.table(newGame.drawMesh('open', true));
// };
// // loop(4, 4, 2)
