var data = null
var elt;
var calculator;

window.onload = function() {
	
	getData()
	var visualizer = document.getElementById("visualizer");
	
	elt = document.getElementById('calculator');
	calculator = Desmos.Calculator(elt);
	window.setInterval(graphText,100)
	

	
}

// Look for dominant frequency.
function graphText() {
	
	console.log("max = " + Array.max(data))
	console.log("data =" + data[1])
	if(data) {
		
		var input = Array.max(data)/5
		var input2 = (data[1])/5
		var input3 = (data[500])/5
		var input4 = (data[1000])/5
		console.log(input)
		var latex = "y^2 + x^2 = INPUT"
		graph(latex,input,1)
		graph(latex,input2,2)
		graph(latex,input3,3)

	}
	
	

	
}

function graph(latex,input,id) {
	
	latex = latex.replace("INPUT",input)
	calculator.removeExpression({id : "graph" + id});
	calculator.setExpression({
		id:'graph'+ id, 
		latex:latex,
		color: '#ff0000'
	});
	
}

// Finds max in array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

function getData() {
	
	var ctx = new AudioContext();
	var audio = document.getElementById('myAudio');
	var audioSrc = ctx.createMediaElementSource(audio);
	var analyser = ctx.createAnalyser();
	// we have to connect the MediaElementSource with the analyser 
	audioSrc.connect(analyser);
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

	audioSrc.connect(ctx.destination);
	// frequencyBinCount tells you how many values you'll receive from the analyser
	var frequencyData = new Uint8Array(analyser.frequencyBinCount);

	var i = 0
	// we're ready to receive some data!
	// loop
	function renderFrame() {
		
		requestAnimationFrame(renderFrame);
		// update data in frequencyData
		
		analyser.getByteFrequencyData(frequencyData);
		// render frame based on values in frequencyData
		
		
		var visualizer = document.getElementById("visualizer")
		visualizer.style.height = frequencyData[1]+"px"
		data = frequencyData
		//console.log(data)
		
		
	}
	

	
	audio.play();
	renderFrame();

}
