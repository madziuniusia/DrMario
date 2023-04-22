export class Loupe {
  tickNumber: number;
  actFrame: number;
  posiction?;
  times: any;
  repeat: boolean;
  destId: any;

  constructor(ob: any, destId: string) {
    this.tickNumber = 0;
    this.actFrame = 0;
    this.posiction = ob.posiction;
    this.times = ob.times;
    this.repeat = ob.repeat;
    this.destId = document.getElementById(destId);
  }

  renderFrame(i: number) {
    this.destId.style.top = this.posiction[i].top + "px";
    this.destId.style.left = this.posiction[i].left + "px";
  }

  goAnim() {
    this.renderFrame(this.actFrame);
    this.tickNumber++;
    if (this.tickNumber == this.times[this.actFrame]) {
      this.tickNumber = 0;
      this.actFrame++;
    }
    if (this.repeat && this.actFrame == this.posiction.length) this.actFrame = 0;
  }
}
