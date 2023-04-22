/**
 * This class describes an entire halfPill
 * @module
 */
/**
 * @param halfPill This is a class that contains information about halfPill
 */
export class halfPill {
  /**
   * @param this.color This is the random color from function
   */
  color: string;
  /**
   * @param this.x position x
   */
  x: number;
  /**
   * @param this.y position y
   */
  y: number;
  /**
   * @param blocked This is boolen which informs us if the pill has already dropped
   * @defaultValue `false` if `blocked` is `true`, otherwise `false`
   */
  blocked: boolean;
  /**
   * @param this.id This is unique id
   */
  id: number;
  /**
   * @param x position x form pill
   * @param y position y form pill
   * @param id unique id form pill
   */
  constructor(x: number, y: number, id: number) {
    this.color = this.randomColor();
    this.blocked = false;
    this.x = x;
    this.y = y;
    this.id = id;
  }
  /**
   * This function draws a color
   *
   * @returns returns random color in string
   */
  randomColor() {
    const ArrayWithColors = ["yellow", "blue", "brown"];
    return ArrayWithColors[Math.floor(Math.random() * 3)];
  }
}
