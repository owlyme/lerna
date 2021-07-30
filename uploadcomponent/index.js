const fs = require('fs')
const path = require('path')
const upload = require("./upload")


const dirpath = path.join(__dirname, '../packages')
const list = fs.readdirSync(path.join(__dirname, '../packages') )

function getCompFilePath(list, dirpath) {
    list.forEach((p1) => {
        const distpath= path.join(dirpath, p1, "dist")

        fs.stat(distpath, (err, stats) => {
            if (err) return console.log(distpath + ' 不存在');

            if (stats.isDirectory()) {
               fs.readdirSync(distpath).forEach(filepath => {
                //    console.log(distpath, filepath)

                   upload({
                       name: filepath,
                       filePath: path.join(distpath, filepath)
                   })
               });
            }

        });
    })
}

getCompFilePath(list, dirpath)
