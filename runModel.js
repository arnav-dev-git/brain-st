const fs = require('fs');
const {exec} = require("child_process");

const fileName = "model.py";

const runModel = async (input) => {               
    return new Promise((resolve, reject) => {
        exec(
            // "python3 " + fileName,
            "py -3 " + fileName + " " + input.join(","),
            { timeout: 10000 },
            (err, stdout, stderr) => {
                if (err) {
                    console.error("Exec error => ", err);
                    reject({
                        err: true,
                        output: err,
                        error: stderr,
                    });
                }
                console.log("OP:", stdout);
                resolve({
                    err: false,
                    output: stdout,
                });
            }
        );
    })
};

module.exports = runModel;