
var Person = function(firstAndLast) {
  var names = firstAndLast.split(" ");
  this.getFirstName =  function(){
  		return names[0];
  };
  this.getLastName = function () {
  	// body...
  		return names[1];
  };
  this.getFullName = function () {
  	// body...  	
  		return names.join(" ");
  };
  this.setFirstName = function (first) {
  	// body...
    names[0] = first;
  };
  this.setLastName = function (last) {
  	// body...
    names[1] = last;
  };
  this.setFullName = function (firstAndLast) {
  	// body...
    names = firstAndLast.split(" ");
  };

};

var bob = new Person('Bob Ross');
bob.getFullName();