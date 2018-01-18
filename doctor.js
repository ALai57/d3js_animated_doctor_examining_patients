

var svg = d3.select('#DoctorDiv')
	.append("svg")
	.style("width",wd)
	.style("height",ht);	


var tableDr = d3.select('#DoctorDiv').select('svg')
  .append("foreignObject")
  .attr("width", 480)
  .attr("height", 500)
  .append("xhtml:body");

tableDr.append("div")
	 .attr('class','ANN_Table')
     .attr("style", "margin-left: 400px");	
	
	
var dataTable = tabulate('#DoctorDiv', myData, ["T", "HR", "S_true"]);
			
var patient = d3.select('#DoctorDiv').select('svg').selectAll('.patientImg')
	.data(myData,function(d){return d.id;})
	.enter()
	.append('svg:image')
	.attr('id', function (d,i) {return 'patient'+i;})
	.attr('class','patientImg')
	.attr('href',function (d) {if(d.S_true === "Sick"){return  './Person_Sick.svg';}
									  else {return  './Person_Healthy.svg';} })
	.attr('x', function (d,i){return x(-2.8*i+1.5);})
	.attr('y', 0)
	.attr('height',Math.abs(y(5)-y(0)));

var doctor = d3.select('#DoctorDiv').select('svg').selectAll('#doctor')
	.data([0])
	.enter()
	.append('svg:image')
	.attr('id', 'doctor')
	.attr('href','./Person_Doctor.svg')
	.attr('x', x(5))
	.attr('y', 0)
	.attr('height',Math.abs(y(5)-y(0)))
	.on('click',function(){ return scanPatient();});

var eyeL = d3.select('#DoctorDiv').select('svg').selectAll('#eyeL')
	.data([0])
	.enter()
	.append('circle')
	.attr('id','eyeL')
	.attr('cx',x(5.7))
	.attr('cy',y(4.3))
	.attr('r',x(0.1)-x(0))
	.attr("fill", "black");	
				
var eyeR = d3.select('#DoctorDiv').select('svg').selectAll('#eyeR')
	.data([0])
	.enter()
	.append('circle')
	.attr('id','eyeR')
	.attr('cx',x(6.25))
	.attr('cy',y(4.3))
	.attr('r',x(0.1)-x(0))
	.attr("fill", "black");	
	

var scanDuration = 1200;
var resetDuration = 500;	
var advanceTime = 500;
var patientNumber = 0;

function scanPatient () {
	d3.select('#DoctorDiv').selectAll('#scanL').remove();
	d3.select('#DoctorDiv').selectAll('#scanR').remove();
	d3.select('#DoctorDiv').selectAll('#eyeL').transition().duration(0).attr('cy',y(4.3));
	d3.select('#DoctorDiv').selectAll('#eyeR').transition().duration(0).attr('cy',y(4.3));
	var scanL = d3.select('#DoctorDiv').select('svg').selectAll('#scanL').data([0])
				.enter()
				.append('line')
				.attr('id','scanL')
				.attr('x1',x(5.7))
				.attr('y1',y(4.3))
				.attr('x2',x(3))
				.attr('y2',y(4.3))
				.attr("stroke-width", 2)
				.attr("stroke", "black");
				
	var scanR = d3.select('#DoctorDiv').select('svg').selectAll('#scanR').data([0])
				.enter()
				.append('line')
				.attr('id','scanR')
				.attr('x1',x(6.25))
				.attr('y1',y(4.3))
				.attr('x2',x(3))
				.attr('y2',y(4.3))
				.attr("stroke-width", 2)
				.attr("stroke", "black");


	eyeL.transition().duration(scanDuration)
		.attr('cy',y(4.1))
		.on('end', function(){
		  return eyeL.transition().duration(resetDuration).attr('cy',y(4.3));} 
		);
	eyeR.transition().duration(scanDuration)
		.attr('cy',y(4.1))
		.on('end', function(){
		  return eyeR.transition().duration(resetDuration).attr('cy',y(4.3));} 
		);
	
	scanL.transition().duration(scanDuration)
		.attr('y1',y(4.1))
		.attr('y2',y(0))
		.on('end', function(){
		  return scanL.remove();} 
		);
	scanR.transition().duration(scanDuration)
		.attr('y1',y(4.1))
		.attr('y2',y(0))
		.on('end', function(){
			console.log(patientNumber);
			updateTable(patientNumber);
			patientNumber++;						
			d3.selectAll('.patientImg').data(myData.slice(patientNumber),function(d){return d.id;})
				.exit()
				.remove();
			
			d3.selectAll('.patientImg')
				.transition().duration(advanceTime)
				.attr('x', function (d,i){return x(-2.8*(i)+1.5);});
		  return scanR.remove();} 
		);
							
}


d3.select('#DoctorDiv')
	.selectAll("svg")
	.style('width','600px')
	.style('height','240px');