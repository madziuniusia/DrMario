/**
 * this class has all the implementations
 * and it mainly concerns the generation of the board
 * @module
 *  */
import { Pill } from "./Pill.js";
import { Virus } from "./virus";

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
  id: number;
  /** @param gameInterval game interval */
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
  /** @Returns function responsible for calling a new tablet when the previous one drops.*/
  drawTableWithPills() {
    let addPill = new Pill(this.arrayPills, this.id);
    this.id++;
    let pill1: any = addPill.wholePill.pill1;
    let pill2: any = addPill.wholePill.pill2;

    this.gameInterval = setInterval(() => {
      if (pill1.y >= 0) {
        this.fallen();
        this.clear();
        this.points();

        this.arrayCell[pill1.y][pill1.x].elem.style.backgroundColor =
          pill1.color;
        this.arrayCell[pill2.y][pill2.x].elem.style.backgroundColor =
          pill2.color;
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
    }, 100);
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

    for (let i = 0; i < this.deletePills.length; i++) {
      this.arrayPills[this.deletePills[i].y][this.deletePills[i].x] = "";
    }
    this.deletePills = [];
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
    pointsDiv.style.backgroundImage =
      "url(./src/img/numbers/" + (3 - Virus.length) + ".png)";
    numberOfViruses.style.backgroundImage =
      "url(./src/img/numbers/" + Virus.length + ".png)";
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
                if (this.arrayPills[i][j].id == id)
                  found.push(this.arrayPills[i][j]);
              }
            }

            if (found.length != 2) {
              this.arrayPills[y + 1][x] = this.arrayPills[y][x];
              this.arrayPills[y + 1][x].y = y + 1;
              this.arrayPills[y][x] = "";
            } else if (
              this.arrayPills[found[1].y + 1][found[1].x] == "" &&
              this.arrayPills[found[0].y + 1][found[0].x] == ""
            ) {
              this.arrayPills[found[1].y + 1][found[1].x] = found[1];
              this.arrayPills[found[0].y + 1][found[0].x] = found[0];
              this.arrayPills[found[1].y + 1][found[1].x].y = y + 1;
              this.arrayPills[found[0].y + 1][found[0].x].y = y + 1;
              this.arrayPills[found[1].y][found[1].x].y = "";
              this.arrayPills[found[0].y][found[0].x].y = "";
            } else if (
              found[0].y == found[1].y &&
              (this.arrayPills[found[1].y + 1][found[1].x] == "" ||
                this.arrayPills[found[0].y + 1][found[0].x] == "")
            ) {
              console.log("help me");

              /* this.arrayPills[found[1].y + 1][found[1].x] = found[1];
              this.arrayPills[found[0].y + 1][found[0].x] = found[0];
              this.arrayPills[found[1].y + 1][found[1].x].y = found[1].y + 1;
              this.arrayPills[found[0].y + 1][found[0].x].y = found[0].y + 1;
              this.arrayPills[found[1].y][found[1].x].y = "";
              this.arrayPills[found[0].y][found[0].x].y = ""; */
            }
          }
        }
      }
    }
    this.beating();
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
      mario.style.backgroundImage = "url('/src/img/GameOverMario.png')";
    }
  }
}
