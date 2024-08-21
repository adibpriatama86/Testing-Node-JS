const http = require('http');
const rupiah = require('rupiah-format');
const fs = require('fs');
const os = require('os');
const host = '127.0.0.1';
const port = 3002;

// request = data masuk dari luar
// response = data keluar dari sistem
const server = http.createServer(function (request, response) {
    const nama = "Adib Priatama";
    let uang = 1000000;
    let jajan = 750000;
    let sisa = uang - jajan;

    uang = rupiah.convert(uang)
    jajan = rupiah.convert(jajan)
    sisa = rupiah.convert(sisa)

    fs.appendFile('sisaUang.txt', sisa, () => {
        console.log('Data uang berhasil disimpan')
    })

    const sisaRAM = os.freemem();
    const jumlahCPU = os.cpus();

    function checkCPU() {
        let myCPU = [];
        jumlahCPU.map((cpu, i) => {
            myCPU.push(cpu.model)
        })
        return myCPU[0];
    }

    const hasil = `
    <head>
        <title>Hasil Belanja</title>
    </head>
    <body>
        <h1 style='background: tomato; color: white; border-radius: 25px; text-align: center'>Hasil Belanja</h1>
        <p>Halo nama saya <i>${nama}</i>, saya jajan sebanyak ${jajan}. Uang saya awalnya sejumlah ${uang}, maka sisa uang saya adalah ${sisa}.<p>
        <h5>Sisa RAM saya adalah ${sisaRAM}.</h5>
        <h5>Merk CPU saya adalah ${checkCPU()}.</h5>
    </body>
    `

    response.statusCode = 203;
    response.end(hasil);
});

server.listen(port, host, '', function () {
    console.log(`server menyala di ${host}:${port} ☠️`);
});