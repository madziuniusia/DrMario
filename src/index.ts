import { Board } from "./classes/board";
import { Loupe } from "./classes/loupe";

new Board();

fetch("./src/json/animation.json")
  .then((res) => res.json())
  .then((data) => {
    let classes: any[] = [];
    classes.push(new Loupe(data.virusBlue, "blueVirus"));
    classes.push(new Loupe(data.virusYellow, "yellowVirus"));
    classes.push(new Loupe(data.virusBrown, "brownVirus"));
    let anim = function () {
      for (let i = 0; i < classes.length; i++) {
        classes[i].goAnim();
      }
      window.requestAnimationFrame(anim);
    };
    anim();
  });
