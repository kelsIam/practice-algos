//Tree: Preorder Traversal
// Complete the preOrder function in the editor below, which has 1 parameter: a pointer to the root of the binary tree. It must print the values in the tree's preorder traversal as a single line of space-separated values. Input: Our test code passes the root node of a binary tree to the preOrder function. Print the tree's preorder traversal as a single line of space-separated values.
var Tree = function () {
	this.root = null;
};

Tree.prototype.insert = function (node, data) {
	if (node == null) {
		node = new Node(data);
	} else if (data < node.data) {
		node.left = this.insert(node.left, data);
	} else {
		node.right = this.insert(node.right, data);
	}

	return node;
};

var Node = function (data) {
	this.data = data;
	this.left = null;
	this.right = null;
};

/* head ends */

/*
    Node is defined as
    var Node = function(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
*/

// This is a "method-only" submission.
// You only need to complete this method.

function preOrder(root) {
	if (!root) {
		return;
	}

	process.stdout.write(root.data + ' ');
	preOrder(root.left);
  preOrder(root.right);
  // or this one:
      // process.stdout.write(root.data.toString() + ' ');
			// if (root.left) {
			// 	preOrder(root.left);
			// }
			// if (root.right) {
			// 	preOrder(root.right);
			// } 
}

/* tail begins */

process.stdin.resume();
process.stdin.setEncoding('ascii');

var _stdin = '';
var _stdin_array = '';
var _currentline = 0;

process.stdin.on('data', function (data) {
	_stdin += data;
});

process.stdin.on('end', function () {
	_stdin_array = _stdin.split('\n');
	solution();
});

function readLine() {
	return _stdin_array[_currentline++];
}

function solution() {
	var tree = new Tree();
	var n = parseInt(readLine());
	var m = readLine().split(' ').map(Number);
	for (var i = 0; i < n; i++) {
		tree.root = tree.insert(tree.root, m[i]);
	}

	preOrder(tree.root);
}

//Tree: Huffman Decoding
// Huffman coding assigns variable length codewords to fixed length input characters based on their frequencies. More frequent characters are assigned shorter codewords and less frequent characters are assigned longer codewords. All edges along the path to a character contain a code digit. If they are on the left side of the tree, they will be a 0 (zero). If on the right, they'll be a 1 (one). Only the leaves will contain a letter and its frequency count. All other nodes will contain a null instead of a character, and the count of the frequency of all of it and its descendant characters. For instance, consider the string ABRACADABRA. There are a total of 11 characters in the string. This number should match the count in the ultimately determined root of the tree. Our frequencies are A = 5, B = 2, R = 2, C = 1 and D =1. The two smallest frequencies are for C and D, both equal to 1, so we'll create a tree with them. The root node will contain the sum of the counts of its descendants, in this case, 1 + 1 = 2. The left node will be the first character encountered, C, and the right will contain D. Next, we have 3 items with a character count of 2: the tree we jsut created, the character B and the character R. The tree came first, so it will go on the left of our new root node. B will go on the right. Repeat until the tree is complete, then fill in the 1's and 0's for the edges. The finished graph looks like:
// Input characters are only present in the leaves. Internal nodes have a character value of NULL> We can determine that our values for characters are: A - 0, B - 111, C - 1100, D - 1101, R - 10. Our Huffman encoded string is: 01111001100011010111100. To avoid ambiguity, Huffman encoding is a prefix free encoding technique. No codeword appears as a prefix of any other codeword. To decode the encoded string, follow the zeros and ones to a leaf and return the character there. You are given pointer to the root of the Huffman tree and a binary coded string to decode. You need to print the decoded string.
// Complete the function decode_huff in the editor below. It must return the decoded string. It has the root (a reference to the root node of the Huffman tree) and s (a Huffman encoded stirng) as parameters. Input: There is one line of input containing the plain stirng, s. Background code creates the HUffman tree than passes the head node and the encoded string to the function. Output the decoded stirng on a single line.
class Tree {
	constructor(root = null) {
		this.root = root;
	}

	// top down
	insert(value, node = this.root) {
		if (node === null) {
			node = new Node(value);
		} else if (value < node.value) {
			if (node.left === null) {
				node.left = new Node(value);
			} else {
				this.insert(node.left);
			}
		} else if (value > node.value) {
			if (node.right === null) {
				node.right = new Node(value);
			} else {
				this.insert(node.right);
			}
		}
	}
}

