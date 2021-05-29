
function radiant (angle, radius = 1) { return 2*Math.PI*radius*(angle/360); }

function safe_sin (angle)
{
	val = Math.sin(radiant(angle));
	return (Math.abs(val)>1e-2)*(val) + (Math.abs(val)<=1e-2)*(0);
}
function safe_cos (angle)
{
	val = Math.cos(radiant(angle));
	return (Math.abs(val)>1e-2)*(val) + (Math.abs(val)<=1e-2)*(0);
}

class matrix
{
	// resembles 2x3 matrix
	// 		a c e
	// 		b d f
	constructor(a,b,c,d,e,f)
	{
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
		this.f = f;
	}
}

function rotation_matrix(angle)
{
	return new matrix(safe_cos(angle),0,0,safe_sin(angle)*(-1),0,0);
}

function apply_matrix(m, id) // applies a given 2x3 matrix to an svg element like <line /> or <rect /> selected by id
{
	let svg_matrix = document.getElementById(id).transform.baseVal[0].matrix;
	svg_matrix.a = m.a;
	svg_matrix.b = m.b;
	svg_matrix.c = m.c;
	svg_matrix.d = m.d;
	svg_matrix.e = m.e;
	svg_matrix.f = m.f;
}

function rotate_line (line, angle, line_length = 100)
{
	line.x2.baseVal.value = line_length*safe_cos(angle);
	line.y2.baseVal.value = line_length*(-1)*safe_sin(angle);
}

function move_line_foot (line, x, y)
{
	line.x1.baseVal.value = x;
	line.y1.baseVal.value = y;	
}
function move_line_head (line, x, y)
{
	line.x2.baseVal.value = x;
	line.y2.baseVal.value = y;
}
function move_line (line, x, y)
{
	move_line_foot (line, x, y);
	move_line_head (line, x, y);
}

//main

let angle = 0;
let vector = document.getElementById("vector");
let x = document.getElementById("x");
let y = document.getElementById("y");
const r = 100; // line length
let cos, sin = undefined;
setInterval(
	() =>
	{
		angle = (angle+1)%360;
		cos = safe_cos(angle);
		sin = safe_sin(angle);
		move_line_head (x, cos*r, 0);
		move_line_foot (y, cos*r, 0);
		move_line_head (y, cos*r, (-1)*sin*r);
		rotate_line(vector, angle);
	}, 10
);

// setTimeout(()=>{
// 	apply_matrix(rotation_matrix(45), "vector");
// },5000);

//
// let a = new DOMPoint(0,100);
// var m = new DOMMatrix();