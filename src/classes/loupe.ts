export class Loupe {
  tickNumber: number;
  actFrame: number;
  posiction?;
  times: any;
  repeat: boolean;
  destId: string;

  constructor(ob: any, destId: string) {
    this.tickNumber = 0;
    this.actFrame = 0;
    this.posiction = ob.posiction;
    this.times = ob.times;
    this.repeat = ob.repeat;
    this.destId = destId;
  }

  renderFrame(i: number) {
    console.log(this.destId);

    let elem: any = document.getElementById(this.destId);
    elem.style.top = this.posiction[i].top + "px";
    elem.style.left = this.posiction[i].left + "px";
  }

  goAnim() {
    this.renderFrame(this.actFrame);
    this.tickNumber++;
    if (this.tickNumber == this.times[this.actFrame]) {
      this.tickNumber = 0;
      this.actFrame++;
    }
    if (this.repeat && this.actFrame == this.posiction.length)
      this.actFrame = 0;
  }
}
