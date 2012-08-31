Array.prototype.PLU = function(arr){
    var res = [];
    for ( var r = 0; r < this.length; r++ ){
        this[r].length === undefined?
            res[r] = Number(this[r]) + Number(arr[r]):
            res[r] = this[r].PLU(arr[r]);
    }
    return res;
};
Array.prototype.MUL = function(arr){
    var res = [],
        row = this.length,
        clo = arr[0].length?arr[0].length:1,
        mem = this[0].length; 
    for( var r = 0; r < row; r++ ){
        res[r] = [];
        for ( var c = 0; c < clo; c++){
            res[r][c] = 0;
            for( var m = 0; m < mem; m++ ){
                res[r][c] += Number(this[r][m]) * Number(arr[m][c]);
            }
        }
    }
    return res;
};
var Neural = function( w, b ){
    this.weight = w;
    this.bias = b;
    this.transfer = function( input ){
        return input >= 0? 1: 0;
    }
}
Neural.prototype = {
    setWeight: function( w ){
        this.weight = w;
        return;
    },
    setBias: function( b ){
        this.bias = b;
        return;
    },
    setTransfer: function ( func ){
        this.transfer = func;
        return;
    },
    sensor: function( input ){
        return this.transfer(input.MUL( this.weight ).PLU( this.bias ));
    },
    learning: function( input, target ){
        var output = this.sensor( input );
        if (output!==target) {
            this.weight = this.weight.PLU( [[target-output]].MUL(input) );
            return 0;
        } else {
            return 1;
        }
    }
}

var n = new Neural ( [[0],[1],[0]], [[-1]] );
o1 = n.sensor ( [[0,1,1]] );
o2 = n.sensor ( [[0,0,1]] );
console.log(o1);
console.log(o2);
