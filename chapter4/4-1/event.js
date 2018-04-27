class Evente {
    constructor() {
        this.map = {};
    }
    add(name, fn) {
        if (this.map[name]) {
            this.map[name].push(fn);
            return;
        }

        this.map[name] = [fn];
        return;
    }

    emit(name, ...args) {
        this.map[name].forEach(fn => {
            fn(...args);
        });
    }
}

let e = new Evente();
e.add("hello", (err, name) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(name);
});

e.emit("hello", "发生了错误");
e.emit("hello", null, "hello nodejs");

class ChainEvente {
    constructor() {
        this.map = {};
    }
    add(name, fn) {
        if (this.map[name]) {
            this.map[name].push(fn);
            return;
        }

        this.map[name] = [fn];
        return this;
    }

    emit(name, ...args) {
        this.map[name].forEach(fn => {
            fn(...args);
        });
        return this;
    }
}

let e2 = new ChainEvente();

const fs = require("fs");

// 不用匿名函数
function readFn(err, data) {
    console.log(data.toString);
}
fs.readFile("mock.txt", readFn);

// 事件形式
let e2 = new ChainEvente();
e2.add("readFn", readFn);
fs.readFile("mock.txt", (err, data) => {
    e2.emit("readFn", err, data);
});
