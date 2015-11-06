var data = null
var elt;
var calculator;

window.onload = function() {
	
	button = document.getElementById("button")
	button.onclick = beginVis
	
}

beginVis = function() {
	
	button = document.getElementById("button")
	button.parentNode.removeChild(button)
	
	getData()
	var visualizer = document.getElementById("visualizer");
	
	elt = document.getElementById('calculator');
	calculator = Desmos.Calculator(elt);
	window.setInterval(graphText,100)
	var latex = "y > -1000"
	graph(latex,1,1)

	
}

// Look for dominant frequency.
function graphText() {
	
	if(data) {
		
		var input = Array.max(data)
		var input2 = (data[200])
		var input3 = (data[500])
		
		
		var latex1 = "(y-0.5)^2 + x^2 <= INPUT/3"
		var latex2 = "(y-0.5)^2 + x^2 <= INPUT/10"
		var latex3 = "(INPUT/90* x^2 + INPUT/90* y^2 -30)^3 - INPUT/4 * x^2*y^3 = 0"
		
	
		//graph(latex1,input,1)
		//graph(latex1,input2,2,"#FF0000")
		//graph(latex1,input3,3,"#FF0000")
		
		
		graph(latex1,input,4)
		graph(latex2,input2,5,"#FF0000")
		graph(latex2,input3,6,"#FF0000")
		graph(latex3,input,7)
		graph(latex4,input,8)
		
	
		
	}
	
	

	
}

function graph(latex,input,id,color) {
	
	if(!color) {
		color = '#000000'
	}
	
	latex = replaceAll(latex,"INPUT",input)
	calculator.removeExpression({id : "graph" + id});
	calculator.setExpression({
		id:'graph'+ id, 
		latex:latex,
		color: color
	});
	
}

// Finds max in array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

// Replaces a part of a string 
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

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
		
		
		data = frequencyData
		//console.log(data)
		
		
	}
	

	
	audio.play();
	renderFrame();

}
