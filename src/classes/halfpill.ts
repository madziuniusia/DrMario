export class halfPill {
  color: string;
  x: number;
  y: number;
  blocked: boolean;
  id: number;
  constructor(x: number, y: number, id: number) {
    this.color = this.randomColor();
    this.blocked = false;
    this.x = x;
    this.y = y;
    this.id = id;
  }

  randomColor() {
    const ArrayWithColors = ["yellow", "blue", "brown"];
    return ArrayWithColors[Math.floor(Math.random() * 3)];
  }
}
