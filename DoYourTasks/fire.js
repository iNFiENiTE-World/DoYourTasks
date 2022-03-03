const Service = require('node-windows').Service;

const svc = new Service ({
    name: "DoYourTasks",
    description: "Localhost:8080",
    script: "E:\\iNFiENiTE\\PROJEK\\X\\DoYourTasks\\DoYourTasks\\app.js"
});

svc.on('install', function () {
    svc.start();
})

svc.install()