async function func() {
    return 2;
}

func().then(console.log);

const getPosts = () =>
    new Promise((resolve, reject) => {
        resolve([
            {
                name: "a"
            },
            {
                name: "b"
            },
            {
                name: "c"
            },
            {
                name: "d"
            }
        ]);
    });

async function func2() {
    try {
        const number = await func();
        const posts = await getPosts();
        console.log(number);
        console.log(posts);
    } catch (e) {
        console.log(e);
    }
}

func2();

const fs = require("fs");

const readFilePromise = filename =>
    new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

async function main() {
    const txt = await readFilePromise("mock.txt");
    console.log(txt.toString());
}

main();
