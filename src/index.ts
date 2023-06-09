import { Board } from "./classes/board";
import { Loupe } from "./classes/loupe";

new Board();

/**
 * Index.ts
 * @param Board generate board
 * @param Loupe this is a animation
 * @retunrs index.html
 */

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
        /**
         * @deprecated
         */
      }
      window.requestAnimationFrame(anim);
    };
    anim();
  });
/**
 * this function returns animation - fetch
 * @returns fetch data
 */