class Node {
	constructor(value, freq, left = null, right = null) {
		this.value = value;
		this.freq = freq;
		this.left = left;
		this.right = right;
	}
}

function processData(input) {
	//Enter your code here

	// calculate the frequency of each letter
	const freq = {};
	for (let i = 0; i < input.length; i++) {
		const val = input[i];
		if (freq[val]) {
			freq[val]++;
		} else {
			freq[val] = 1;
		}
	}

	const unsorted = input.split('');
	// sort from least to most frequent
	unsorted.sort((a, b) => freq[a] - freq[b]);
	// create a set, i.e. unique values
	const sortedSet = new Set(unsorted);
	// convert back to array
	let sorted = Array.from(sortedSet);

	// create the huffman tree
	while (sorted.length > 1) {
		const lowestVals = sorted.slice(0, 2);
		sorted = sorted.slice(2);
		let child1 = undefined;
		let child2 = undefined;

		if (typeof lowestVals[0] === 'string') {
			child1 = new Node(lowestVals[0], freq[lowestVals[0]]);
		} else {
			child1 = lowestVals[0];
		}

		if (typeof lowestVals[1] === 'string') {
			child2 = new Node(lowestVals[1], freq[lowestVals[1]]);
		} else {
			child2 = lowestVals[1];
		}

		const combinedFreq = child1.freq + child2.freq;

		let internal = undefined;
		if (child1.freq <= child2.freq) {
			internal = new Node(null, combinedFreq, child1, child2);
		} else {
			internal = new Node(null, combinedFreq, child2, child1);
		}

		// queue
		sorted.unshift(internal);
	}

	// traverse tree postorder to encode
	let encodedChar = '';
	const chars = {};

	const postorder = (root) => {
		if (root.left || root.right) {
			// not a leaf
			encodedChar += '0';
			postorder(root.left);
			// we are moving "up" one level to check right side
			// so remove the last character of the encoded string
			encodedChar = encodedChar.slice(0, encodedChar.length - 1);
			encodedChar += '1';
			postorder(root.right);
			// moving "up" one level again after checking right side
			// so remove the last character again
			encodedChar = encodedChar.slice(0, encodedChar.length - 1);
		} else if (root) {
			// a leaf
			chars[root.value] = encodedChar;
		}
	};

	postorder(sorted[0]);

	// console.log("TREE: ", sorted[0])
	// console.log("ENCODED: ", chars)
	const result = input
		.split('')
		.map((val) => chars[val])
		.join('');
	console.log(result);
} 

//No Prefix Set
// There is a given list of strings where each string contains only lowercase letters from a - j inclusive. The set of strings is said to be a GOOD SET if no string is a prefix of another stirng. In this case, print GOOD SET. Otherwise, print BAD SET on the first line followed by the string being checked. Note - if two strings are identitcal, they are prefixes of each other. 
// Example: words = ['abcd', 'bcd', 'abcde', 'bcde'] - Here, 'abcd' is a prefix of 'abcde' and 'bcd' is a prefix of 'bcde'. Since 'abcde' is tested first, print BAD SET, abcde. words = ['ab', 'bc', 'cd'] - No stirng is a prefix of another so print GOOD SET.
// Complete the noPrefix function. It has a string array of words[n] as a parameter.. Print either GOOD SET or BAD SET (strings). Input: first line contains n, the size of words[], and the next n lines each contain a string, words[i].
'use strict';

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
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

function noPrefix(words) {
	// Write your code here
	const root = { nodes: {} };
	for (const word of words) {
		const letters = word.split('');
		let currentNode = root;
		let unbrokenChain = true;
		for (let i = 0; i < letters.length; i++) {
			const isLastLetter = i === letters.length - 1;
			if (currentNode.nodes[letters[i]]) {
				currentNode = currentNode.nodes[letters[i]];
				if (currentNode.isLeafOfAWord || (isLastLetter && unbrokenChain)) {
					console.log('BAD SET');
					console.log(word);
					return;
				}
				if (isLastLetter) {
					currentNode.isLeafOfAWord = true;
				}
			} else {
				currentNode.nodes[letters[i]] = {
					nodes: {},
					isLeafOfAWord: isLastLetter,
				};
				currentNode = currentNode.nodes[letters[i]];
				unbrokenChain = false;
			}
		}
	}
	console.log('GOOD SET');
}

function main() {
	const n = parseInt(readLine().trim(), 10);

	let words = [];

	for (let i = 0; i < n; i++) {
		const wordsItem = readLine();
		words.push(wordsItem);
	}

	noPrefix(words);
}
