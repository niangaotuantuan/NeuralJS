define(function(){
	/**
    * Create Matrix with extended PLU and MUL methods.
    * @version 0.1.0 (2012/11/21)
    */
	var Matrix = function() {
		var args = [].slice.call(arguments);	
		if (!(args[0] instanceof Array)) {
			throw new Error('Invalid Matrix.');
		}
		if (args[0].length) {
			//check whether every array same length
			for ( var i = 0; i < args[0].length; ++i) {
				if (i === 0) {
					len = args[0][i].length;
				} else if (args[0][i].length !== len) {
					throw new Error('Invalid Matrix Array.');
				}
			}
		}
		this.row = args[0].length;
		this.col = args[0][0].length ? args[0][0].length : 1;
		for (var i = 0; i < args[0].length; ++i ) {
			this[i] = args[0][i];
		}
		return this;
	};
	Matrix.prototype = Object.create(Array.prototype);
	Matrix.prototype.PLU = function(m){
		var matrix;
		if (!(m instanceof Matrix)){
			matrix = new Matrix(m);
		} else {
			matrix = m;
		}
		if (!(matrix.row === this.row && matrix.col === this.col)) {
			throw new Error('Invalid Matrix size.');
		}
		var res = matrix;
		for (var i = 0; i < matrix.row; ++i){
			for (var j = 0; j < matrix.col; ++j){
				res[i][j] = Number(matrix[i][j]) + Number(this[i][j]);
			}
		}
		return res;
	};
	Matrix.prototype.MUL = function(m){
		var matrix;
		if (!(m instanceof Matrix)){
			matrix = new Matrix(m);
		} else {
			matrix = m;
		}
		if (matrix.row !== this.col) {
			throw new Error('Invalid Matrix size.');
		}
		var arr = [];
		for (var i = 0; i < this.row; ++i) {
			arr[i] = [];
			for (var j = 0; j < matrix.col; ++j) {
				arr[i][j] = 0;
				for (var k = 0; k < this.col; ++k) {
					arr[i][j] += Number(this[i][k]) * Number(matrix[k][j]);
				}
			}
		}
		var res = new Matrix(arr);
		return res;
	};
	
	return Matrix;
});