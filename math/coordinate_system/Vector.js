class Vector { constructor() {}; }

class Vector_2 extends Vector
{
	constructor(x0 = 0,y0 = 0,x1 = 0,y1 = 0)
	{
		super();
		this.x0 = x0;
		this.y0 = y0;
		this.x1 = x1;
		this.y1 = y1;
		this.x = x1-x0;
		this.y = y1-y0;
	}
	set(x0,y0,x1,y1) { this.x0 = x0; this.y0 = y0; this.x1 = x1; this.y1 = y1; this.x = x1-x0; this.y = y1-y0; return this; }
	scale(s) { return this.set(this.x0,this.y0, this.x0+this.x*s, this.y0+this.y*s) }
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
	static std_2(v)
	{
		mirror_x = false;
		mirror_y = false;
		change = false;
		if (v.x<0) { mirror_x = true; v.x *= (-1); }
		if (v.y<0) { mirror_y = true; v.y *= (-1); }
		if (v.y > v.x) { change = true; let c = v.x; v.x = v.y; v.y = c; }
		return v;
	}
	static length(v)
	{
		return Math.sqrt(v.x*v.x + v.y*v.y);
	}
	static log(v)
	{
		console.log(`(${v.x} ${v.y})`);
	}
}

class Vector_3 extends Vector
{
	constructor(x0 = 0,y0 = 0,x1 = 0,y1 = 0, z0 = 0, z1 = 0)
	{
		super();
		this.x0 = x0;
		this.y0 = y0;
		this.x1 = x1;
		this.y1 = y1;
		this.z0 = z0;
		this.z1 = z1;
		this.x = x1-x0;
		this.y = y1-y0;
		this.z = z1-z0;
	}
	set(x0,y0,z0,x1,y1,z1) { this.x0 = x0; this.y0 = y0; this.x1 = x1; this.y1 = y1; this.z0 = z0; this.z1 = z1; this.x = x1-x0; this.y = y1-y0; this.z = z1-z0; return this; }
	scale(s) { return this.set(this.x0,this.y0,this.z0, this.x0+this.x*s,this.y0+this.y*s,z0+this.z*s) }
	// transform(m)
	// {
	// 	let x0 = m.a*this.x0+m.c*this.y0;
	// 	let y0 = m.b*this.x0+m.d*this.y0;
	// 	let x1 = m.a*this.x1+m.c*this.y1;
	// 	let y1 = m.b*this.x1+m.d*this.y1;
	// 	return this.set(x0,y0,x1,y1);
	// }
	// static std(v)
	// {
	// 	let angle = 0;
	// 	/*case 8*/if(v.x>0 && v.y<0  && Math.abs(v.x) >= Math.abs(v.y)) { angle = 45;  }
	// 	/*case 7*/if(v.x>=0 && v.y<0 && Math.abs(v.x) <  Math.abs(v.y)) { angle = 90;  } else
	// 	/*case 6*/if(v.x<0 && v.y<0  && Math.abs(v.x) <  Math.abs(v.y)) { angle = 135; } else
	// 	/*case 5*/if(v.x<0 && v.y<=0 && Math.abs(v.x) >= Math.abs(v.y)) { angle = 180; } else
	// 	/*case 4*/if(v.x<0 && v.y>0  && Math.abs(v.x) >= Math.abs(v.y)) { angle = 235; } else
	// 	/*case 3*/if(v.x<=0 && v.y>0 && Math.abs(v.x) <  Math.abs(v.y)) { angle = 270; } else
	// 	/*case 2*/if(v.x>0 && v.y>0  && Math.abs(v.x) <  Math.abs(v.y)) { angle = 315; }
	// 	console.log(`rotation angle ${angle}`);
	// 	///*case 1*/if(v.x>0 && v.y>0 && Math.abs(v.x) >= Math.abs(v.y)) {  }
	// 	return v.transform(Matrix_2x2.rotation(angle));
	// }
	// static std_2(v)
	// {
	// 	mirror_x = false;
	// 	mirror_y = false;
	// 	change = false;
	// 	if (v.x<0) { mirror_x = true; v.x *= (-1); }
	// 	if (v.y<0) { mirror_y = true; v.y *= (-1); }
	// 	if (v.y > v.x) { change = true; let c = v.x; v.x = v.y; v.y = c; }
	// 	return v;
	// }
	static length(v)
	{
		return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
	}
	static log(v)
	{
		console.log(`(${v.x} ${v.y}  ${v.z})`);
	}
}