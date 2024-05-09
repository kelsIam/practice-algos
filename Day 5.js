//Merge two sorted linked lists
// Given pointers to the heads of two sorted linked lists, merge them into a single, sorted linked list. Either head pointer may be null meaning that the corresponding list is empty.
// Example: headA refers to 1 --> 3 --> 7 --> NULL
// headB refers to 1 --> 2 --> NULL
// The new list is 1 --> 1 --> 2 --> 3 --> 7 --> NULL
// Complete the mergeLists function: it has the following parameters - singlyLinkedListNode pointer headA (a reference to the head of a list) and singlyLinkedListNode pointer headB (a reference to the head of a list). Returns the singlyLinkedListNode pointer (a reference to the head of the merged list). Input: The first line contains an interger t, the number of test cases - the first line contains an interger n, the length of the first linked list. The next n lines contain an integer each, the elements of the linked list. The next line contains an integer m, the length of the second linked list. The next m lines contain an integer each, the elements of the second linked list.
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
	inputString += inputStdin;
});

process.stdin.on('end', (_) => {
	inputString = inputString
		.replace(/\s*$/, '')
		.split('\n')
		.map((str) => str.replace(/\s*$/, ''));

	main();
});

function readLine() {
	return inputString[currentLine++];
}

const SinglyLinkedListNode = class {
	constructor(nodeData) {
		this.data = nodeData;
		this.next = null;
	}
};

const SinglyLinkedList = class {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	insertNode(nodeData) {
		const node = new SinglyLinkedListNode(nodeData);

		if (this.head == null) {
			this.head = node;
		} else {
			this.tail.next = node;
		}

		this.tail = node;
	}
};

function printSinglyLinkedList(node, sep, ws) {
	while (node != null) {
		ws.write(String(node.data));

		node = node.next;

		if (node != null) {
			ws.write(sep);
		}
	}
}

// Complete the mergeLists function below.
/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(head1, head2) {
	let head, cur;
	head = cur = new SinglyLinkedListNode();

	while (head1 || head2) {
		if ((head1 && !head2) || (head1 && head2 && head1.data < head2.data)) {
			cur.next = head1;
			head1 = head1.next;
		} else if ((!head1 && head2) || (head1 && head2)) {
			cur.next = head2;
			head2 = head2.next;
		}
		cur = cur.next;
	}
	return head.next;
  // recursively:     
  // if (!head1 && !head2) return null;
	// if (head2 && !head1) return head2;
	// if (!head2 && head1) return head1;

	// let isHead1Greater = head1.data > head2.data;

	// return {
	// 	data: isHead1Greater ? head2.data : head1.data,
	// 	next: mergeLists(
	// 		!isHead1Greater ? head1.next : head1,
	// 		isHead1Greater ? head2.next : head2
	// 	),
	// };
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const tests = parseInt(readLine(), 10);

	for (let testsItr = 0; testsItr < tests; testsItr++) {
		const llist1Count = parseInt(readLine(), 10);

		let llist1 = new SinglyLinkedList();

		for (let i = 0; i < llist1Count; i++) {
			const llist1Item = parseInt(readLine(), 10);
			llist1.insertNode(llist1Item);
		}

		const llist2Count = parseInt(readLine(), 10);

		let llist2 = new SinglyLinkedList();

		for (let i = 0; i < llist2Count; i++) {
			const llist2Item = parseInt(readLine(), 10);
			llist2.insertNode(llist2Item);
		}

		let llist3 = mergeLists(llist1.head, llist2.head);

		printSinglyLinkedList(llist3, ' ', ws);
		ws.write('\n');
	}

	ws.end();
}


//Queue using Two Stacks
// A queue is an abstract data type that maintains the order in which elements were added to it, allowing the oldest elements to be removed from the front and new elements to be added to the rear. This is called a First-In-First-Out (FIFO) data structure because the first element added to the queue (i.e., the one that has been waiting the longest) is always the first one to be removed. A basic queue has the following operations: enqueue (add a new element to the end of the queue) and dequeue (remove the element from the front of the queue and return it).
// In this challenege, you must first implement a queue using 2 stacks. Then process q queries, where each query is one of the following 3 types: 1x (enqueue x into the end of the queue), 2 (dequeue the element at the front of the queue) and 3 (print the element at the front of the queue). Input: the first line contaisn as ingle integer,q, denoting the number of queries. Each line i of the q subsequent lines contains a single query in the form described in the problem statement above. All three queries start with an integer denoting the query type, but only query 1 is followed by an additional space-separated value, x, denoting the value to be enqueued. For each query of type 3, print the value of the element at the front of the queue on a new line.
function processData(input) {
	// split input at new line/space and convert string to numbers
	let arr = input.split(/\s/).map((i) => +i);

	let start = 0,
		queue = [];

	for (let i = 1; i < arr.length; i++) {
		switch (arr[i]) {
			case 1:
				queue.push(arr[++i]);
				break;
			case 2:
				start++;
				break;
			case 3:
				console.log(queue[start]);
		}
	}
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
	_input += input;
});

process.stdin.on('end', function () {
	processData(_input);
});


//Balanced Brackets
// A bracket is considered to be any one of the following characters: (, ), {, }, [, or ]. Two brackets are considered to be a matched pair if the an opening bracket (i.e., (, [, or {) occurs to the left of a closing bracket (i.e., ), ], or }) of the exact same type. There are three types of matched pairs of brackets: [], {}, and (). A matching pair of brackets is not balanced if the set of brackets it encloses are not matched. For example, {[(])} is not balanced because the contents in between { and } are not balanced. The pair of square brackets encloses a single, unbalanced opening bracket, (, and the pair of parentheses encloses a single, unbalanced closing square bracket, ]. By this logic, we say a sequence of brackets is balanced if the following conditions are met: it contaisn no unmatched brackets and the subset of brackets enclosed within the confines of a matched pair of brackets is also a matched pair of brackets. Given n strings of brackets, determine whether each sequence of brackets is balanced. If a string is balanced, return YES. Otherwise, return NO.
// Complete the function isBalanced in the editor below. isBalanced has the string s (a string of brackets) as a parameter. Returns either YES or NO (string). Input: The first line contains a single integer n, the number of strings - each of the next n lines contains a single string s, a sequence of brackets. 
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
	inputString += inputStdin;
});

process.stdin.on('end', function () {
	inputString = inputString.split('\n');

	main();
});

function readLine() {
	return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
	// Write your code here
	while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
		s = s.replace(/\(\)/g, '');
		s = s.replace(/\[\]/g, '');
		s = s.replace(/\{\}/g, '');
	}

	return s.length > 0 ? 'NO' : 'YES';
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const t = parseInt(readLine().trim(), 10);

	for (let tItr = 0; tItr < t; tItr++) {
		const s = readLine();

		const result = isBalanced(s);

		ws.write(result + '\n');
	}

	ws.end();
}
