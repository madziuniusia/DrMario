import { halfPill } from "./halfpill.js";
export class Pill {
  wholePill: { pill1?: any; pill2: any };
  blocked: boolean;
  arrayPills: any;
  fall: any;
  constructor(arrayPills: any, id: number) {
    this.blocked = false;
    this.wholePill = {
      pill1: new halfPill(3, 0, id),
      pill2: new halfPill(4, 0, id),
    };
    this.arrayPills = arrayPills;
    this.interval(500);
    this.movement();
  }
  interval(x: number) {
    let pill1 = this.wholePill.pill1;
    let pill2 = this.wholePill.pill2;
    this.fall = setInterval(() => {
      pill1.y++;
      pill2.y++;
      if (
        pill1.y === 15 ||
        pill2.y === 15 ||
        this.arrayPills[pill1.y + 1][pill1.x] != "" ||
        this.arrayPills[pill2.y + 1][pill2.x] != ""
      ) {
        this.blocked = true;
        clearInterval(this.fall);
      }
    }, x);
  }

  movement() {
    document.addEventListener("keydown", (e) => {
      if (this.blocked === false) {
        let dx1 = 0,
          dx2 = 0,
          dy1 = 0,
          dy2 = 0,
          pill1 = this.wholePill.pill1,
          pill2 = this.wholePill.pill2;

        if (e.key === "a" || e.key === "ArrowLeft") {
          dx1 = dx2 = -1;
        } else if (e.key === "d" || e.key === "ArrowRight") {
          dx1 = dx2 = 1;
        } else if (e.key === "w" || e.key === "ArrowUp") {
          if (pill1.x === pill2.x) {
            if (pill1.y < pill2.y) {
              dx2 = 1;
              dy2 = -1;
            } else {
              dx2 = -1;
              dy2 = 1;
            }
          } else {
            if (pill1.x > pill2.x) dx2 = dy2 = 1;
            else dx2 = dy2 = -1;
          }
        } else if (e.key == "Shift") {
          if (pill1.x === pill2.x) {
            if (pill1.y < pill2.y) dx2 = dy2 = -1;
            else dx2 = dy2 = 1;
          } else {
            if (pill1.x > pill2.x) {
              dx2 = 1;
              dy2 = -1;
            } else {
              dx2 = -1;
              dy2 = 1;
            }
          }
        } else if (e.key === "s" || e.key == "ArrowDown") {
          clearInterval(this.fall);
          this.interval(50);
        }
        if (
          pill1.x + dx1 >= 0 &&
          pill1.x + dx1 <= 7 &&
          pill2.x + dx2 >= 0 &&
          pill2.x + dx2 <= 7 &&
          pill1.y + dy1 >= 0 &&
          pill2.y + dy2 >= 0 &&
          pill1.y + dy1 <= 15 &&
          pill2.y + dy2 <= 15 &&
          this.arrayPills[pill1.y][pill1.x + dx1] == "" &&
          this.arrayPills[pill2.y][pill2.x + dx2] == "" &&
          this.arrayPills[pill1.y + dy1][pill1.x] == "" &&
          this.arrayPills[pill2.y + dy2][pill2.x] == "" &&
          this.arrayPills[pill1.y + dy1][pill1.x + dx1] == "" &&
          this.arrayPills[pill2.y + dy2][pill2.x + dx2] == ""
        ) {
          pill1.x += dx1;
          pill2.x += dx2;
          pill1.y += dy1;
          pill2.y += dy2;
        }
      }
    });
  }
}
