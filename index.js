const Rx = require('rxjs/Rx');
const operators = require('rxjs/operators');
const {
    mapTo,
    delay
} = operators;

var observable = Rx.Observable.from([1, 2, 3, 4]);
