var getRandomColorVal = function () {
	return Math.floor(Math.random() * 255);
}

var decimalToHex = function (num) {
	return num.toString(16).toUpperCase();
}

var hexToDecimal = function (hex1, hex2) {
	var decimalVal;

	// first hex digit times 16
	decimalVal = 16 * parseInt(hex1, 16);

	// plus second hex digit
	decimalVal += parseInt(hex2, 16);

	return decimalVal;
}

var getHexColorVal = function (r, g, b) {
	var hexR1 = decimalToHex(Math.floor(r / 16));
	var hexR2 = decimalToHex(r % 16);
	var hexG1 = decimalToHex(Math.floor(g / 16));
	var hexG2 = decimalToHex(g % 16);
	var hexB1 = decimalToHex(Math.floor(b / 16));
	var hexB2 = decimalToHex(b % 16);

	return "#" + hexR1 + hexR2 + hexG1 + hexG2 + hexB1 + hexB2;
}

$(document).ready(function () {
	var updateColors = function (r, g, b) {
		$("body").css("background-color", "rgb(" + r + "," + g + "," + b + ")");

		$("input[name=red]").val(r);
		$("input[name=green]").val(g);
		$("input[name=blue]").val(b);
		$("input[name=hex]").val(getHexColorVal(r,g,b));
	}

	var randomButtonClick = function () {
		var r = getRandomColorVal();
		var g = getRandomColorVal();
		var b = getRandomColorVal();

		updateColors(r,g,b);
	}

	var rgbChoiceButtonClick = function () {
		var r = $("input[name=red]").val();
		r = r < 256 ? r : 255;
		r = r >= 0 ? r : 0;

		var g = $("input[name=green]").val();
		g = g < 256 ? g : 255;
		g = g >= 0 ? g : 0;

		var b = $("input[name=blue]").val();
		b = b < 256 ? b : 255;
		b = b >= 0 ? b : 0;

		updateColors(r,g,b);
	}

	var hexChoiceButtonClick = function () {
		// this is risky since the # might be deleted
		var hexValue = $("input[name=hex]").val().substring(1);
		
		var hexR1 = hexValue[0];
		var hexR2 = hexValue[1];
		var hexG1 = hexValue[2];
		var hexG2 = hexValue[3];
		var hexB1 = hexValue[4];
		var hexB2 = hexValue[5];

		var r = hexToDecimal(hexR1,hexR2);
		var g = hexToDecimal(hexG1,hexG2);
		var b = hexToDecimal(hexB1,hexB2);

		updateColors(r,g,b);
	}

	$("#random-container").on("click", randomButtonClick);
	$("#rgb-choice-container").on("click", rgbChoiceButtonClick);
	$("#hex-choice-container").on("click", hexChoiceButtonClick);
});