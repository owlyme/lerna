

const createResBody = (data, errcode = 0,  errmsg = "处理成功") => {
    return {
        data,
        errcode,
        errmsg
    }
}

module.exports = {
    createResBody
}