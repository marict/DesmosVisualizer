var data = null
var elt;
var calculator;

window.onload = function() {
	
	getData()
	var visualizer = document.getElementById("visualizer");
	
	elt = document.getElementById('calculator');
	calculator = Desmos.Calculator(elt);
	alert(calculator.expressions)
	window.setInterval(graphText,100)
	

	
}

function graphText() {
	
	
	if(data) {
		
		var input = data[1]/50
		if(data[1] > 10) {
			var latex = "y > sin(" + input + "x)"
			calculator.removeExpression({id : "graph1"});
			calculator.setExpression({
				id:'graph1', 
				latex:latex,
				color: '#ff0000'
			});	
		}
		
	}
	
	

	
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
		
		
		var visualizer = document.getElementById("visualizer")
		visualizer.style.height = frequencyData[1]+"px"
		data = frequencyData
		//console.log(data)
		
		
	}
	

	
	audio.play();
	renderFrame();

}
