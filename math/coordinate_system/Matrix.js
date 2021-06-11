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
	multiply(vector)
	{
		let x = this.a*vector.x + this.c*y;
		let y = this.b*vector.x + this.d*y;
		return new Vector_2(0,0,x, y);
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

class Matrix_3x3 extends Matrix
{
	constructor(a,b,c,d,e,f,g,h,i)
	{
		super();
		this.a = a;
		this.b = b;
		this.c = c;
		
		this.d = d;
		this.e = e;
		this.f = f;
		
		this.g = g;
		this.h = h;
		this.i = i;
	}
	multiply(vector)
	{
		let x = this.a*vector.x + this.d*vector.y + this.g*vector.z;
		let y = this.b*vector.x + this.e*vector.y + this.h*vector.z;
		let z = this.c*vector.x + this.f*vector.y + this.i*vector.z;
		return new Vector_3(0,0,0,x,y,z);
	}
}