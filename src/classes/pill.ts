import { halfPill } from "./halfpill.js";

export class Pill {
  wholePill: { pill1: any; pill2: any };
  blocked: boolean;
  constructor() {
    this.blocked = false;
    this.wholePill = { pill1: new halfPill(3, 0), pill2: new halfPill(4, 0) };
    this.fallen();
    this.turn();
  }

  fallen() {
    if (this.blocked === false) {
      let fall = setInterval(() => {
        this.wholePill.pill1.y++;
        this.wholePill.pill2.y++;
        if (this.wholePill.pill1.y === 15 || this.wholePill.pill2.y === 15) {
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
          this.wholePill.pill1.x >= 0 &&
          this.wholePill.pill1.x < 8 &&
          this.wholePill.pill2.x >= 0 &&
          this.wholePill.pill2.x < 8;
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
