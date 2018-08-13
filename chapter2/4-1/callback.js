const fs = require("fs");

let data1 = fs.readFileSync("./mock.txt");

console.log(data1.toString());

let data2 = fs.readFile("./mock.txt", (err, data3) => {
    console.log("data3 ++++");
    console.log(data3.toString());
});

console.log(data2);

function my_async_function(name, fn) {
    setTimeout(() => {
        fn(null, "-" + name + "-");
    }, 3000);
}

my_async_function("hello node.js", (err, name) => {
    if (err) {
        console.error(err);
    }
    console.log(name);
});
