class Pet {
  constructor(type, legs) {
    this.type = type;
    this.legs = legs;
  }

  /*
  logInfo = () => {
    console.log(this === myCat); // => true
    console.log(`The ${this.type} has ${this.legs} legs`);
  }
  */

  logInfo() {
    console.log(this === myCat); // => true
    console.log(`The ${this.type} has ${this.legs} legs`);
  }
}

const myCat = new Pet('Cat', 4);
// logs "The Cat has 4 legs"

// wrong: "The undefined has undefined legs"
// setTimeout(myCat.logInfo, 1000);

// way one: bind myCat instance
setTimeout(myCat.logInfo.bind(myCat), 1000);

//way two: use arrow function
// setTimeout(myCat.logInfo, 1000);

//way three: try call-- not working: got invalid callback error,  callback must be a function
// setTimeout(myCat.logInfo.call(myCat), 1000);
