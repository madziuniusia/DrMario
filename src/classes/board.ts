/**
 * this class has all the implementations
 * and it mainly concerns the generation of the board
 * @module
 *  */
import { Pill } from "./Pill.js";
import { Virus } from "./virus";
import { throwPill } from "./throwPill";

/** @ignore */
interface BoardConfig {
  elem: HTMLDivElement;
  x: number;
  y: number;
}

export class Board {
  /** @param arrayCell array with all informacion about cells */
  arrayCell: BoardConfig[][] = Array.from(Array(16), () => new Array(0));
  /** @param arrayPill array with all informacion about pills */
  arrayPills: any[][] = Array.from(Array(16), () => new Array(8));
  /** @param deletePills this array helps with deleting items */
  deletePills: any[] = [];
  /** @param id unique id */
  id: number = 0;
  /** @param gameInterval game interval */
  gameInterval: any;
  deletePillsImg: any[] = [];
  /** @ignore */
  throwPill: any;

  constructor() {
    this.arrayPills.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        el[i] = "";
      }
    });
    this.createTable();
    this.addVirus();
    this.drawTableWithPills();
  }
  /** @Returns This function create board.*/
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
  /** @Returns This function create virus on board.*/

  addVirus() {
    const ArrayWithColors = ["yellow", "blue", "brown"];
    for (let i = 0; i < ArrayWithColors.length; i++) {
      let v = new Virus(this.arrayPills, ArrayWithColors[i]);
      this.arrayPills[v.y][v.x] = v;
    }
  }
  /** @Returns function responsible for deleting everything and drawing it on the page again.*/
  clear() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] == "") {
          this.arrayCell[y][x].elem.style.backgroundColor = "";
          this.arrayCell[y][x].elem.style.backgroundImage = "none";
          this.arrayCell[y][x].elem.innerHTML = "";
        } else {
          this.arrayCell[y][x].elem.style.backgroundImage = this.arrayPills[y][x].image;
        }
      }
    }
  }
  /** @Returns function responsible for calling a new tablet when the previous one drops.*/
  drawTableWithPills() {
    let addPill = new Pill(this.arrayPills, this.id);
    this.id++;
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;
    let addThrow = new throwPill(pill1.color, pill2.color);

    this.gameInterval = setInterval(() => {
      if (addThrow.blocked === false) {
        addPill.interval(400);
        addPill.movement();
      }
      addThrow.blocked = true;
      if (pill1.y >= 0) {
        this.fallen();
        this.clear();
        this.points();

        this.arrayCell[pill1.y][pill1.x].elem.style.backgroundImage = pill1.image;
        this.arrayCell[pill2.y][pill2.x].elem.style.backgroundImage = pill2.image;

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
      }
    }, 10);
  }
  /**
   * @param y initial number
   *  @param x0 initial number
   * @Returns function checks if there is something to beating horizontally.
   * */
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
  /**
   * @param y0 initial number
   * @param x initial number
   * @Returns function checks if there is something to beating Vertically.
   * */
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
  /** @Returns function checks if there is something to beating.*/
  beating() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] != "") {
          this.checkColorHorizontally(y, x);
          this.checkColorVertically(y, x);
        }
      }
    }
    this.deletePillsImg = this.deletePills;

    for (let i = 0; i < this.deletePills.length; i++) {
      this.arrayPills[this.deletePills[i].y][this.deletePills[i].x] = "";
    }
    this.deletePills = [];
    this.beatingImgUrl();
  }
  /** @Returns This function draw beating pill */
  beatingImgUrl() {
    this.deletePillsImg.forEach((elm) => {
      this.arrayCell[elm.y][elm.x].elem.style.backgroundImage = "url(./src/img/" + elm.color + "O.png)";
    });
  }
  /** @Returns points counting function*/
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
    pointsDiv.style.backgroundImage = "url(./src/img/numbers/" + (3 - Virus.length) + ".png)";
    numberOfViruses.style.backgroundImage = "url(./src/img/numbers/" + Virus.length + ".png)";
    localStorage.setItem("points", points.toString());
  }
  /** @Returns function that checks whether the pill should fall */
  fallen() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.arrayPills[y][x] != "" && this.arrayPills[y][x].id != "V") {
          if (this.arrayPills[y + 1][x] == "") {
            let found = [];
            const id = this.arrayPills[y][x].id;
            for (let i = 0; i < 16; i++) {
              for (let j = 0; j < 8; j++) {
                if (this.arrayPills[i][j].id == id) found.push(this.arrayPills[i][j]);
              }
            }
            if (found.length != 2) {
              this.arrayPills[y + 1][x] = this.arrayPills[y][x];
              this.arrayPills[y + 1][x].y = y + 1;
              this.arrayPills[y][x] = "";
            } else {
              let f1x = found[1].x,
                f1y = found[1].y,
                f0x = found[0].x,
                f0y = found[0].y;
              if (f0y === f1y && this.arrayPills[f1y + 1][f1x] == "" && this.arrayPills[f0y + 1][f0x] == "") {
                this.arrayPills[f1y + 1][f1x] = found[1];
                this.arrayPills[f0y + 1][f0x] = found[0];
                this.arrayPills[f1y + 1][f1x].y = y + 1;
                this.arrayPills[f0y + 1][f0x].y = y + 1;
                this.arrayPills[f1y][f1x] = "";
                this.arrayPills[f0y][f0x] = "";
              } else if (f0x === f1x && (this.arrayPills[f1y + 1][f1x] == "" || this.arrayPills[f0y + 1][f0x] == "")) {
                if (f1y > f0y) {
                  this.arrayPills[f1y][f1x].y = f1y + 1;
                  this.arrayPills[f0y][f0x].y = f0y + 1;
                  this.arrayPills[f1y + 1][f1x] = this.arrayPills[f1y][f1x];
                  this.arrayPills[f0y + 1][f0x] = this.arrayPills[f0y][f0x];
                  this.arrayPills[f0y][f0x] = "";
                } else {
                  this.arrayPills[f0y][f0x].y = f0y + 1;
                  this.arrayPills[f1y][f1x].y = f1y + 1;
                  this.arrayPills[f0y + 1][f0x] = this.arrayPills[f0y][f0x];
                  this.arrayPills[f1y + 1][f1x] = this.arrayPills[f1y][f1x];
                  this.arrayPills[f1y][f1x] = "";
                }
              }
            }
          }
        }
      }
    }
    this.beating();
    this.changeImgWhenFallen();
  }
  /** @Returns This function changing img url when there are only half pill on the board */
  changeImgWhenFallen() {
    for (let y = 0; y < this.arrayPills.length; y++) {
      for (let x = 0; x < this.arrayPills[y].length; x++) {
        if (this.arrayPills[y][x] != "" && this.arrayPills[y][x].id != "V") {
          let found: any[] = [];
          const id = this.arrayPills[y][x].id;
          this.arrayPills.forEach((elm) => {
            elm.forEach((pill) => {
              if (pill.id == id) found.push(pill);
            });
          });
          if (found.length != 2) {
            this.arrayPills[y][x].image = "url(./src/img/" + this.arrayPills[y][x].color + "Dot.png)";
          }
        }
      }
    }
  }
  /**
   * @param endData string specifying whether you lost or won
   * @Returns game-ending function
   * */
  theEnd(endData: string) {
    const endGame: any = document.getElementById("endGame");
    endGame.style.backgroundImage = "url('/src/img/" + endData + ".png')";
    if (endData === "GameOver") {
      const mario: any = document.getElementById("mario");
      const throwPill: any = document.getElementById("throwPill");
      throwPill.style.visibility = "hidden";
      mario.style.backgroundImage = "url('/src/img/GameOverMario.png')";
    }
  }
}
