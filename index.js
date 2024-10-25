"use strict";
const minFiguresCount = 1;
const maxFiguresCount = 5;
const min_fiure_height_percent = 5;  // in percents of clientHeight
const max_fiure_height_percent = 30; // in percents of clientHeight
const min_start_left = 0;
const min_start_top = 60; // to avoid appearing of figures on upper input and buttons
let min_fiure_height = 0;
let max_fiure_height = 0;
let selected_element = undefined;
const mark_color = "yellow";



window.onload = function() {
	min_fiure_height = document.documentElement.clientHeight * min_fiure_height_percent / 100;
	max_fiure_height = document.documentElement.clientHeight * max_fiure_height_percent / 100;
	document.getElementById("btnSquare").onclick = btnSquareClick;
	document.getElementById("btnTriangle").onclick = btnTriangleClick;
	document.getElementById("btnCircle").onclick = btnCircleClick;
}

function markElement(element){
	if (element.className=="triangle"){
		element.style.borderBottomColor = mark_color;
		return;
	}
	element.style.backgroundColor = mark_color;
}

function unmarkElement(element){
		switch (selected_element.className){
					case "square": element.style.backgroundColor="red"; break;
					case "circle": element.style.backgroundColor="green";break;
					case "triangle":element.style.borderBottomColor = "blue";break;
				}
}


function onElementClick(){
		if (selected_element == this){
			document.getElementById("canvas").removeChild(selected_element);
			return;
		}
		if (selected_element != this){
			markElement(this);
			if (selected_element != undefined){
				unmarkElement(selected_element);
			}
			selected_element = this;
		}	
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkAndGetCountOfFigures(){
	let n = Number(document.getElementById("inputCount").value);
	if (n == NaN || n < minFiguresCount || n > maxFiguresCount){
		alert("Количество фигур должно быть числом в диапазоне от " + minFiguresCount + " до " + maxFiguresCount);
		return NaN;
	}
	return n;
}


function createElement(elementClassName){
	let n = checkAndGetCountOfFigures();
	if (n == NaN) return;
	for (let i = 0; i< n; i++){
		let height_ = getRandomInt(min_fiure_height, max_fiure_height);
		let width_ = height_;
		let diffForMaxRight = (elementClassName == "triangle") ? 2 * width_ : width_;// For triangle we should make right difference equals to double width
		let left_ = getRandomInt(min_start_left, document.documentElement.clientWidth - diffForMaxRight);
		let top_ = getRandomInt(min_start_top, document.documentElement.clientHeight - height_);
		let el = document.createElement("div");
		el.className = elementClassName;
		el.style.top = top_ + "px";
		el.style.left = left_ + "px";
		if (elementClassName == "triangle") {
			el.style.borderLeftWidth = width_ + "px";
			el.style.borderRightWidth = width_ + "px";
			el.style.borderBottomWidth = width_ + "px";
		} else {
			el.style.width = width_ + "px";
			el.style.height = height_ + "px";
		}
		let canvas = document.getElementById("canvas");
		canvas.appendChild(el);
		el.style.display="block";
		el.onclick = onElementClick;
	}	
	
}

function btnSquareClick(){
	createElement("square");
}

function btnTriangleClick(){
	createElement("triangle");
}

function btnCircleClick(){
	createElement("circle");
}

document.addEventListener('click', function(e) {
  if (selected_element != undefined
		&& e.target.className != 'circle'
		&& e.target.className != 'square'
		&& e.target.className != 'triangle'
		) {
	unmarkElement(selected_element);
	selected_element != undefined;
  }
})





