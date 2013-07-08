
function merge(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function CanvasRenderer(canvas_id) {

	this.canvas_id = canvas_id;
	this.canvas    = document.getElementById(this.canvas_id);
	
	var _width 	   = this.canvas.width;
	var _height    = this.canvas.height;

	var _context2d = this.canvas.getContext("2d");
	var _imageData = _context2d.createImageData(_width, _height);

	var thisCanvasRenderer = this;

	// "Constructor"
	_context2d.lineWidth = 2;
	_context2d.translate(0.5, 0.5);

	// Methods
	this.get = function(var_name) {
		return eval('_'+var_name);
	}
	this.set = function(var_name, value) {
		return eval('_'+var_name+' = '+value);
	}

	this.line = function(x0, y0, x1, y1) {
		_context2d.beginPath();
		_context2d.moveTo(x0, y0);
		_context2d.lineTo(x1, y1);
		_context2d.stroke();
		_context2d.closePath();
	}

	this.setPixel  = function(x, y, r, g, b, a) {
	    var index = (x + y * _imageData.width) * 4;
	    var img_data = _imageData.data;
	    img_data[index+0] = r | 0;
	    img_data[index+1] = g | 0;
	    img_data[index+2] = b | 0;
	    img_data[index+3] = a ? a : 255;

	    return this;
	}

	this.apply = function() {
		_context2d.putImageData(_imageData, 0, 0);

		return this;
	}
}
