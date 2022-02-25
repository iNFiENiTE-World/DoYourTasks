/*
1. AIM
✓ Experiment ways to run Node.js server automatically


2. PROBLEM
Node.js is the ultimate backend framework that'd make accessing file system and displaying data or even
working with database possible in JS language. The only problem is Node.js needs to run on a server which 
means everytime we want to use the server, it has to be manually run.


3. SOLUTIONS
Make the server run automatically

a) Use node-windows module
The node-windows module installs Node.js file in the computer Services. This means that, the Node.js server will
be run automatically whenever we are using the computer. This is exactly what node-windows does, install a file
into the Services.

b) Use PM2 module
PM2 is a daemon process manager that will help you manage and keep your application online. It offers instutive
CLI and is very developer friendly. It is easy to learn and use. It can run Node.js server, stop it, list running
server and more by just using CLI. This offers a wide ranges of control and not to forger, does the thing we need,
server-run automation.


4. PROTOTYPES
~1st Prototype (a)
See code below
*/

var Service = require('node-windows').Service;

// Create a new Service object
var svc = new Service({
    name: "Hello World with HTTP Full Automation", // Service name
    description: "Node.js run server automatically!", // Service desripction
    script: "E:\\iNFiENiTE\\PROJEK\\Sendiri\\JSPY\\DoYourTask\\prototype\\experiment4\\http.js" // Service sripts to be run
});

// Listen for the 'install; event, which indicates
// the process is available as service
svc.on('install',function(){
    svc.start(); // #<-- Does not work for unknown reason
});

svc.install();

/*
From the result of 1st Prototype, it is seen that node-windows installs the Node.js file and run
it as a service inside Services. Though, there is unknown problem with the event emitter. So,
we have to manually start the Service by opening Services, navigate to this service and starts it
only at first run. And from there on, it is officially run automatically in the Service.


b)
~2nd Prototype (b)
See CLI command below

pm2 start http.js --watch ~ to start running server and automatically restart when changes happen to the file
pm2 save


Result of 2nd Prototype shows that file is run on the server contionouosly, but one problem arises. When we
restart the computer or start the computer, the command needs to be rerun to make the server run again. I believe
there is a specific way to use this module to achieve server automation but for my knowledge now, I can't make
the server run automatically.


5. CONCLUSION
The best solution is node-windows that can make server up and running automatically in simple and shot process.
Due to limitation in knowledge and time, I can't make use of pm2 to its highest reach and can't make the
automation possible. Thus, node-windows module is used to run this server automatically.


END OF EXPERIMENT
*/