const fs = require("fs");;
const data = require("./data.json");
const createId = () => Date.now();



class Db {
    timer = null;
    data = data || {};

    constructor() {

    }

    createTable(key) {
        if (this.data[key]) return;
        this.data[key] = []
        this.saveData()
    }

    addData(tablekey, data) {
        const id = createId();
        this.data[tablekey].unshift({
            id,
            ...data
        });
        this.saveData()
        return id
    }
    getDetail(tablekey, id) {
        return this.data[tablekey].find((item) => item.id == id)
    }
    getList(tablekey, cb = f => f) {
        if (cb) {
            return this.data[tablekey].filter(item => cb(item))
        }
        return this.data[tablekey]
    }

    remove(tablekey, id) {
        const index = this.data[tablekey].findIndex(item => item.id == id);
        if (index > -1) {
            this.data[tablekey].splice(index, 1);
            this.saveData()
        }

        return index
    }

    update(tablekey, data) {
        const index = this.data[tablekey].findIndex(item => item.id == data.id);
        if (index > -1) {
            this.data[tablekey].splice(index, 1, data);
            this.saveData()
        }
        return data.id
    }

    saveData() {
        if (this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            console.log(JSON.stringify(this.data))
            fs.writeFile(__dirname + "/data.json", JSON.stringify(this.data, null, 2), () => {
                console.log("done")
            })
        }, 300)
    }

    findById(tablekey, id) {
        return this.data[tablekey].find(item => item.id == id)
    }
}


module.exports = new Db()