//Lonely Integer
// Given an array of integers, where all elements but one occur twice, find the unique element.
// Example: a = [1,2,3,4,3,2,1], the unique element is 4. 
// Complete the lonelyInteger function in the editor below. lonelyInteger has the following parameter - int a[n]: an array of integers. Return an int: the element that occurs only once. Input: the first line contains a single integer, n, the number of integer in the array and the second line contains n space-separated integers that describe the values in a. It is guaranteed that n is an odd number and that there is one unique element: 1<n<100 and 0<a[i]<100 where 0<i<n

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a) {
    // Write your code here
    let cache = {};
    for (let i = 0; i < a.length; i++){
        if (cache[a[i]]){
            cache[a[i]]++;
        } else {
            cache[a[i]] = 1;
        }
    }
    for (let key in cache){
        if(cache[key] === 1){
            return key;
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = lonelyinteger(a);

    ws.write(result + '\n');

    ws.end();
}

//Diagonal Difference
// Given a square matrix, calculate the absolute difference between the sums of its diagonals.
// Example: the square matrix arr is shown below:
// 1 2 3
// 4 5 6
// 9 8 9
// The left to right diagonal = 1 + 5+ 9 = 15. The right to left diagonal = #+5+9 = 17. Their absolute difference is |15 - 17| = 2.
// Complete the diagonalDifference function in the editor below. diagonalDifference takes the following parater int arr[n][m]: an array of integers. Return the int: the absolute diagonal difference. The input: first line contains a single integer, n, the number of rows and columns in the square matrix arr, each of the next n lines describes a row, arr[i], and consists of n space-separated integers arr[i][j].

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
    // Write your code here
    let leftNum = 0;
    let rightNum = 0;
    for(let i = 0; i < arr.length; i++){
        const item = arr[i]
        leftNum += item[i]
        rightNum += item[item.length - i - 1]
    }
    return Math.abs(leftNum - rightNum)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}


//Counting Sort 1
// Comparison Sorting: Quicksort usually has a running time of n x log(n), but is there an algorithm that can sort even faster? In general, this is not possible. Most sorting algorithms are comparison sorts, i.e. they sort a list just by comparing the elements to one another. A comparison sort algorithm cannot beat n x log(n) (worst-case) running time, since n x log(n) represents the minimum number of comparisons needed to know where to place each element. For more details, you can see these notes (PDF). https://www.cs.cmu.edu/~avrim/451f11/lectures/lect0913.pdf 
// Alternative Sorting: Another sorting method, the counting sort, does not require comparison. Instead, you create an integer array whose index range covers the entire range of values in your array to sort. Each time a value occurs in the original array, you increment the counter at that index. At the end, run through your counting array, printing the value of each non-zero valued index that number of times.
// Ex: arr = [1,1,3,2,1], all of the values are in the range [0...3], so create an array of seros, result = [0,0,0,0]. The reuslts of each iteration follow:
// i arr[i] result
// 0  1     [0,1,0,0] 
// 1  1     [0,2,0,0]
// 2  3     [0,2,0,1]
// 3  2     [0,2,1,1]
// 4  1     [0,3,1,1]
// The frequency array is [0,3,1,1]. These values can be used to create the sorted array as well: sorted = [1,1,1,2,3]
// For this exercise, always return a frequency array with 100 elements. The example above shows only the first 4 elements, the remainder being zeros. 
// Given a list of integers, count and return the number of times each value appears as an array of integers. Complete the countingSort function which has the following parameter arr[n]: an array of integers. Returns int[100]: a frequency array. Input - the first line contains an integer n, the number of items in arr. Each of the next n lines ocntains an integer arr[i] where 0<i<n.

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'countingSort' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function countingSort(arr) {
    // Write your code here
    let counterArray = Array(100).fill(0);
    for (let number of arr) {
        counterArray[number]++
    }
    return counterArray;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = countingSort(arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
