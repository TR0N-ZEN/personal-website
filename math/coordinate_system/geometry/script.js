
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

class vector
{
	constructor(x0,y0,x1,y1)
	{
		this.x0 = x0;
		this.y0 = y0;
		this.x1 = x1;
		this.y1 = y1;
		this.x = x1-x0;
		this.y = y1-y0;
	}
	set(x0,y0,x1,y1) { this.x0 = x0; this.y0 = y0; this.x1 = x1; this.y1 = y1; this.x = x1-x0; this.y = y1-y0; }
	static draw_line (svg_container,id,p1,p2)
	{
		svg_container.innerHTML += `<line id="${id}" x1="${p1.x}" y1="${p1.y*(-1)}" x2="${p2.x}" y2="${p2.y*(-1)}" stroke="orange" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
	transform(m)
	{
		let x0 = m.a*this.x0+m.c*this.y0;
		let y0 = m.b*this.x0+m.d*this.y0;
		let x1 = m.a*this.x1+m.c*this.y1;
		let y1 = m.b*this.x1+m.d*this.y1;
		v.set(x0,y0,x1,y1);
		return v;
	}
	static normalize(v)
	{
		/*case 4*/if(v.y<0) { this.set(); }
		/*case 3*/if(v.y<0) { v.y = 1/v.y; }
		// fixing in first quadrant
		/*case 2*/if(v.y<0) { v.set(v.x0,1/v.y0,v.x1,1/v.y1); }
		/*case 1*/if(v.x<v.y) { v.set(v.x1,v.y1,v.x0,v.x1); }
	}
}

class matrix{}
class matrix_2x2 extends matrix
{
	// resembles 2x2 matrix
	// 		a c
	// 		b d
	constructor(a,b,c,d)
	{
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	static rotation(angle)
	{
		return (new matrix_2x2(safe_cos(angle),safe_sin(angle),(-1)*safe_sin(angle),safe_cos(angle)));
	}
}
class matrix_2x3 extends matrix
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

function apply_matrix(m, svg_object) // applies a given 2x3 matrix to an svg element like <line /> or <rect /> selected by id
{
	let svg_matrix = svg_object.transform.baseVal[0].matrix;
	svg_matrix.a = m.a;
	svg_matrix.b = m.b;
	svg_matrix.c = m.c;
	svg_matrix.d = m.d;
	svg_matrix.e = 0;
	svg_matrix.f = 0;
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
function draw_line(svg_container,id,x1,y1,x2,y2)
{
	svg_container.innerHTML += `<line id="${id}" x1="${x1}" y1="${y1*(-1)}" x2="${x2}" y2="${y2*(-1)}" stroke="orange" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
}

//main

let angle = 0;
const vector_1 = document.getElementById("vector");
const x = document.getElementById("x");
const y = document.getElementById("y");
const rect = document.getElementById("rect");
const line = document.getElementById("line");
const coordinate_system = document.getElementById("coordinate_system");
const r = 100; // line length
let cos, sin, m = undefined;
setInterval(
	() =>
	{
		angle = (angle+1)%360;
		cos = safe_cos(angle);
		sin = safe_sin(angle);
		m = matrix_2x2.rotation(angle);
		move_line_head (x, cos*r, 0);
		move_line_foot (y, cos*r, 0);
		move_line_head (y, cos*r, (-1)*sin*r);
		rotate_line(vector_1, angle);
		apply_matrix(m, rect);
		apply_matrix(m, line);
	}, 20
);


// setTimeout(()=>{
	
// },5000);

//
// let a = new DOMPoint(0,100);
// var m = new DOMMatrix();