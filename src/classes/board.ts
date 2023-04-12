import { Pill } from "./Pill.js";
import { Virus } from "./virus";

interface BoardConfig {
  elem: HTMLDivElement;
  x: number;
  y: number;
}
export class Board {
  arrayCell: BoardConfig[][] = Array.from(Array(16), () => new Array(0));
  arrayPills: any[][] = Array.from(Array(16), () => new Array(8));
  deletePills: any[] = [];
  id: number;
  constructor() {
    this.arrayPills.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        el[i] = "";
      }
    });
    this.id = 0;
    this.createTable();
    this.addVirus();
    this.drawTableWithPills();
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
  addVirus() {
    const ArrayWithColors = ["#9F3632", "#3A5E52", "#314D65"];
    for (let i = 0; i < ArrayWithColors.length; i++) {
      let v = new Virus(this.arrayPills, ArrayWithColors[i]);
      this.arrayPills[v.y][v.x] = v;
    }
  }
  clear() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] == "") {
          this.arrayCell[y][x].elem.style.backgroundColor = "";
          this.arrayCell[y][x].elem.innerHTML = "";
        } else {
          this.arrayCell[y][x].elem.style.backgroundColor =
            this.arrayPills[y][x].color;
          this.arrayCell[y][x].elem.innerHTML = this.arrayPills[y][x].id;
        }
      }
    }
  }
  drawTableWithPills() {
    let addPill = new Pill(this.arrayPills, this.id);
    this.id++;
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;

    let fallen = setInterval(() => {
      this.clear();
      this.arrayCell[pill1.y][pill1.x].elem.style.backgroundColor = pill1.color;
      this.arrayCell[pill2.y][pill2.x].elem.style.backgroundColor = pill2.color;
      if (addPill.blocked === true) {
        clearInterval(fallen);
        this.arrayPills[pill1.y][pill1.x] = pill1;
        this.arrayPills[pill2.y][pill2.x] = pill2;
        this.beating();
        this.drawTableWithPills();
      }
    }, 50);
  }
  checkColorHorizontally(y: number, x0: number) {
    let array = [];
    let color = this.arrayPills[y][x0].color;
    for (let x = x0; x <= 7 && this.arrayPills[y][x].color == color; x++) {
      array.push(this.arrayPills[y][x]);
    }
    if (array.length >= 4) {
      array.forEach((elm) => {
        this.deletePills.push(elm);
      });
    }
  }
  checkColorVertically(y0: number, x: number) {
    let array = [];
    let color = this.arrayPills[y0][x].color;
    for (let y = y0; y <= 15 && this.arrayPills[y][x].color == color; y++) {
      array.push(this.arrayPills[y][x]);
    }
    if (array.length >= 4) {
      array.forEach((elm) => {
        this.deletePills.push(elm);
      });
    }
  }

  beating() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] != "") {
          this.checkColorHorizontally(y, x);
          this.checkColorVertically(y, x);
        }
      }
    }
    this.deletePills.forEach((elm) => {
      this.arrayPills[elm.y][elm.x] = "";
    });
    this.deletePills = [];
    this.fallen();
  }

  fallen() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        console.log("sprawdzam czy cos jest do upadania");
      }
    }
  }
}
