// PLUS MINUS
//  Given an array of integers, calculate the ratios of its elements that are positive, negativve, and zero. Print the decimal value of each fraction on a new line wiht 6 places after the decimal.
// Ex: arr = [1,1,0,-1,-1]
// There are n = 5 elements, two positive, two negative, and one zero. Their ratios are 2/5 = 0.400000, 2/5 = 0.400000 and 1/5 = 0.200000. Results are printed as: 
// 0.400000
// 0.400000
// 0.200000
// Complete the plusMinus function in the editor below. plusMinus has the following parameter(s): int arr[n]: an array of integers. Print the ratios of positive, negative, and zero values in the array. Each value should be printed on a separate line with 6 digits after the decimal. The function should not return a value.
// Input format: The first line contains an integer, n, the size of the array. The second line contains n space-separated integers that describe arr[n].
'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    // Write your code here
    let positiveCount = 0;
    let negativeCount = 0;
    let zeroCount = 0;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] > 0){
            positiveCount++;
        } else if (arr[i] < 0){
            negativeCount++;
        } else {
            zeroCount++;
        }
    }
    console.log((positiveCount/arr.length).toFixed(6) + ' ');
    console.log((negativeCount/arr.length).toFixed(6) + ' ');
    console.log((zeroCount/arr.length).toFixed(6) + ' ');
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}

// Mini-Max Sum
// Given five positive intergers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum value as a single line of two space-separated long integers.
// Example: arr = [1,3,5,7,9] The minimum sum is 1+3+5+7 = 16, and the maximum sum is 3=5=7+9 = 24. The function print 16 24
// Complete the miniMaxSum function. It has the following parameter - arr: an array of 5 integers. Print two space-separated integers on one line: the minimum sum and the maximum sum of 4/5 elements. Input is a single line of five space-separated integers.
'use strict';

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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */


function miniMaxSum(arr) {
    // Write your code here
    const sum = arr.reduce((accumulator, currentValue) => { return accumulator + currentValue },0);
    const min = sum - Math.max(...arr)
    const max = sum - Math.min(...arr)

console.log(min + " " + max)
}

function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}


// Time Conversion
// Given a time in 12-hour AM/PM format, convert it to miliatary (24-hour) time. Note: 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock. 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.
// Example: s = '12:01:00PM' --> return '12:01:00'
// s = '12:01:00AM' --> return '00:01:00'
//Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format. timeConversion has the following parameter - string s: a time in 12 hour format. Return the string (time) in 24 hour format. Input is a single string s that represents a time in 12-hour clock format (i.e.: hh:mm:ssAM or hh:mm:ssPM)

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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    // Write your code here
    const format = s.slice(-2);
    const splitedTime = s.slice(0,-2).split(':');
    
    if(format == 'PM') {
        if(splitedTime[0] < 12)
            splitedTime[0] = +splitedTime[0] + 12;
    } else {
        if(splitedTime[0] == 12)
            splitedTime[0] = '00';
    }
    return splitedTime.join(':') 
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
