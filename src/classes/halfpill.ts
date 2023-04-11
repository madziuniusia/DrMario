export class halfPill {
  color: string;
  x: number;
  y: number;
  blocked: boolean;
  constructor(x: number, y: number) {
    this.color = this.randomColor();
    this.blocked = false;
    this.x = x;
    this.y = y;
  }

  randomColor() {
    const ArrayWithColors = ["#9F3632", "#3A5E52", "#314D65", "#D4A152"];
    return ArrayWithColors[Math.floor(Math.random() * 4)];
  }
}
