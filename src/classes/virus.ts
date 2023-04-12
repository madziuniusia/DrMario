export class Virus {
  color: string;
  x: number;
  y: number;
  id: string;
  arrayPills: any;
  constructor(arrayPills: any, color: string) {
    this.arrayPills = arrayPills;
    this.color = color;
    this.y = 0;
    this.x = 0;
    this.id = "V";
    this.randomPosiction();
  }

  randomPosiction() {
    let posX = Math.floor(Math.random() * 8);
    let posY = Math.floor(Math.random() * 13);

    if (this.arrayPills[posY + 3][posX] == "") {
      this.x = posX;
      this.y = posY + 3;
    } else {
      this.randomPosiction();
    }
  }
}
