/**
 * This class describes an entire pill composed of two halfill modules
 * @module
 */
import { halfPill } from "./halfpill.js";
/** @ignore */
interface PillConfig {
  blocked?: boolean;
  blockedKeyDown: boolean;
}
export class Pill implements PillConfig {
  /**
   * @param blocked This is boolen which informs us if the pill has already dropped
   * @defaultValue `false` if `blocked` is `true`, otherwise `false`
   */
  blocked = false;
  /**
   * @param blockedKeyDown This is boolen which informs us if event keydown has already been executed
   * @defaultValue `false` if `blocked` is `true`, otherwise `false`
   */
  blockedKeyDown = false;
  /**
   * //@param wholePill two new classes halfPill
   * @ignore
   */
  wholePill: { pill1: any; pill2: any };
  /**
   * @param arrayPills array `16x8`. Informaction from the board class
   */
  arrayPills: any;
  /**
   * @ignore
   */
  fall: any;
  /** @ignore */
  constructor(arrayPills: any, id: number) {
    this.wholePill = {
      pill1: new halfPill(3, -1, id),
      pill2: new halfPill(4, -1, id),
    };
    this.arrayPills = arrayPills;
    this.interval(500);
    this.movement();
  }
  /**
   * @param x is the interval speed
   * @returns falling interval
   */
  interval(x: number) {
    let pill1 = this.wholePill.pill1;
    let pill2 = this.wholePill.pill2;
    this.fall = setInterval(() => {
      pill1.y++;
      pill2.y++;
      if (
        pill1.y >= 15 ||
        pill2.y >= 15 ||
        this.arrayPills[pill1.y + 1][pill1.x] != "" ||
        this.arrayPills[pill2.y + 1][pill2.x] != ""
      ) {
        clearInterval(this.fall);
        this.blocked = true;
        this.blockedKeyDown = true;
      }
      console.log("- pill" + " " + pill1.y + "|" + pill2.y);
    }, x);
  }
  /**
   * @returns this function changes posiction x and y depending on the key you clicked
   */
  movement() {
    document.addEventListener("keydown", (e) => {
      if (this.blockedKeyDown == false) {
        let dx1 = 0,
          dx2 = 0,
          dy1 = 0,
          dy2 = 0,
          pill1 = this.wholePill.pill1,
          pill2 = this.wholePill.pill2;

        if (e.key === "a" || e.key === "ArrowLeft") {
          dx1 = dx2 = -1;
          console.log(">>> KEY MOVE");
        } else if (e.key === "d" || e.key === "ArrowRight") {
          dx1 = dx2 = 1;
          console.log(">>> KEY RIGHT");
        } else if (e.key === "w" || e.key === "ArrowUp") {
          console.log(">>> KEY UP");
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
          console.log(">>> KEY SHIFT");
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
          console.log(">>> KEY DOWN");
          this.blockedKeyDown = true;
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
          this.arrayPills[pill1.y + dy1][pill1.x + dx1] == "" &&
          this.arrayPills[pill2.y + dy2][pill2.x + dx2] == "" &&
          this.arrayPills[pill1.y + dy1][pill1.x] == "" &&
          this.arrayPills[pill2.y + dy2][pill2.x] == "" &&
          this.arrayPills[pill1.y][pill1.x + dx1] == "" &&
          this.arrayPills[pill2.y][pill2.x + dx2] == ""
        ) {
          pill1.x += dx1;
          pill2.x += dx2;
          pill1.y += dy1;
          pill2.y += dy2;
          if (pill1.x === pill2.x && pill1.y > pill2.y) {
            pill1.image = "url(./src/img/" + pill1.color + "Down.png)";
            pill2.image = "url(./src/img/" + pill2.color + "Up.png)";
          } else if (pill1.x === pill2.x && pill1.y < pill2.y) {
            pill1.image = "url(./src/img/" + pill1.color + "Up.png)";
            pill2.image = "url(./src/img/" + pill2.color + "Down.png)";
          } else if (pill1.x < pill2.x && pill1.y === pill2.y) {
            pill1.image = "url(./src/img/" + pill1.color + "Left.png)";
            pill2.image = "url(./src/img/" + pill2.color + "Right.png)";
          } else if (pill1.x > pill2.x && pill1.y === pill2.y) {
            pill1.image = "url(./src/img/" + pill1.color + "Right.png)";
            pill2.image = "url(./src/img/" + pill2.color + "Left.png)";
          }
        }
      }
    });
  }
}
