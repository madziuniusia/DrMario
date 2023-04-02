import { halfPill } from "./halfpill.js";

export class Pill {
  wholePill: { pill1: any; pill2: any };
  blocked: boolean;
  arrayCellColor: any;
  constructor(arrayCellColor: any) {
    this.blocked = false;
    this.wholePill = { pill1: new halfPill(3, 0), pill2: new halfPill(4, 0) };
    this.arrayCellColor = arrayCellColor;
    this.fallen();
    this.turn();
  }

  fallen() {
    if (this.blocked === false) {
      let pill1 = this.wholePill.pill1;
      let pill2 = this.wholePill.pill2;
      let fall = setInterval(() => {
        pill1.y++;
        pill2.y++;
        if (
          pill1.y === 15 ||
          pill2.y === 15 ||
          this.arrayCellColor[pill1.y + 1][pill1.x] != "" ||
          this.arrayCellColor[pill2.y + 1][pill2.x] != ""
        ) {
          this.blocked = true;
          clearInterval(fall);
        }
      }, 500);
    }
  }

  turn() {
    if (this.blocked === false) {
      document.addEventListener("keydown", (e) => {
        let conditionsBoard =
          this.wholePill.pill1.x > 0 &&
          this.wholePill.pill1.x < 7 &&
          this.wholePill.pill2.x > 0 &&
          this.wholePill.pill2.x < 7;
        console.log(this.wholePill.pill2.x);

        if (e.key === "a" || e.key === "ArrowLeft") {
          if (conditionsBoard) {
            this.wholePill.pill1.x--;
            this.wholePill.pill2.x--;
          }
        } else if (e.key === "d" || e.key === "ArrowRight") {
          if (conditionsBoard) {
            this.wholePill.pill1.x++;
            this.wholePill.pill2.x++;
          }
        } else if (e.key === "w" || e.key === "Shift") {
          if (conditionsBoard) {
            //this.wholePill.pill2.x
            //obracanie
          }
        } else if (e.key === "s" || e.key == "ArrowDown") {
          this.blocked === true;
          //spadanie
        }
      });
    }
  }
}
