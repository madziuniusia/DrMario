interface VirusConfig {
  x: number;
  y: number;
  readonly id: string;
}
export class Virus {
  color: string;
  x = 0;
  y = 0;
  id = "V";
  arrayPills: any;
  image?;
  constructor(arrayPills: any, color: string) {
    this.arrayPills = arrayPills;
    this.color = color;
    this.image = this.imageUrl();
    this.randomPosiction();
  }

  randomPosiction() {
    let posX = Math.floor(Math.random() * 8);
    let posY = Math.floor(Math.random() * 9);

    if (this.arrayPills[posY + 7][posX] == "") {
      this.x = posX;
      this.y = posY + 7;
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
    }
  }
}
