// To be used in conjunction with the Function Library

var s = 0;

function worker() {
	postMessage(s);
	s++;
	setTimeout("worker()",1000);
}

worker();