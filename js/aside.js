export default class Aside {
  constructor(asideWidth) {
    this.asideWidth = asideWidth;
  }

  asideToggle() {
    const left = $("aside").css("left");

    if (left === '-255px') {
			// Open
      $("aside").animate({ left: `0px` }, 500);
      $('aside .icons i.fa-bars').css({ display: "none" });
			$('aside .icons i.fa-x').css({ display: "block" });
			// listUp
			this.linksUp()
    } else {
			// Close
      $("aside").animate({ left: `-${this.asideWidth}px` }, 500);
      $('aside .icons i.fa-x').css({ display: "none" });
      $('aside .icons i.fa-bars').css({ display: "block" });
			// listDown
			$('aside .links ul li').animate({top:'200px'},300)
    }
  }

	linksUp() {
			$('aside .links ul li:nth-child(1)').show().animate({top: '0px'}, 550)
			$('aside .links ul li:nth-child(2)').show().animate({top: '0px'}, 600)
			$('aside .links ul li:nth-child(3)').show().animate({top: '0px'}, 650)
			$('aside .links ul li:nth-child(4)').show().animate({top: '0px'}, 700)
			$('aside .links ul li:nth-child(5)').show().animate({top: '0px'}, 750)
	}
}
