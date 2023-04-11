import { Pill } from "./Pill.js";

interface BoardConfig {
  elem: HTMLDivElement;
  x: number;
  y: number;
}
export class Board {
  arrayCell: BoardConfig[][] = Array.from(Array(16), () => new Array(0));
  arrayPills: any[][] = Array.from(Array(16), () => new Array(8));
  deletePills: any[] = [];
  constructor() {
    this.createTable();
    this.drawTableWithPills();
    this.arrayPills.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        el[i] = "";
      }
    });
  }
  createTable() {
    const board = document.getElementById("board");
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        this.arrayCell[y].push({ elem: cell, x: x, y: y });
        board?.appendChild(cell);
      }
    }
  }
  clear() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] == "") {
          this.arrayCell[y][x].elem.style.backgroundColor = "";
        } else {
          this.arrayCell[y][x].elem.style.backgroundColor =
            this.arrayPills[y][x].color;
        }
      }
    }
  }
  drawTableWithPills() {
    let addPill = new Pill(this.arrayPills);
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;

    let fallen = setInterval(() => {
      this.clear();
      this.arrayCell[pill1.y][pill1.x].elem.style.backgroundColor = pill1.color;
      this.arrayCell[pill2.y][pill2.x].elem.style.backgroundColor = pill2.color;
      this.beating();
      if (addPill.blocked === true) {
        clearInterval(fallen);
        this.arrayPills[pill1.y][pill1.x] = pill1;
        this.arrayPills[pill2.y][pill2.x] = pill2;
        this.drawTableWithPills();
      }
    }, 50);
  }
  checkColorHorizontally(y: number, dx: number, color: string) {
    let array = [];
    array.push(this.arrayPills[y][dx]);
    for (let x = dx; x < 7; x++) {
      if (
        this.arrayPills[y][x].color == color &&
        this.arrayPills[y][x + 1].color == color
      ) {
        array.push(this.arrayPills[y][x + 1]);
      } else {
        if (array.length >= 4) {
          array.forEach((elm) => {
            this.deletePills.push(elm);
          });
        }
      }
    }
  }
  checkColorVertically(dy: number, x: number, color: string) {
    let array = [];
    array.push(this.arrayPills[dy][x]);
    for (let y = dy; y < 15; y++) {
      if (
        this.arrayPills[y][x].color == color &&
        this.arrayPills[y + 1][x].color == color
      ) {
        array.push(this.arrayPills[y + 1][x]);
      } else {
        if (array.length >= 4) {
          array.forEach((elm) => {
            this.deletePills.push(elm);
          });
        }
      }
    }
  }

  beating() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] != "") {
          this.checkColorHorizontally(y, x, this.arrayPills[y][x].color);
          this.checkColorVertically(y, x, this.arrayPills[y][x].color);
        }
      }
    }
    this.deletePills.forEach((elm) => {
      this.arrayPills[elm.y][elm.x] = "";
    });
    this.deletePills = [];
  }
}
