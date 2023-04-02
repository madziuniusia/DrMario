import { Pill } from "./Pill.js";

interface BoardConfig {
  elem: HTMLDivElement;
  x: number;
  y: number;
}
export class Board {
  arrayCell: BoardConfig[][] = Array.from(Array(16), () => new Array(0));
  arrayCellColor: string[][] = Array.from(Array(16), () => new Array(8));
  arrayPills: any[] = [];
  constructor() {
    this.createTable();
    this.arrayPills = [];
    this.drawTableWithPills();
    this.arrayCellColor.forEach((el) => {
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
        this.arrayCell[y][x].elem.style.backgroundColor =
          this.arrayCellColor[y][x];
      }
    }
  }
  drawTableWithPills() {
    let addPill = new Pill(this.arrayCellColor);
    this.arrayPills.push(addPill);
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;

    let fallen = setInterval(() => {
      this.clear();
      this.arrayCell[pill1.y][pill1.x].elem.style.backgroundColor = pill1.color;
      this.arrayCell[pill2.y][pill2.x].elem.style.backgroundColor = pill2.color;
      if (addPill.blocked === true) {
        clearInterval(fallen);
        this.arrayCellColor[pill1.y][pill1.x] = pill1.color;
        this.arrayCellColor[pill2.y][pill2.x] = pill2.color;
        this.drawTableWithPills();
      }
    }, 100);
  }
}
