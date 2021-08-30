/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomIndex = (max) => getRandomInt(0, max - 1);
const getTimeFormat = () =>
  `${new Date().toLocaleTimeString('it-US')},${new Date().getMilliseconds()}`;

class Minesweeper {
  constructor(x = 9, y = 9, mines = 10) {
    if (mines > x * y) {
      throw new Error('ERROR: mines more than cell');
    }
    this.x = x;
    this.y = y;
    this.mines = mines;
    this.isStarted = false;
  }

  _initMines() {
    let tail = this.mines;
    while (tail !== 0) {
      const mineIndex = getRandomIndex(this.x * this.y);
      const mineY = Math.floor(mineIndex / this.x);
      const mineX = mineIndex % this.x;

      if (this.field[mineY][mineX] !== 9) {
        this.field[mineY][mineX] = 9;
        tail -= 1;
      }
    }
    return true;
  }

  _incMineCounter(mineX, mineY) {
    this._area8(mineX, mineY).forEach(({ x, y }) => {
      const cell = this.field[y][x];
      if (cell !== 9) {
        this.field[y][x] = cell + 1;
      }
    });
  }

  _calcMines() {
    this.field.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === 9) {
          this._incMineCounter(x, y);
        }
      })
    );
  }

  _initClosedField() {
    this.closedField = this.field.map((row) => row.map(() => '?'));
    return this;
  }

  init() {
    console.time('init');
    // create field ⚪ ⚫ ⬛ ⬜ 🔲 🔳 💣
    this.field = Array.from({ length: this.y }, () => new Array(this.x).fill(0));

    // fill the field with mines
    this._initMines();

    // calculate and fill min counters
    this._calcMines();

    // init closed field
    this._initClosedField();

    console.timeEnd('init');
    return this;
  }

  drawMesh(fieldType = 'open', isTable = false) {
    const field = fieldType === 'closed' ? this.closedField : this.field;

    const statesSymbolTable = {
      '0': '⬛',
      '9': '💣',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '?': '🔳',
      'F': '🚩',
    };
    // console.log(getTimeFormat());

    if (isTable) {
      return field.map((row) => row.map((cell) => `${statesSymbolTable[cell]}`));
    }

    return field
      .map((row) => row.map((cell) => `${statesSymbolTable[cell]}`).join('	'))
      .join(`\n`)
      .concat('\n');
  }

  openCell(x, y) {
    this.closedField[y][x] = this.field[y][x];
    // console.log(this.drawMesh('closed'));

    if (this.field[y][x] === 0) {
      this._zeroOpen([{ x, y }]);
      // console.log(this.drawMesh('closed'));
    }

    return true;
  }

  _zeroOpen(zeroCells) {
    while (zeroCells.length !== 0) {
      const { x: zeroX, y: zeroY } = zeroCells.shift();
      this.closedField[zeroY][zeroX] = this.field[zeroY][zeroX];

      const area8Closed = this._area8Closed(zeroX, zeroY);
      for (const { x, y } of area8Closed) {
        if (this.field[y][x] === 0) {
          zeroCells.push({ x, y });
        }

        this.closedField[y][x] = this.field[y][x];
      }
    }

    return true;
  }

  _isRightOpened() {
    return (
      this.closedField.map((row) => row.map((cell) => (cell === 'F' ? 9 : cell))).toString() ===
      this.field.toString()
    );
  }

  _isAllOpened() {
    for (let y = 0; y < this.y; y += 1) {
      for (let x = 0; x < this.x; x += 1) {
        if (this.closedField[y][x] === '?') {
          return false;
        }
      }
    }
    console.log('Opened! GAME OVER\n');
    if (this._isRightOpened()) {
      console.log('🏆correctly! You win!🏆');
    }
    return true;
  }

  _isExplosion(x, y) {
    if (this.field[y][x] !== 9) {
      return false;
    }

    // console.log('💣Explosion💣! GAME OVER');
    return true;
  }

  step() {
    if (!this.isStarted) {
      this.isStarted = true;
      console.time('start open');
    }
    // console.log(`${getTimeFormat()}  START STEP`);
    if (this._isAllOpened()) {
      console.log(`${getTimeFormat()}  ALL OPEN`);
      console.timeEnd('start open');
      return false;
    }
    const y = getRandomIndex(this.y);
    const x = getRandomIndex(this.x);

    if (this.closedField[y][x] !== '?') {
      // console.log(this.drawMesh('closed'));
      return this.step();
    }

    this.openCell(x, y);

    if (this._isExplosion(x, y)) {
      console.log(`${getTimeFormat()}  EXPLOSION`);
      console.timeEnd('start open');
      return;
    }

    while (this.openSafeCell()) {
      //
    }

    while (this.markMine()) {
      while (this.openSafeCell()) {
        //
      }
    }
    // console.log(`${getTimeFormat()}  END STEP`);
    // window.updateField();
    return this.step();
  }

  _area8(cellX, cellY) {
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

  _area8Closed(cellX, cellY, area = this._area8(cellX, cellY)) {
    return area.filter(({ x, y }) => this.closedField[y][x] === '?');
  }

  _area8Flagged(cellX, cellY, area = this._area8(cellX, cellY)) {
    return area.filter(({ x, y }) => this.closedField[y][x] === 'F');
  }

  _findSafeToOpenCell() {
    for (let y = 0; y < this.y; y += 1) {
      for (let x = 0; x < this.x; x += 1) {
        const area = this._area8Flagged(x, y);
        const areaFlagged = this._area8Flagged(x, y, area);
        const areaClosed = this._area8Closed(x, y);
        const cell = this.closedField[y][x];

        if (Number.isInteger(cell) && areaClosed.length && cell === areaFlagged.length) {
          const [{ x: safeX, y: safeY }] = areaClosed;
          return { safeX, safeY };
        }
      }
    }
    return false;
  }

  _findMineWithoutFlag() {
    for (let y = 0; y < this.y; y += 1) {
      for (let x = 0; x < this.x; x += 1) {
        const area = this._area8Flagged(x, y);
        const areaFlagged = this._area8Flagged(x, y, area);
        const areaClosed = this._area8Closed(x, y);
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
    const { mineX, mineY } = cellForFlag;
    this.closedField[mineY][mineX] = 'F';

    // console.log('FLAG THE MINE 🚩', mineX, mineY);
    // console.log(this.drawMesh('closed'));
    return this;
  }

  openSafeCell() {
    const cell = this._findSafeToOpenCell();
    if (cell === false) {
      return false;
    }
    const { safeX, safeY } = cell;
    // console.log('OPEN SAFE CELL', safeX, safeY);
    this.openCell(safeX, safeY);

    return this;
  }
}

const loop = (x, y, mines) => {
  const newGame = new Minesweeper(x, y, mines);
  newGame.init();
  // console.table(newGame.drawMesh('closed'));

  newGame.step();

  console.table(newGame.drawMesh('closed'));
  // console.table(newGame.drawMesh());
};

loop(20, 20, 45);

/*
1. Если есть ЦИФРЫ, вокруг которых за вычетом количества помеченных МИН получается 0,
(количество ФЛАЖКОВ в области равно ЦИФРЕ)
 но есть не открытые клетки - там нет мин - ОТКРЫТЬ эти клетки
2. Если есть ЦИФРЫ, вокруг которых за вычетом количества помеченных МИН
получается 1 - там МИНА - пометить ёё ФЛАЖКОМ  (в цикле)
*/
