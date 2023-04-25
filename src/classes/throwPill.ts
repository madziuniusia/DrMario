export class throwPill {
  arrayCell: HTMLDivElement[][];
  color1: string;
  color2: string;
  TimerPill: any;
  TimerHand: any;
  blocked: boolean;
  constructor(color1: string, color2: string) {
    this.arrayCell = Array.from(Array(8), () => new Array(0));
    this.generateBoard();
    this.color1 = color1;
    this.color2 = color2;
    this.throwPill();
    this.blocked = true;
  }
  generateBoard() {
    const throwPill = document.getElementById("throwPill");
    if (throwPill?.children[0]) throwPill?.children[0].remove();

    let board: any;
    board = document.createElement("div");
    board.className = "throwPillBoard";

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 12; x++) {
        let cell = document.createElement("div");
        cell.className = "throwPillCell";
        board.appendChild(cell);
        this.arrayCell[y].push(cell);
      }
    }
    throwPill?.appendChild(board);
  }

  throwPill() {
    let pillID = 1;
    let handID = 1;

    this.TimerHand = setInterval(() => {
      this.stepHand(handID);
      handID++;
      if (handID === 5) clearInterval(this.TimerHand);
    }, 200);
    this.TimerPill = setInterval(() => {
      this.stepPill(pillID);
      pillID++;
      if (pillID === 17) clearInterval(this.TimerPill);
    }, 70);
  }
  stepPill(id: number) {
    switch (id) {
      case 1:
        this.arrayCell[3][11].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[3][10].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 2:
        this.arrayCell[3][11].style.backgroundImage = "none";
        this.arrayCell[3][10].style.backgroundImage = "none";
        this.arrayCell[2][10].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Up.png")';
        this.arrayCell[3][10].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Down.png")';
        break;
      case 3:
        this.arrayCell[2][10].style.backgroundImage = "none";
        this.arrayCell[3][10].style.backgroundImage = "none";
        this.arrayCell[2][9].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Left.png")';
        this.arrayCell[2][10].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Right.png")';
        break;
      case 4:
        this.arrayCell[2][9].style.backgroundImage = "none";
        this.arrayCell[2][10].style.backgroundImage = "none";
        this.arrayCell[2][9].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Down.png")';
        this.arrayCell[1][9].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Up.png")';
        break;
      case 5:
        this.arrayCell[2][9].style.backgroundImage = "none";
        this.arrayCell[1][9].style.backgroundImage = "none";
        this.arrayCell[1][8].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[1][7].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 6:
        this.arrayCell[1][8].style.backgroundImage = "none";
        this.arrayCell[1][7].style.backgroundImage = "none";
        this.arrayCell[0][6].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Up.png")';
        this.arrayCell[1][6].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Down.png")';
        break;
      case 7:
        this.arrayCell[0][6].style.backgroundImage = "none";
        this.arrayCell[1][6].style.backgroundImage = "none";
        this.arrayCell[1][4].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Left.png")';
        this.arrayCell[1][5].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Right.png")';
        break;
      case 8:
        this.arrayCell[1][4].style.backgroundImage = "none";
        this.arrayCell[1][5].style.backgroundImage = "none";
        this.arrayCell[1][3].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Down.png")';
        this.arrayCell[0][3].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Up.png")';
        break;
      case 9:
        this.arrayCell[1][3].style.backgroundImage = "none";
        this.arrayCell[0][3].style.backgroundImage = "none";
        this.arrayCell[1][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[1][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 10:
        this.arrayCell[1][1].style.backgroundImage = "none";
        this.arrayCell[1][0].style.backgroundImage = "none";
        this.arrayCell[2][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[2][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 11:
        this.arrayCell[2][1].style.backgroundImage = "none";
        this.arrayCell[2][0].style.backgroundImage = "none";
        this.arrayCell[3][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[3][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 12:
        this.arrayCell[3][1].style.backgroundImage = "none";
        this.arrayCell[3][0].style.backgroundImage = "none";
        this.arrayCell[4][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[4][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 13:
        this.arrayCell[4][1].style.backgroundImage = "none";
        this.arrayCell[4][0].style.backgroundImage = "none";
        this.arrayCell[5][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[5][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        this.blocked = false;
        break;
      case 14:
        this.arrayCell[5][1].style.backgroundImage = 'url("/src/img/' + this.color2 + "none";
        this.arrayCell[5][0].style.backgroundImage = 'url("/src/img/' + this.color1 + "none";
        this.arrayCell[6][1].style.backgroundImage = 'url("/src/img/' + this.color2 + 'Right.png")';
        this.arrayCell[6][0].style.backgroundImage = 'url("/src/img/' + this.color1 + 'Left.png")';
        break;
      case 15:
        break;
      case 16:
        this.arrayCell[6][1].style.backgroundImage = "none";
        this.arrayCell[6][0].style.backgroundImage = "none";
        break;

      default:
        break;
    }
  }

  stepHand(id: number) {
    console.log(id);

    switch (id) {
      case 1:
        this.arrayCell[4][11].style.backgroundImage = "none";
        this.arrayCell[5][11].style.backgroundImage = "none";
        this.arrayCell[6][11].style.backgroundImage = "none";
        this.arrayCell[4][11].style.backgroundImage = 'url("/src/img/hands/up_1.png")';
        this.arrayCell[5][11].style.backgroundImage = 'url("/src/img/hands/up_2.png")';
        this.arrayCell[6][11].style.backgroundImage = 'url("/src/img/hands/up_3.png")';
        break;
      case 2:
        this.arrayCell[4][11].style.backgroundImage = "none";
        this.arrayCell[5][11].style.backgroundImage = "none";
        this.arrayCell[6][11].style.backgroundImage = "none";
        this.arrayCell[5][10].style.backgroundImage = 'url("/src/img/hands/middle11.png")';
        this.arrayCell[6][10].style.backgroundImage = 'url("/src/img/hands/middle21.png")';
        this.arrayCell[5][11].style.backgroundImage = 'url("/src/img/hands/middle12.png")';
        this.arrayCell[6][11].style.backgroundImage = 'url("/src/img/hands/middle22.png")';
        break;
      case 3:
        this.arrayCell[5][10].style.backgroundImage = "none";
        this.arrayCell[6][10].style.backgroundImage = "none";
        this.arrayCell[5][11].style.backgroundImage = "none";
        this.arrayCell[6][11].style.backgroundImage = "none";
        this.arrayCell[6][11].style.backgroundImage = 'url("/src/img/hands/down_1.png")';
        this.arrayCell[7][11].style.backgroundImage = 'url("/src/img/hands/down_2.png")';
        break;
      case 4:
        this.arrayCell[6][11].style.backgroundImage = "none";
        this.arrayCell[7][11].style.backgroundImage = "none";
        this.arrayCell[4][11].style.backgroundImage = 'url("/src/img/hands/up_1.png")';
        this.arrayCell[5][11].style.backgroundImage = 'url("/src/img/hands/up_2.png")';
        this.arrayCell[6][11].style.backgroundImage = 'url("/src/img/hands/up_3.png")';
        break;
      default:
        break;
    }
  }
}
