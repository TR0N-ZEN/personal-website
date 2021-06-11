class SVG
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
		SVG.move_line_foot (line, x, y, true);
		SVG.move_line_head (line, x, y, true);
	}
	static draw_line (p1,p2, color="orange", id=`svg_${SVG.id++}`,svg_container = document.getElementById("coordinate_system"))
	{
		svg_container.innerHTML += `<line class="${id}" x1="${p1.x}" y1="${p1.y*(-1)}" x2="${p2.x}" y2="${p2.y*(-1)}" stroke="${color}" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
	static draw_point (p, color="orange", r = 0.5, id=`svg_${SVG.id++}`,svg_container = document.getElementById("coordinate_system"))
	{
		svg_container.innerHTML += `<circle class="${id}" cx="${p.x}" cy="${p.y*(-1)}" r="${r}" fill="${color}" stroke="${color}" stroke-width="0.5" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
	static draw_vector (vector, color="orange",id=`svg_${SVG.id++}`,svg_container = document.getElementById("coordinate_system"))
	{
		svg_container.innerHTML += `<line class="${id}" x1="${vector.x0}" y1="${vector.y0*(-1)}" x2="${vectro.x1}" y2="${vector.y1*(-1)}" stroke="${color}" stroke-width="0.2" transform="matrix(1 0 0 1 0 0)"></line>`;
		svg_container.innerHTML += `<circle class="${id}" cx="${vector.x0}" cy="${vector.y0*(-1)}" r="${0.5}" fill="${color}" stroke="${color}" stroke-width="0.5" transform="matrix(1 0 0 1 0 0)"></line>`;
	}
}