



test = {
	deduction_of_standard_case: function()
	{
		let v1,v1_std = undefined;
		for (let i = 0; i < 1; i++)
		{
			v1 = new Vector_2(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50);
			Vector_2.log(v1);
			Vector_2.draw(v1, "red");
			v1_std = Vector_2.std(v1);
			Vector_2.log(v1_std);
			Vector_2.draw(v1_std.scale(0.5), "green");
		}
	}
};

//main
(function main()
{
	console.log("main()");
	test.deduction_of_standard_case();
	
	// let v = new Vector_2(0,0,0,0);
	// setInterval(()=>{
	// 	v.set(Math.random()*50,Math.random()*50,Math.random()*50,Math.random()*50);
	// 	Vector.draw(v);
	// },2000);

	// setTimeout(()=>{
		
	// },5000);
})();