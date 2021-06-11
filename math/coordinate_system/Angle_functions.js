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