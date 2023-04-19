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
  gameInterval: any;
  constructor() {
    this.arrayPills.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        el[i] = "";
      }
    });
    this.id = 0;
    this.gameInterval = 0;
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
    const ArrayWithColors = ["yellow", "blue", "brown"];
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
          this.arrayCell[y][x].elem.style.backgroundImage = "none";
          this.arrayCell[y][x].elem.innerHTML = "";
        } else {
          if (this.arrayPills[y][x].id == "V") {
            this.arrayCell[y][x].elem.style.backgroundImage =
              this.arrayPills[y][x].image;
          } else {
            this.arrayCell[y][x].elem.style.backgroundColor =
              this.arrayPills[y][x].color;
            this.arrayCell[y][x].elem.innerHTML = this.arrayPills[y][x].id;
          }
        }
      }
    }
  }
  drawTableWithPills() {
    let addPill = new Pill(this.arrayPills, this.id);
    this.id++;
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;

    this.gameInterval = setInterval(() => {
      this.clear();
      this.fallen();
      this.points();
      this.arrayCell[pill1.y][pill1.x].elem.style.backgroundColor = pill1.color;
      this.arrayCell[pill2.y][pill2.x].elem.style.backgroundColor = pill2.color;
      if (addPill.blocked === true) {
        clearInterval(this.gameInterval);
        this.arrayPills[pill1.y][pill1.x] = pill1;
        this.arrayPills[pill2.y][pill2.x] = pill2;
        this.beating();
        this.drawTableWithPills();
      }
      if (localStorage.getItem("points") == "300") {
        clearInterval(this.gameInterval);
        this.theEnd("StageComplete");
      }
      if (this.arrayPills[0][3] != "" || this.arrayPills[0][4] != "") {
        clearInterval(this.gameInterval);
        this.theEnd("GameOver");
      }
    }, 100);
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

    for (let i = 0; i < this.deletePills.length; i++) {
      this.arrayPills[this.deletePills[i].y][this.deletePills[i].x] = "";
    }
    this.deletePills = [];
  }

  points() {
    let Virus = [];
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x].id == "V") Virus.push(this.arrayPills[y][x]);
      }
    }
    let points = 300 - Virus.length * 100;
    const pointsDiv: any = document.getElementById("points");
    const numberOfViruses: any = document.getElementById("numberOfViruses");
    pointsDiv.style.backgroundImage =
      "url(./src/img/numbers/" + (3 - Virus.length) + ".png)";
    numberOfViruses.style.backgroundImage =
      "url(./src/img/numbers/" + Virus.length + ".png)";
    localStorage.setItem("points", points.toString());
  }

  fallen() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] != "" && this.arrayPills[y][x].id != "V") {
          if (this.arrayPills[y + 1][x] == "") {
            this.arrayPills[y + 1][x] = this.arrayPills[y][x];
            this.arrayPills[y + 1][x].y = y + 1;
            this.arrayPills[y][x] = "";
          }
        }
      }
    }
    this.beating();
  }
  theEnd(endData: string) {
    const endGame: any = document.getElementById("endGame");
    endGame.style.backgroundImage = "url('/src/img/" + endData + ".png')";
    if (endData === "GameOver") {
      const mario: any = document.getElementById("mario");
      mario.style.backgroundImage = "url('/src/img/GameOverMario.png')";
    }
  }
}
