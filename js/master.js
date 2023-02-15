// Drop down list

let down = document.querySelector('#dropdown-icon'),
	exit = document.querySelector('#close'),
	list = document.querySelector('.list');

down.onclick = (_) => (list.style.cssText = 'transform: translateY(0)');
exit.onclick = (_) => (list.style.cssText = 'transform: translateY(-100%)');

// Header style

let header = document.querySelector('header');
onscroll = _ => {
    if(window.scrollY >= 50) {
        header.style.background = "#101010";
    } else {
        header.style.background = "transparent";
    }
}

// Typewrite effect on home page

let TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	let i = this.loopNum % this.toRotate.length;
	let fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	let that = this;
	let delta = 200 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 200;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

window.onload = function() {
	let elements = document.getElementsByClassName('typewrite');
	for (let i = 0; i < elements.length; i++) {
		let toRotate = elements[i].getAttribute('data-type');
		let period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	let css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
	document.body.appendChild(css);
};

// Change Color

let gear = document.querySelector('#gear');
let settings = document.querySelector('.settings');

let colors = document.querySelectorAll('.settings ul li');
let root = document.querySelector(':root');

// Show & hide settings  
gear.onclick = _ => settings.classList.toggle('show');

root.style.setProperty('--main-color', localStorage.getItem('main-color') || '#c70039');

colors.forEach(color => {
	color.addEventListener('click', function() {
		localStorage.setItem('main-color', this.getAttribute('color'));
		root.style.setProperty('--main-color', localStorage.getItem('main-color') || '#c70039');
	});
});