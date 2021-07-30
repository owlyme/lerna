const http = require('http')
const fs = require('fs')
const path = require("path")


function upload ({
    name = '',
    filePath = ''
}) {
    if (!fs.existsSync(filePath)) {
        return console.log(`${filePath} 不存在`)
    }
    const fileName = name || path.parse(filePath).base
    const boundaryKey = '----WebKitFormBoundary' + new Date().getTime();
    const req = http.request({
        host: '127.0.0.1',
        port: 4000,
        method: 'POST',
        path: '/upload',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + boundaryKey
        }
    }, (res) => {
        res.setEncoding('utf8');
        const chunks = []
        res.on('data', (chunk) => {
            console.log(chunks)
            chunks.push(chunk)
        });

        res.on('end', () => {
            console.log(fileName + '上传成功' );
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(
        '--' + boundaryKey + '\r\n' +
        'Content-Disposition: form-data; name="file"; filename='+ fileName +'\r\n' +
        'Content-Type:application/*\r\n\r\n'
    );

    var fileStream = fs.createReadStream(path.resolve(process.cwd(), filePath), { bufferSize: 1024 * 1024 * 50 });
    fileStream.pipe(req, { end: false });
    
    fileStream.on('end', function () {
        req.end('\r\n--' + boundaryKey + '--');
    });
}

// upload({
//     name: '',
//     filePath: './abc.js'
// })


module.exports = upload