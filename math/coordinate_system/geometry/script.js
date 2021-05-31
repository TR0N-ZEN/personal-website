
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

class Svg
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
		Svg.move_line_foot (line, x, y, true);
		Svg.move_line_head (line, x, y, true);
	}
	static draw_line (p1,p2, color="orange",id=`svg_${Svg.id++}`,svg_container = document.getElementById("coordinate_system"))
	{
		svg_container.innerHTML += `<line id="${id}" x1="${p1.x}" y1="${p1.y*(-1)}" x2="${p2.x}" y2="${p2.y*(-1)}" stroke="${color}" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
	static draw_point (p, color="orange", r = 0.5, id=`svg_${Svg.id++}`,svg_container = document.getElementById("coordinate_system"))
	{
		svg_container.innerHTML += `<circle id="${id}" cx="${p.x}" cy="${p.y*(-1)}" r="${r}" fill="${color}" stroke="${color}" stroke-width="0.5" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
}

class Vector
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
	set(x0,y0,x1,y1) { this.x0 = x0; this.y0 = y0; this.x1 = x1; this.y1 = y1; this.x = x1-x0; this.y = y1-y0; return this; }
	scale(s) { return this.set(this.x0,this.y0, this.x0+this.x*s, this.y0+this.y*s) };
	transform(m)
	{
		let x0 = m.a*this.x0+m.c*this.y0;
		let y0 = m.b*this.x0+m.d*this.y0;
		let x1 = m.a*this.x1+m.c*this.y1;
		let y1 = m.b*this.x1+m.d*this.y1;
		return this.set(x0,y0,x1,y1);
	}
	static std(v)
	{
		let angle = 0;
		/*case 8*/if(v.x>0 && v.y<0  && Math.abs(v.x) >= Math.abs(v.y)) { angle = 45;  }
		/*case 7*/if(v.x>=0 && v.y<0 && Math.abs(v.x) <  Math.abs(v.y)) { angle = 90;  } else
		/*case 6*/if(v.x<0 && v.y<0  && Math.abs(v.x) <  Math.abs(v.y)) { angle = 135; } else
		/*case 5*/if(v.x<0 && v.y<=0 && Math.abs(v.x) >= Math.abs(v.y)) { angle = 180; } else
		/*case 4*/if(v.x<0 && v.y>0  && Math.abs(v.x) >= Math.abs(v.y)) { angle = 235; } else
		/*case 3*/if(v.x<=0 && v.y>0 && Math.abs(v.x) <  Math.abs(v.y)) { angle = 270; } else
		/*case 2*/if(v.x>0 && v.y>0  && Math.abs(v.x) <  Math.abs(v.y)) { angle = 315; }
		console.log(`rotation angle ${angle}`);
		///*case 1*/if(v.x>0 && v.y>0 && Math.abs(v.x) >= Math.abs(v.y)) {  }
		return v.transform(Matrix_2x2.rotation(angle));
	}
	static length(v)
	{
		return Math.sqrt(v.x*v.x + v.y*v.y);
	}
	static log(v)
	{
		console.log(`(${v.x} ${v.y})`);
	};
	static draw(v, color = "orange")
	{
		Svg.draw_line(new Vector(0,0,v.x0,v.y0), new Vector(0,0,v.x1,v.y1),color);
		Svg.draw_point(new Vector(0,0,v.x0,v.y0), color);
	}
}

class Matrix{ constructor() {}; }
class Matrix_2x2 extends Matrix
{
	// resembles 2x2 matrix
	// 		a c
	// 		b d
	constructor(a,b,c,d)
	{
		super();
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	static rotation(angle)
	{
		return (new Matrix_2x2(safe_cos(angle),safe_sin(angle),(-1)*safe_sin(angle),safe_cos(angle)));
	}
}
class Matrix_2x3 extends Matrix
{
	// resembles 2x3 matrix
	// 		a c e
	// 		b d f
	constructor(a,b,c,d,e,f)
	{
		super();
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
		let v1,v1_std = undefined;
		for (let i = 0; i < 1; i++)
		{
			//v1 = new Vector(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50);
			v1 = new Vector(0,0,0,-20);
			Vector.log(v1);
			Vector.draw(v1, "red");
			
			v1_std = Vector.std(v1);
			Vector.log(v1_std);
			Vector.draw(v1_std.scale(0.5), "green");
		}
	}
};

//main
(function main()
{
	console.log("main()");
	test.deduction_of_standard_case();
	
	// let v = new Vector(0,0,0,0);
	// setInterval(()=>{
	// 	v.set(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50);
	// 	Vector.draw(v);
	// },2000);

	// setTimeout(()=>{
		
	// },5000);
})();