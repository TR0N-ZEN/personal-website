
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

class svg
{
	static id = 0;
	static apply_matrix(m, svg_object) // applies a given 2x2 matrix to an svg element like <line /> or <rect /> selected by id
	{
		let svg_matrix = svg_object.transform.baseVal[0].matrix;
		svg_matrix.a = m.a;
		svg_matrix.b = m.b;
		svg_matrix.c = m.c;
		svg_matrix.d = m.d;
		svg_matrix.e = 0;
		svg_matrix.f = 0;
	}
	static rotate_line (line, angle)
	{
		let dx = line.x2.baseVal.value - line.x1.baseVal.value;
		let dy = line.y2.baseVal.value - line.y1.baseVal.value;
		let line_length = Math.sqrt(dx*dx + dy*dy);
		line.x2.baseVal.value = line_length*safe_cos(angle);
		line.y2.baseVal.value = line_length*(-1)*safe_sin(angle);
	}
	static move_line_foot (line, x, y, relative=false)
	{
		line.x1.baseVal.value = x + (relative)*(line.x1.baseVal.value);
		line.y1.baseVal.value = y + (relative)*(line.y1.baseVal.value);
	}
	static move_line_head (line, x, y, relative=false)
	{
		line.x2.baseVal.value = x + (relative)*(line.x2.baseVal.value);
		line.y2.baseVal.value = y + (relative)*(line.y2.baseVal.value);
	}
	static shift_line (line, x, y)
	{
		svg.move_line_foot (line, x, y, true);
		svg.move_line_head (line, x, y, true);
	}
	static draw_line(x1,y1,x2,y2,color="orange",id=`svg_${svg.id++}`,svg_container = document.getElementById("coordinate_system"),)
	{
		svg_container.innerHTML += `<line id="${id}" x1="${x1}" y1="${y1*(-1)}" x2="${x2}" y2="${y2*(-1)}" stroke="${color}" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
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
		// /*case 4*/if(v.y<0) { this.set(); }
		// /*case 3*/if(v.y<0) { v.y = 1/v.y; }
		// fixing in first quadrant
		/*case 4*/if(v.x>0 && v.y<0) { v.set(v.x0,v.y0,v.x1,v.y1); }
		/*case 3*/if(v.x<0 && v.y>0) { v.set(-v.y0,v.x0,-v.y1,v.x1); }
		/*case 2*/if(v.x<0 && v.y<0) { v.set(v.x1,v.y1,v.x0,v.y0); }
		/*case 1*/if(v.x<v.y) { v.set(v.x1,v.y1,v.x0,v.x1); }
		return v;
	}
	static length(v)
	{
		return Math.sqrt(v.x*v.x + v.y*v.y);
	}
	static draw(v, color = "orange")
	{
		svg.draw_line(v.x0,v.y0,v.x1,v.y1,color);
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


test = {
	deduction_of_standard_case: function()
	{
		let vectors = [];
		for (let i = 0; i < 2; i++)
		{
			vectors.push(new vector(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50));
			vector.draw(vectors[i]);
			vector.draw(vector.normalize(vectors[i]), "green");
		}
	}
};

//main
(function main()
{
	console.log("main()");
	test.deduction_of_standard_case();
	
	// let v = new vector(0,0,0,0);
	// setInterval(()=>{
	// 	v.set(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50);
	// 	vector.draw(v);
	// },2000);

	// setTimeout(()=>{
		
	// },5000);
})();