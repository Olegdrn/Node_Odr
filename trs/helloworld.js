const colors = require("colors/safe");
const list = [];
list.push(2);
let a = +process.argv[2];
let b = +process.argv[3];
console.log(typeof a);
console.log(typeof b);

// console.log(colors.green(a));
// console.log(colors.yellow(b));
for (let i = a; i <= b; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j === 0 || i % 9 === 0) {
            break;
        }
        else list.push(i)
        break
    }
}
// else console.log(colors.red('incorrect value'));
if (a > 2) {
    list.shift();
}
if (list.length < 1) {
    console.log(colors.red('There are no the simple numbers'));
}


console.log(colors.green(list[0]));
console.log(colors.yellow(list[1]));
console.log(colors.red(list[2]));
console.log(colors.bold(list));