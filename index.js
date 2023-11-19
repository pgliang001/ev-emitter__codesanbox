const Emitter = require("ev-emitter");
const Emitter2 = require("ev-emitter2");

const testCase = (Emitter) => {
  const listener = function () {
    arguments.callee.count = (arguments.callee.count || 0) + 2;
  };
  const listener2 = function () {
    arguments.callee.count = (arguments.callee.count || 0) + 2;
  };

  const emitter = new Emitter();
  emitter.once("call", listener);
  emitter.once("call", listener2);

  // Call first time
  emitter.emitEvent("call");
  console.log("Shoulde be true: ", listener.count === 2);
  console.log("Shoulde be true: ", listener2.count === 2);

  // Call second time
  emitter.emitEvent("call");

  console.log(
    "Shoulde be true: ",
    listener.count === 2,
    ...(listener.count === 2 ? [] : [", but is: ", listener.count]),
  );
  console.log(
    "Shoulde be true: ",
    listener2.count === 2,
    ...(listener2.count === 2 ? [] : [", but is: ", listener2.count]),
  );
};

console.log("\n- Run the origin version");
testCase(Emitter);

console.log("\n- Run the optimized version");
testCase(Emitter2);
