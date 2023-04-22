/**
 * This class describes an entire virus
 * @module
 */
interface VirusConfig {
  x: number;
  y: number;
  readonly id: string;
}

export class Virus implements VirusConfig {
  /** @ignore */
  color: string;
  /** @param x x virus position x */
  x = 0;
  /** @param y y virus position x */
  y = 0;
  /**
   * @readonly
   * @defaultValue always `V`
   */
  id = "V";
  /** @param arrayPills array with all information about Pills in Board    */
  arrayPills: any;
  /** @param image url image */
  image?;
  /**
   * @param arrayPills array with all information about Pills in Board
   * @param color is the color from board
   *  */
  constructor(arrayPills: any, color: string) {
    this.arrayPills = arrayPills;
    this.color = color;
    this.image = this.imageUrl();
    this.randomPosiction();
  }

  /** @returns random position x and y*/
  randomPosiction() {
    const posX = Math.floor(Math.random() * 8);
    const posY = Math.floor(Math.random() * 8) + 8;
    if (this.arrayPills[posY][posX] == "") {
      this.x = posX;
      this.y = posY;
    } else {
      this.randomPosiction();
    }
  }
  imageUrl() {
    switch (this.color) {
      case "yellow":
        return "url(./src/img/virus_yellow.png)";
      case "brown":
        return "url(./src/img/virus_brown.png)";
      case "blue":
        return "url(./src/img/virus_blue.png)";
      default:
        return "";
    }
  }
}
