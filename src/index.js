#!/usr/bin/env node

'use strict';

var isPiModule = require('detect-rpi');

var isWin         = /^win/.test(process.platform);
var isRaspberryPi = isPiModule();


function require2(moduleName) {
	var pat;
	if (isWin) {
		pat = "require(process.cwd() + " + "'\\\\node_modules\\\\" + moduleName + "');";
	} else {
	    pat = "require(process.cwd() + " + "'/node_modules/" + moduleName + "');";
	}

	//console.log('PATH: ' + pat);
	//console.log('    MODULE PATH: ' + process.cwd() + '/node_modules/' + moduleName);
    var reac = eval(pat);
	return reac;
};

var fs              = require('fs');
var path            = require('path');
var mkdirp          = require('mkdirp')
var rmdir           = require('rmdir-sync');
const uuidv1        = require('uuid/v1');
var fork            = require('child_process');
var drivers         = new Object();
var connections     = new Object();
var queries         = new Object();
var express         = require('express')
var app             = express()
var expressWs       = require('express-ws')(app);
var request         = require("request");
var open            = require('open');
var db_helper       = require("./db_helper")
var perf            = require('./perf')
var Excel           = require('exceljs');
var compression     = require('compression')
var crypto          = require('crypto');
var dns             = require('dns');
var url             = require('url');
var net             = require('net');
var unzip           = require('unzip');
var postgresdb      = require('pg');
var ip              = require("ip");
var program         = require('commander');
var os              = require('os')
var bodyParser      = require('body-parser');
var multer          = require('multer');
var upload          = multer( { dest: 'uploads/' } );
var diff            = require('deep-diff').diff
var XLSX            = require('xlsx');
var csv             = require('fast-csv');
var mysql           = require('mysql');
var cors            = require('cors')
var mammoth         = require("mammoth");
var isBinaryFile    = require("isbinaryfile");

path.join(__dirname, '../public/jquery-1.9.1.min.js')
path.join(__dirname, '../public/jquery.zoomooz.js')
path.join(__dirname, '../public/alasql.min.js')
path.join(__dirname, '../public/polyfill.min.js')
path.join(__dirname, '../src/oracle.js')
path.join(__dirname, '../src/sqlite.js')
path.join(__dirname, '../src/mysql.js')
path.join(__dirname, '../src/testdriver.js')
path.join(__dirname, '../src/postgres.js')
path.join(__dirname, '../src/word.js')
path.join(__dirname, '../src/pdf.js')
path.join(__dirname, '../src/excel.js')
path.join(__dirname, '../src/csv.js')
path.join(__dirname, '../src/txt.js')
path.join(__dirname, '../src/glb.js')
path.join(__dirname, '../src/child.js')
path.join(__dirname, '../public/gosharedata_setup.js')
path.join(__dirname, '../public/intranet.js')
path.join(__dirname, '../public/tether.min.js')
path.join(__dirname, '../public/bootstrap.min.js')
path.join(__dirname, '../public/bootstrap.min.css')
path.join(__dirname, '../public/aframe.min.js')
path.join(__dirname, '../public/es6-shim.js')
path.join(__dirname, '../public/vue_app.css')
path.join(__dirname, '../public/dist/build.js')
//path.join(__dirname, '../oracle_driver.zip')
path.join(__dirname, '../public/visifile_logo.PNG')
path.join(__dirname, '../public/VisiFileColor.png')
path.join(__dirname, '../public/VisiFileColorHoriz.png')
path.join(__dirname, '../public/favicon.ico')
path.join(__dirname, '../public/driver_icons/excel.jpg')
path.join(__dirname, '../public/driver_icons/csv.jpg')
path.join(__dirname, '../public/driver_icons/txt.jpg')
path.join(__dirname, '../public/driver_icons/oracle.jpg')
path.join(__dirname, '../public/driver_icons/postgres.jpg')
path.join(__dirname, '../public/driver_icons/mysql.jpg')
path.join(__dirname, '../public/driver_icons/sqlite.jpg')
path.join(__dirname, '../public/driver_icons/word.jpg')
path.join(__dirname, '../public/driver_icons/pdf.jpg')
path.join(__dirname, '../public/driver_icons/glb.jpg')
path.join(__dirname, '../public/index_pc_mode.html')
path.join(__dirname, '../public/dropzone.js')
path.join(__dirname, '../public/dropzone.css')
path.join(__dirname, '../public/locked.png')
path.join(__dirname, '../public/unlocked.png')
path.join(__dirname, '../public/visifile/list_intranet_servers.html')
path.join(__dirname, '../public/list_intranet_servers.html')
path.join(__dirname, '../public/\aframe_fonts/Roboto-msdf.json')
path.join(__dirname, '../public/\aframe_fonts/Roboto-msdf.png')
path.join(__dirname, '../public/\aframe_fonts/Aileron-Semibold.fnt')
path.join(__dirname, '../public/\aframe_fonts/Aileron-Semibold.png')
path.join(__dirname, '../public/\aframe_fonts/SourceCodePro.fnt')
path.join(__dirname, '../public/\aframe_fonts/SourceCodePro.png')


if (!fs.existsSync(process.cwd() + "/public") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../public")  , process.cwd() ); }

if (!fs.existsSync(process.cwd() + "/node-viewerjs") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node-viewerjs")  , process.cwd() ); }

if (!fs.existsSync(process.cwd() + "/node_modules") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_modules")  , process.cwd() ); }

if (!fs.existsSync(process.cwd() + "/node_modules/nan") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_modules/nan")  , process.cwd() + "/node_modules" ); }

if (!fs.existsSync(process.cwd() + "/node_modules/sqlite3") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_modules/sqlite3")  , process.cwd() + "/node_modules" ); }

if (!fs.existsSync(process.cwd() + "/node_modules/pdf2json") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_modules/pdf2json")  , process.cwd() + "/node_modules" ); }

if (!fs.existsSync(process.cwd() + "/node_macos64") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_macos64")  , process.cwd() ); }

if (!fs.existsSync(process.cwd() + "/node_win32") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_win32")  , process.cwd() ); }


if (!fs.existsSync(process.cwd() + "/node_pi") ) {
    copyFolderRecursiveSync(path.join(__dirname, "../node_pi")  , process.cwd() ); }




if (isWin) {
    //console.log('******* WINDOWS *******');
	// copy WIndows 32 node native files
	copyNodeNativeAdapter( "win32", "sqlite3", 		"lib/binding/node-v57-win32-ia32" , "node_sqlite3.node")



} else if (isRaspberryPi) {
    //console.log('******* PI *******');
	// copy Raspberry PI ARM node native files
	copyNodeNativeAdapter( "pi", "sqlite3", 	"lib/binding/node-v48-linux-arm" , "node_sqlite3.node")



} else { //means Mac OS
    //console.log('******* MAC *******');
	// copy Mac OS 64 node native files
	copyNodeNativeAdapter( "macos64", "sqlite3", 	"lib/binding/node-v57-darwin-x64" , "node_sqlite3.node")
}



var timeout                             = 0;
var port;
var hostaddress;
var typeOfSystem;
var centralHostAddress;
var centralHostPort;

var stmt2                               = null;
var stmt3                               = null;
var setIn                               = null;
var stopScan                            = false;
var inScan                              = false;
var numberOfSecondsAliveCheck           = 60;
var username                            = "Unknown user";
var serverwebsockets                    = [];
var portrange                           = 3000
var dbsearch;
var requestClientInternalHostAddress    = '';
var requestClientInternalPort           = -1;
var requestClientPublicIp               = '';
var requestClientPublicHostName         = '';
var locked;
var requestClientPublicIp;
var hostcount  							= 0;
var forked;
var forkedIndexer;
var forkedFileScanner;
var queuedResponses                     = new Object();
var queuedResponseSeqNum                = 0;




app.use(compression())
rmdir("uploads");
mkdirp.sync("uploads");
mkdirp.sync("files");



program
  .version('0.0.1')
  .option('-t, --type [type]', 'Add the specified type of app (client/server) [type]', 'client')
  .option('-p, --port [port]', 'Which port should I listen on? (default 80) [port]', parseInt)
  .option('-h, --host [host]', 'Server address of the central host (default visifile.com) [host]', 'visifile.com')
  .option('-l, --locked [locked]', 'Allow server to be locked/unlocked on start up (default true) [locked]', 'true')
  .option('-s, --hostport [hostport]', 'Server port of the central host (default 80) [hostport]', parseInt)
  .parse(process.argv);


locked = (program.locked == 'true');
port = program.port;
if (!isNumber(port)) {
    port = 80;
};

outputToConsole('VisiFile node local hostname: ' + ip.address() + ' ')

setupVisifileParams();

//console.log(" ");
//console.log("-----------------------------------------------------------------------");
//console.log("                         Starting VisiFile ");
//console.log("-----------------------------------------------------------------------");

//console.log(" ");
//console.log(" ");
//console.log(" ");
//console.log("-----------------------------------------------------------------------");
//console.log("                 This takes about 2 minutes the first time");
//console.log("-----------------------------------------------------------------------");
//console.log(" ");


var PDFParser       = require2("pdf2json");
var sqlite3         = require2('sqlite3');

username = os.userInfo().username.toLowerCase();
dbsearch = new sqlite3.Database(username + '.vis');
//dbsearch.run("PRAGMA journal_mode=WAL;")
dbsearch.run("PRAGMA synchronous=OFF;")
dbsearch.run("PRAGMA count_changes=OFF;")
dbsearch.run("PRAGMA journal_mode=MEMORY;")
dbsearch.run("PRAGMA temp_store=MEMORY;")

//console.log("... ");

setupChildProcesses2();









function setupVisifileParams() {
    typeOfSystem = program.type;
    centralHostAddress = program.host;
    centralHostPort = program.hostport;
    if (!isNumber(centralHostPort)) {centralHostPort = 80;};


    if (!(typeOfSystem == 'client' || typeOfSystem == 'server')) {
        outputToConsole('-------* Invalid system type: ' + typeOfSystem);
        process.exit();
    };
    console.log('-------* System type: ' + typeOfSystem);
    console.log('-------* Port: ' + port);
    console.log('-------* Central host: ' + centralHostAddress);
    console.log('-------* Central host port: ' + centralHostPort);


	console.dir ( ip.address() );

	//console.log('addr: '+ ip.address());
	hostaddress = ip.address();

	}










function mainProgram() {

    startServices()
    console.log('Start Services' );

    scanHardDisk();
    console.log('Start Hard Disk Scan' );
}
























//console.log("Deep: " + diff)


var lhs = [
{line: 2, value: "The cat sat on the mat"}
,
{line: 1, value: "The cat sat on the mat2"}
,
{line: 3, value: "The cat sat on the mat2"}
    ]
;

var rhs = [

{line: 1, value: "The cat sat on the mat2"}
,
{line: 2, value: "The cat sat on the mat"}
,
{line: 3, value: "The cat sat on the mat2"}
,
{line: 4, value: "The cat sat on the mat2"}

];

var diffFn = function(lhs2, rhs2) {
    var differences = diff(lhs2, rhs2);
    return {
            new:     differences.filter(function (el) {return el.kind == 'N'}).length,
            deleted: differences.filter(function (el) {return el.kind == 'D'}).length,
            edited:  differences.filter(function (el) {return el.kind == 'E'}).length,
            array:   differences.filter(function (el) {return el.kind == 'A'}).length
    };

};
//console.log("")
//console.log("")
//console.log("")
//console.log("----------------------------------------------------------------------------------------------")
//console.log(JSON.stringify(differences,null,2))
var xdiff = diffFn(lhs, rhs);
//console.log("N: "  + JSON.stringify(xdiff.new,null,2))
//console.log("D: "  + JSON.stringify(xdiff.deleted,null,2))
//console.log("E: "  + JSON.stringify(xdiff.edited,null,2))
//console.log("A: "  + JSON.stringify(xdiff.array,null,2))
//console.log("----------------------------------------------------------------------------------------------")
//console.log("")
//console.log("")
//console.log("")




function setSharedGlobalVar(nameOfVar, index, value) {
    //console.log(setSharedGlobalVar);
    //console.log("sent " + nameOfVar + "[" + index + "] = "   + "...");
    //console.log("sent " + nameOfVar + "[" + index + "] = " + eval(value).get_v2  + "...");
    var tosend = nameOfVar + "['" + index + "'] = " + value ;
    //console.log(tosend);
    eval(tosend);
    try {
        var sharemessage = {
                            message_type:       'childSetSharedGlobalVar',
                            nameOfVar:          nameOfVar,
                            index:              index,
                            //value:              JSON.stringify(value,null,2)
                            value:              value
                        };
        forked.send(sharemessage);
        forkedIndexer.send(sharemessage);
        forkedFileScanner.send(sharemessage);
        /*sendOverWebSockets({
                                type:               "setSharedGlobalVar",
                                nameOfVar:          nameOfVar,
                                index:              index,
                                value:              value
                                });*/
    } catch(err) {
        //console.log("Error with " + err );
        return err;
    } finally {

    }
}




function mkdirSync(dirPath) {
    try {
        mkdirp.sync(dirPath)
    } catch (err) {
        //if (err.code !== 'EEXIST') throw err
    }
}


function outputToConsole(text) {
    var c = console;
    c.log(text);
}


function copyNodeNativeAdapter( osName, moduleName, directoryToSaveTo , nativeFileName) {
    //console.log('Copy started of : ' + osName + ', '+ moduleName + ','+ directoryToSaveTo + ','+ nativeFileName);
	if (!fs.existsSync(process.cwd() + "/node_modules/" + moduleName + "/" + directoryToSaveTo + "/" + nativeFileName) ) {
		//console.log('* Creating native driver for: ' + moduleName);
		mkdirSync(process.cwd() + "/node_modules/" + moduleName +  "/" + directoryToSaveTo);
		copyFileSync(	process.cwd() + "/node_" + osName + "/" + nativeFileName + "rename",
                        process.cwd() + "/node_modules/" + moduleName + "/" + directoryToSaveTo + "/" + nativeFileName) ;
	}
	//console.log('Copy done');
}




function isExcelFile(fname) {
    if (!fname) {
        return false;
    };
    var ext = fname.split('.').pop();
    ext = ext.toLowerCase();
    if (ext == "xls") return true;
    if (ext == "xlsx") return true;
    return false;
}


function isWordFile(fname) {
    if (!fname) {
        return false;
    };
    var ext = fname.split('.').pop();
    ext = ext.toLowerCase();
    if (ext == "doc") return true;
    if (ext == "docx") return true;
    return false;
}

function isPdfFile(fname) {
    if (!fname) {
        return false;
    };
    var ext = fname.split('.').pop();
    ext = ext.toLowerCase();
    if (ext == "pdf") return true;
    return false;
}




function isCsvFile(fname) {
	if (!fname) {
	return false;
	};
	var ext = fname.split('.').pop();
	ext = ext.toLowerCase();
	if (ext == "csv") return true;
	return false;
}


function isGlbFile(fname) {
		if (!fname) {
				return false;
		};
		var ext = fname.split('.').pop();
		ext = ext.toLowerCase();
		if (ext == "glb")
				return true;
		return false;
}


function saveConnectionAndQueryForFile(fileName) {
    //console.log("... in saveConnectionAndQueryForFile:::: " + fileId)
    sendOverWebSockets({
                            type:   "server_scan_status",
                            value:  "Found file " + fileName
                            });
    if (!fileName) {
        return;
    };
    if (fileName.indexOf("$") != -1) {
        return;
    };
    if (fileName.indexOf("gsd_") != -1) {
        return;
    };
    try {
        forked.send({
                        message_type:       'saveConnectionAndQueryForFile',
                        fileId:             fileName
                        });

    } catch(err) {
        //console.log("Error " + err + " with file: " + fileName);
        return err;
    } finally {

    }
}









function scanHardDiskFromChild() {
    if (typeOfSystem == 'client') {
        forkedIndexer.send({ message_type: "childRunFindFolders" });
        forkedFileScanner.send({ message_type: "childScanFiles" });
    }
}


function scanHardDisk() {
    scanHardDiskFromChild();
    sendOverWebSockets({
                          type:   "server_scan_status",
                          value:  "Hard disk scan in progress"
                          });
};



function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    //console.log('çopy from: '+ source + ' to ' + target);
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
				//console.log('copying:  ' + targetFolder);
            }
        } );
    }
}


























function sendOverWebSockets(data) {
    var ll = serverwebsockets.length;
    //console.log('send to sockets Count: ' + JSON.stringify(serverwebsockets.length));
    for (var i =0 ; i < ll; i++ ) {
        var sock = serverwebsockets[i];
        if (sock.readyState == 1) {
            sock.send(JSON.stringify(data));
        }
        //console.log('                    sock ' + i + ': ' + JSON.stringify(sock.readyState));
    }
}





function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}






// ============================================================
// This sends a message to a specific websocket
// ============================================================
function sendToBrowserViaWebSocket(aws, msg) {
    aws.send(JSON.stringify(msg,null,2));
}









function isLocalMachine(req) {
    if ((req.ip == '127.0.0.1') || (hostaddress == req.ip)) {  // this is the correct line to use
    //if (req.ip == '127.0.0.1')  {      // this is used for debugging only so that we can deny access from the local machine
        return true;
    };
    return false;
}





//------------------------------------------------------------------------------
// test if allowed
//------------------------------------------------------------------------------
function canAccess(req,res) {
    if (!locked) {
        return true;
    };
    if (isLocalMachine(req) ) {
        return true;
    };
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Sorry but access to " + username + "'s data is not allowed. Please ask " + username + " to unlocked their VisiFile account");
    return false;
};







function getPort () {
    console.log('function getPort()')
    var server = net.createServer()

    server.listen(port, ip.address(), function (err) {
        console.log('trying port: ' + port + ' ')
        server.once('close', function () {
        })
        server.close()
    })
    server.on('error', function (err) {
        console.log('Couldnt connect on port ' + port + '...')
        if (port < portrange) {
            port = portrange
            };
        console.log('... trying port ' + port)
        portrange += 1
        getPort()
    })
    server.on('listening', function (err) {
            console.log('Can connect on port ' + port + ' :) ')
            mainProgram()
    })
}












function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}




function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }
    return domain;
}





function findViafromString(inp) {
    if (inp == null) {
        return "";
    }

    var ll = inp.split(' ');
    for (var i=0; i< ll.length ; i++){
        if (ll[i] != null) {
            if (ll[i].indexOf(":") != -1) {
                return extractRootDomain(ll[i]);
            }
        }
    }
    return "";
}








function aliveCheckFn() {
		var urlToConnectTo = "http://" + centralHostAddress + ":" + centralHostPort + '/client_connect';
		//console.log('-------* urlToConnectTo: ' + urlToConnectTo);
		//console.log('trying to connect to central server...');
		request({
					uri: urlToConnectTo,
					method: "GET",
					timeout: 10000,
					agent: false,
					followRedirect: true,
					maxRedirects: 10,
					qs: {
							requestClientInternalHostAddress: hostaddress
							,
							requestClientInternalPort:        port
							,
							clientUsername:        username
					}
				},
				function(error, response, body) {
					//console.log('Error: ' + error);
					if (response) {
							if (response.statusCode == '403') {
										//console.log('403 received, not allowed through firewall for ' + urlToConnectTo);
										//open("http://" + centralHostAddress + ":" + centralHostPort);
							} else {
										////console.log('response: ' + JSON.stringify(response));
										////console.log(body);
							}
					}
				});
};







































function getRoot(req, res) {
	hostcount++;
	console.log("Host: " + req.headers.host + ", " + hostcount);
	//console.log("URL: " + req.originalUrl);
	if (req.headers.host) {
		if (req.headers.host.toLowerCase().endsWith('canlabs.com')) {
		res.writeHead(301,
			{Location: 'http://canlabs.com/canlabs'}
			);
			res.end();
			return;
		};
		if (req.headers.host.toLowerCase().endsWith('thebank.digital')) {
		res.writeHead(301,
			{Location: 'http://thebank.digital/thebankdigital'}
			);
			res.end();
			return;
		};
		if (req.headers.host.toLowerCase().endsWith('coinsafe.dk')) {
		res.writeHead(301,
			{Location: 'http://thebank.digital/thebankdigital'}
			);
			res.end();
			return;
		};
		if (req.headers.host.toLowerCase().endsWith('gosharedata.com')) {
		res.writeHead(301,
			{Location: 'http://visifile.com/visifile/index.html?time=' + new Date().getTime()}
			);
			res.end();
			return;
		};
		if (req.headers.host.toLowerCase().endsWith('visifile.com')) {
		res.writeHead(301,
			{Location: 'http://visifile.com/visifile/index.html?time=' + new Date().getTime()}
			);
			res.end();
			return;
		};
		if (req.headers.host.toLowerCase().endsWith('visifiles.com')) {
		res.writeHead(301,
			{Location: 'http://visifile.com/visifile/index.html?time=' + new Date().getTime()}
			);
			res.end();
			return;
		};
	};

	if (typeOfSystem == 'client') {
        if (!canAccess(req,res)) {
            return;
        }
        res.end(fs.readFileSync(path.join(__dirname, '../public/index.html')));
	}
	if (typeOfSystem == 'server') {
		res.end(fs.readFileSync(path.join(__dirname, '../public/index_server.html')));
	}
}








function getFileExtension(driver) {
    if (driver == "excel") { return "xlsx"}
    if (driver == "pdf") { return "pdf"}
    if (driver == "word") { return "doc"}
    if (driver == "csv") { return "csv"}
    if (driver == "glb") { return "glb"}
    if (driver == "txt") { return "txt"}
    return ""
}



function testFirewall(req, res) {
			var tracking_id =    url.parse(req.url, true).query.tracking_id;
			var server      =    url.parse(req.url, true).query.server;

			//console.log(JSON.stringify(tracking_id,null,2));

			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(JSON.stringify({    got_through_firewall:   tracking_id  ,
																	server:                 server,
																	username:               username,
																	locked:                 locked
																	}));
};
















function clientConnectFn(req, res) {
	try
	{
		var queryData = url.parse(req.url, true).query;

		var requestClientInternalHostAddress = req.query.requestClientInternalHostAddress;
		var requestClientInternalPort        = req.query.requestClientInternalPort;
		var requestVia                       = findViafromString(req.headers.via);
		var requestClientPublicIp            = req.ip;
          var clientUsername                   = req.query.clientUsername;
		//requestClientPublicHostName      = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		var requestClientPublicHostName      = "req keys::" + Object.keys(req) + ", VIA::" + req.headers.via + ", raw::" + JSON.stringify(req.rawHeaders);

		//console.log('Client attempting to connect from:');
		//console.log('client internal host address:    ' + requestClientInternalHostAddress)
		//console.log('client internal port:            ' + requestClientInternalPort)
		//console.log('client public IP address:        ' + requestClientPublicIp)
		//console.log('client public IP host name:      ' + requestClientPublicHostName)
		//console.log('client VIA:                      ' + requestVia)

          dbsearch.serialize(function() {
              var stmt = dbsearch.prepare(" insert  into  intranet_client_connects " +
                                      "    ( id, internal_host, internal_port, public_ip, via, public_host, user_name, client_user_name, when_connected) " +
                                      " values " +
                                      "    (?,   ?,?,?,?,  ?,?,?,?);");

              var newid = uuidv1();
              stmt.run(   newid,
                          requestClientInternalHostAddress,
                          requestClientInternalPort,
                          requestClientPublicIp,
                          requestVia,
                          requestClientPublicHostName,
                          username,
                          clientUsername,
                          new Date().getTime()
                  );
          });
          //console.log('***SAVED***');

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(JSON.stringify(
              {
                  connected: true,
              }));
	}
	catch (err) {
		//console.log('Warning: Central server not available:');
	}

}







function websocketFn(ws, req) {
    serverwebsockets.push(ws);
    //console.log('Socket connected : ' + serverwebsockets.length);
    ws.on('message', function(msg) {
        var receivedMessage = eval("(" + msg + ")");
        //console.log("Server recieved message: " + JSON.stringify(receivedMessage));

        if (receivedMessage.message_type == "server_get_all_queries") {
            //return
            //console.log("     Server recieved message server_get_all_queries");
            sendToBrowserViaWebSocket(ws, {   message_type: "client_get_all_queries"  });

            var stmt = dbsearch.all("select * from queries",
                function(err, results) {
                    for (var i=0; i < results.length;i ++) {
                        var query = results[i];
                        sendToBrowserViaWebSocket(
                            ws,
                            {
                                type: "update_query_item",
                                query: query
                            });
                    }
                    sendToBrowserViaWebSocket(ws, {   type: "client_get_all_queries_done"  });
                });


        }
    });
};








//------------------------------------------------------------------------------
// scan the hard disk for documents for indexing
//------------------------------------------------------------------------------
function scanharddiskFn(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(JSON.stringify([]));
		scanHardDisk();
};





function stopscanharddiskFn(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(JSON.stringify([]));
        if (typeOfSystem == 'client') {
            stopScan = true;
            sendOverWebSockets({
	                              type:   "server_scan_status",
	                              value:  "Hard disk scan stopped"
	                              });
        }
};









function file_uploadFn(req, res, next) {
      //console.log('-------------------------------------------------------------------------------------');
      //console.log('-------------------------------------------------------------------------------------');
      //console.log('-------------------------------------------------------------------------------------');
      //console.log('-------------------------------------------------------------------------------------');
      //console.log('-------------------------------------------------------------------------------------');

      //console.log(JSON.stringify(req.files.length));
      //console.log("**FILES** " + JSON.stringify(req.files));
      //console.log(    "    next: " + JSON.stringify(next));


      //console.log('......................................................................................');
      //console.log('......................................................................................');
      //console.log('......................................................................................');
      //console.log('......................................................................................');
      //console.log('......................................................................................');
      res.status( 200 ).send( req.files );


      var ll = req.files.length;
      for (var i = 0; i < ll ; i ++) {
          var ifile = req.files[i];
          //console.log("        " + JSON.stringify(ifile));
          var ext = ifile.originalname.split('.').pop();
          ext = ext.toLowerCase();
          //console.log('Ext: ' + ext);

          var localp2;
          if (isWin) {
          		localp2 = process.cwd() + '\\uploads\\' + ifile.filename;
      		} else {
          		localp2 = process.cwd() + '/uploads/' + ifile.filename;
      		};
          var localp = localp2 + '.' + ext;
          fs.renameSync(localp2, localp);
          //console.log('Local saved path: ' + localp);

          fs.stat(localp, function(err, stat) {
                console.log('ifile: ' + ifile.originalname);

                saveConnectionAndQueryForFile(localp);
          });
    }

};











function open_query_in_native_appFn(req, res) {

	//console.log('in open_query_in_native_app');
	var queryData = req.body;
	//console.log('queryData.source: ' + queryData.source);
	//console.log('queries[queryData.source]: ' + queries[queryData.source]);
	//console.log('connections[queries[queryData.source].connection]: ' + connections[queries[queryData.source].connection]);
	//console.log('connections[queries[queryData.source].connection].fileName: ' + connections[queries[queryData.source].connection].fileName);
	var error = new Object();
	////console.log('query driver: ' + connections[queryData.source].driver);
	try {
		//drivers[connections[queryData.source].driver]['get_v2'](connections[queryData.source],{sql: queryData.sql},function(ordata) {
		   open(connections[queries[queryData.source].connection].fileName);

		   res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(JSON.stringify(ordata));
	}

	catch(err) {
		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end(JSON.stringify({error: 'Error: ' + JSON.stringify(err)}));
	};
}








//------------------------------------------------------------------------------
// Get the result of a SQL query
//------------------------------------------------------------------------------
function getresultFn(req, res) {
		var queryData = req.body;
		//console.log('queryData.source: ' + queryData.source);

		////console.log('request received source: ' + Object.keys(req));
		var error = new Object();
		if (queryData) {
			if (connections[queryData.source]) {
				if (queryData.source) {
					if (connections[queryData.source].driver) {
						//console.log('query driver: ' + connections[queryData.source].driver);
						try {
							drivers[connections[queryData.source].driver]['get_v2'](connections[queryData.source],{sql: queryData.sql},function(ordata) {
								res.writeHead(200, {'Content-Type': 'text/plain'});

																res.end(JSON.stringify(ordata));
							});
						}
						catch(err) {
							res.writeHead(200, {'Content-Type': 'text/plain'});

							res.end(JSON.stringify({error: 'Error: ' + JSON.stringify(err)}));
						};
					} else {
						//console.log('query driver not found: ' + connections[queryData.source]);
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.end(JSON.stringify({message: 'query driver not found'}));
					};
				};
			};
		};
}






//------------------------------------------------------------------------------
// Get the result of a search
//------------------------------------------------------------------------------
function get_related_documentsFn(req, res) {
    //console.log("called get_related_documents: " )
    var id = req.query.id;
    forked.send({
                            message_type:   "getRelatedDocuments",
                            id:  id
                            });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end( JSON.stringify({}))
}











function get_search_resultsFn(req, res) {
    //console.log("called get_search_results: " )
    var searchTerm = req.query.search_text;
    var timeStart = new Date().getTime();

    //console.log("searchTerm.length: " + searchTerm.length)
    //console.log("searchTerm: " + searchTerm)
    if (searchTerm.length < 1) {
        var timeEnd = new Date().getTime();
        var timing = timeEnd - timeStart;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end( JSON.stringify({search:      searchTerm,
                                 queries:    [],
                                 message:    "Search text must be at least 1 characters: " + searchTerm,
                                 duration:    timing    }  ));
    } else {

    dbsearch.serialize(function() {
        var mysql = "  select distinct(queries.id), the1.document_binary_hash, the1.num_occ  , the1.child_hash , zfts_search_rows_hashed.data " +
                    " from (  select   " +
                   "  distinct(document_binary_hash), count(document_binary_hash)  as num_occ  , child_hash  " +
                 "    from    " +
                 "    search_rows_hierarchy   " +
                 "    where    " +
                 "    child_hash in (select     " +
                  " distinct(row_hash)    " +
                    "  from     " +
"                          zfts_search_rows_hashed    " +
 "                    where    " +
  "                         zfts_search_rows_hashed match '"  + searchTerm + "*'  )   " +
   "                  group by   " +
    "                    document_binary_hash) as the1,   " +
     "                     queries  , " +
      "                    zfts_search_rows_hashed  " +
       "              where    " +
        "             queries.hash = the1.document_binary_hash   " +
" and " +
"zfts_search_rows_hashed.row_hash = the1.child_hash ";

        var firstWord = searchTerm.split()[0];
        if (firstWord.length < 1) {
            firstWord = "";
        }
        var stmt = dbsearch.all(mysql, function(err, rows) {
            if (!err) {
                //console.log('rows: ' + JSON.stringify(rows.length));
                var newres = [];
                for  (var i=0; i < rows.length;i++) {
                    var rowId = rows[i]["id"];
                    var rowData =  rows[i]["data"];
                    if (rowData.length > 0) {
                        var rowDataToSend = ""
                        if (i < 5) {
                            var rowDataStartInit = rowData.toUpperCase().indexOf(firstWord.toUpperCase())
                            //console.log('rowDataStartInit: ' + rowDataStartInit );

                            //console.log('for: ' + firstWord + " = " + JSON.stringify(rowData));

                            var rowDataStart = rowDataStartInit - 30;
                            if (rowDataStart < 0) {
                                rowDataStart = 0
                            }
                            //console.log('rowDataEndInit: ' + rowDataEndInit );
                            var rowDataEnd = rowDataStartInit + firstWord.length + 30

                            rowDataToSend = rowData.substring(rowDataStart, rowDataStartInit) + firstWord.toUpperCase() +
                                rowData.substring(rowDataStartInit + firstWord.length, rowDataEnd);
                        }
                        //console.log('rowDataToSend: ' + rowDataToSend );
                        newres.push({
                                            id:     rowId,
                                            data:   rowDataToSend
                                    });
                    }
                }
                var timeEnd = new Date().getTime();
                var timing = timeEnd - timeStart;
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end( JSON.stringify({   search:  searchTerm,
                                            queries: newres,
                                            duration: timing}));
            } else {
                var timeEnd = new Date().getTime();
                var timing = timeEnd - timeStart;
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end( JSON.stringify({search:      searchTerm,
                                         queries:    [],
                                         duration:    timing,
                                         error: "Error searching for: " + searchTerm }  ));
            }
        });

    })
    };
};











function getqueryresultFn(req, res) {
	var queryData2 = req.body;
	//console.log('in getqueryresult: ' + JSON.stringify(queryData2));
	//console.log('           source: ' + JSON.stringify(queryData2.source));
	////console.log('request received source: ' + Object.keys(req));
	////console.log('request received SQL: ' + queryData.sql);
	var query = queries[queryData2.source];

	//console.log('           query: ' + JSON.stringify(query));
	if (query) {
		var queryData 			= new Object();
		queryData.source 		= query.connection;
		queryData.definition 	= eval('(' + query.definition + ')' );

		//console.log('   query.definition.sql: ' + JSON.stringify(query.definition.sql));
		//console.log('           ***queryData: ' + JSON.stringify(queryData));


		var error = new Object();
		if (queryData) {
			if (connections[queryData.source]) {
				if (queryData.source) {
					if (connections[queryData.source].driver) {
						////console.log('query driver: ' + connections[queryData.source].driver);
                        var newres = res;
                        
                        var seqNum = queuedResponseSeqNum;
                        queuedResponseSeqNum ++;
                        queuedResponses[seqNum] = res;
                        forked.send({ message_type: "getResult" ,
                                      seqNum:        seqNum,
                                      source:        queryData2.source,
                                      connection:    queryData.source,
                                      driver:        connections[queryData.source].driver,
                                      definition:    queryData.definition});



                        //console.log('trying to save document: ');

                        var stmt = dbsearch.all("select   contents.content   from   queries, contents   where   queries.id = ? and queries.driver = 'pdf'" +
                                                "    and contents.id = queries.hash  limit 1",



                                                [queryData2.source],
                                                function(err, rows) {
                            //console.log('err: ' + err);
                            if (rows) {
                                //console.log('rows: ' + rows);
                            }
                            //console.log('trying to save document: ' + queryData2.source);
                                if (!err) {
                                    //console.log('trying to save pdf 3: ');
                                    if (rows.length > 0) {
                                        //console.log('trying to save pdf 4: ');
                                        //console.log('trying to save pdf 5: ');
                                        var buffer = new Buffer(rows[0].content, 'binary');

                                        fs.writeFile(process.cwd() + "/files/a.pdf", buffer,  "binary",
                                            function(err) {
                                                //console.log('trying to save pdf 6: ');

                                            });
                                    }
                                }
                        })
					} else {
						//console.log('query driver not found: ' + connections[queryData.source]);
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.end(JSON.stringify({error: 'query driver not found'}));
					};
				};
			};
		};
	} else {
		//console.log('query not found: ' + queryData2.source);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(JSON.stringify({error: 'query ' + queryData2.source + ' not found'}));

	};
}














function send_client_detailsFn(req, res) {
    ////console.log('in send_client_details: ' + JSON.stringify(req,null,2));
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify({
            returned:           'some data ',
            server:             hostaddress,
            port:               port,
            username:           username,
            locked:             locked,
            localIp:            req.ip,
            isLocalMachine:     isLocalMachine(req) }));
}


function lockFn(req, res) {
    if ((req.query.locked == "TRUE") || (req.query.locked == "true")) {
        locked = true;
    } else {
        locked = false;
    }

        ////console.log('in lock: ' + JSON.stringify(req,null,2));
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify({locked: locked}));
}




//------------------------------------------------------------------------------
// This is called by the central server to get the details of the last
// client that connected tp the central server
//------------------------------------------------------------------------------
function get_connectFn(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(
            JSON.stringify(
                {
                    requestClientInternalHostAddress: requestClientInternalHostAddress
                    ,
                    requestClientInternalPort:        requestClientInternalPort
                    ,
                    requestClientPublicIp:            requestClientPublicIp
                    ,
                    requestClientPublicHostName:      requestClientPublicHostName
                    ,
                    version:      31
                }
          ));
}




function get_all_tableFn(req, res) {
    var tableName = url.parse(req.url, true).query.tableName;
    var fields = url.parse(req.url, true).query.fields;
    var stmt = dbsearch.all("select " + fields + " from " + tableName,
        function(err, rows) {
            if (!err) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(JSON.stringify(
                    rows));
                //console.log("Sent: " + JSON.stringify(rows.length));
            };
        })
};



function add_new_connectionFn(req, res) {
    var params = req.body;
    forked.send({ message_type: "addNewConnection" , params: params});
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify({done: "ok"}))};



function add_new_queryFn(req, res) {
    var params = req.body;
    forked.send({ message_type: "addNewQuery" , params: params});
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify({done: "ok"}))};






function setUpChildListeners(forkedProcess) {
    forkedProcess.on('message', (msg) => {
        //console.log("message from child: " + JSON.stringify(msg,null,2))
        //console.log("message type from child: " + JSON.stringify(msg.message_type,null,2))
        if (msg.message_type == "return_test_fork") {
            //console.log('Message from child', msg);
            sendOverWebSockets({
                                    type:   "test_fork",
                                    value:  "Counter: " + msg.counter + ", count queries from sqlite: " + msg.sqlite
                                    });


        } else if (msg.message_type == "return_set_connection") {
            //console.log(".. Main process received a 'return_set_connection' message")
            setSharedGlobalVar( "connections",
                                msg.id,
                                JSON.stringify({    id:         msg.id,
                                                    name:       msg.name,
                                                    driver:     msg.driver,
                                                    size:       msg.size,
                                                    hash:       msg.hash,
                                                    type:       msg.type,
                                                    fileName:   msg.fileName },null,2));


        } else if (msg.message_type == "return_set_query") {

            //console.log(".. Main process received a 'return_set_query' message")

            setSharedGlobalVar( "queries",
                                msg.id,
                                JSON.stringify(
                                  {  id:            msg.id,
                                     name:          msg.name,
                                     connection:    msg.connection,
                                     driver:        msg.driver,
                                     size:          msg.size,
                                     hash:          msg.hash,
                                     fileName:      msg.fileName,
                                     type:          msg.type,
                                     definition:    msg.definition,
                                     preview:       msg.preview
                                  }));
            sendOverWebSockets({
                                    type: "uploaded",
                                    id:    msg.id,
                                    query:
                                    {
                                    }});

            sendOverWebSockets({
                                    type: "update_query_item",
                                    query: queries[msg.id]
            });


            sendOverWebSockets({   type: "client_get_all_queries_done"  });


        // this needs to be fixed so that it only sends the similar documents
        // to the client that requested them
        } else if (msg.message_type == "return_similar_documents") {
            //console.log(".. Main process received a 'return_similar_documents' message")
            sendOverWebSockets({
                                    type: "similar_documents",
                                    results: msg.results

            });

            queries[msg.query_id].similar_count = eval("(" + msg.results + ")").length
            sendOverWebSockets({
                                    type: "update_query_item",
                                    query: queries[msg.query_id]

            });



        } else if (msg.message_type == "createdTablesInChild") {
            forked.send({ message_type: "init" });
            getPort()


        } else if (msg.message_type == "parentSetSharedGlobalVar") {
            setSharedGlobalVar(msg.nameOfVar, msg.index, msg.value)




        } else if (msg.message_type == "getResultReturned") {
            var newres = queuedResponses[ msg.seqNum ]
            newres.writeHead(200, {'Content-Type': 'text/plain'});
            newres.end(JSON.stringify(msg.result));
            newres = null;
        

        
        
        } else if (msg.message_type == "returnDownloadWebDocument") {
            var rett = eval("(" + msg.returned + ")");
            var newres = queuedResponses[ msg.seq_num ]
            
            newres.writeHead(200, {'Content-Type': 'text/plain'});
            newres.end(JSON.stringify({  result: rett.result}));
            
            newres = null;

            
            
            
            
            
            
        } else if (msg.message_type == "returnDownloadDocuments") {
            var newres = queuedResponses[ msg.seq_num ]
            
            if (msg.returned.error) {
                newres.end(JSON.stringify({  error: msg.returned.error}));
                
            } else if (msg.returned.result) {
                var contentRecord = msg.returned.result
                var content = Buffer.from(JSON.parse(msg.content).data);
                
                console.log("9: " + contentRecord.content_type);
                console.log("10: " + contentRecord.id);
                console.log("11: " + contentRecord.driver);
                console.log("12: " + content.length);
                //console.log("13: " + content);
                console.log("14: " + Object.keys(contentRecord));
                newres.writeHead(  
                
                                200, 
                
                                {
                                    'Content-Type': contentRecord.content_type,
                                    'Content-disposition': 'attachment;filename=' + contentRecord.id  + "." + getFileExtension(contentRecord.driver),
                                    'Content-Length': content.length
                                });


                newres.end(new Buffer(  content, 'binary'  ));
            } else {
                newres.end(JSON.stringify({  error: "No results"}));
            }
            
            newres = null;


        } else if (msg.message_type == "returnIntranetServers") {
            //zzz                    
            console.log("6: returnIntranetServers")
            console.log("6.1: " + msg)
            console.log("7: " + msg.returned)
            var newres = queuedResponses[ msg.seq_num ]
            
            newres.writeHead(200, {'Content-Type': 'text/plain'});

            
            if (msg.returned) {
                newres.end( JSON.stringify( {  allServers:         msg.returned,
                                               intranetPublicIp:   msg.requestClientPublicIp}) );
            } else {
                console.log( "8: " + msg.error );
                newres.end(JSON.stringify( {  allServers:        [],
                                              intranetPublicIp:  msg.requestClientPublicIp}) );
            }
            newres = null;
                
                
        }

//
//







    });
}

function setupChildProcesses2() {




    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");









    if (isWin) {
        forked = fork.fork(path.join(__dirname, '../src/child.js'));
    } else {
            forked = fork.fork(path.join(__dirname, '../src/child.js'));
    };

    setUpChildListeners(forked);


    forked.send({ message_type: "createTables" });
    forked.send({ message_type: "greeting", hello: 'world' });

//createdTablesInChild
}

function setupChildProcesses() {




    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");
    //console.log("-------------------------------------------------------------------");









    if (isWin) {
        forkedIndexer = fork.fork(path.join(__dirname, '../src/child.js'));
        forkedFileScanner = fork.fork(path.join(__dirname, '../src/child.js'));
    } else {
            forkedIndexer = fork.fork(path.join(__dirname, '../src/child.js'));
            forkedFileScanner = fork.fork(path.join(__dirname, '../src/child.js'));
    };

    setUpChildListeners(forkedIndexer);
    setUpChildListeners(forkedFileScanner);
    forkedIndexer.send({ message_type: "init" });
    forkedFileScanner.send({ message_type: "init" });
}


//------------------------------------------------------------
// This starts all the system services
//------------------------------------------------------------
function startServices() {
    app.use(cors())

    //------------------------------------------------------------------------------
    // Show the default page for the different domains
    //------------------------------------------------------------------------------
    app.get('/', function (req, res) {
        console.log("app.get('/'");
    	return getRoot(req, res);
    })

    app.use("/files", express.static(process.cwd() + '/files/'));

    app.use("/public/aframe_fonts", express.static(path.join(__dirname, '../public/aframe_fonts')));
    app.use('/viewer', express.static(process.cwd() + '/node-viewerjs/release'));
    app.use(express.static(path.join(process.cwd(), '/public/')))
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies





    //------------------------------------------------------------------------------
    // Download documents to the browser
    //------------------------------------------------------------------------------
    app.get('/docs2/*', function (req, res) {
        var fileId = req.url.substr(req.url.lastIndexOf('/') + 1)
        
        var seqNum = queuedResponseSeqNum;
        queuedResponseSeqNum ++;
        queuedResponses[seqNum] = res;
        forked.send({   message_type:   "downloadDocuments", 
                        seq_num:         seqNum, 
                        file_id:         fileId });
    });


    //------------------------------------------------------------------------------
    // Download web documents to the browser
    //------------------------------------------------------------------------------
    app.get('/get_web_document', function (req, res) {
        var seqNum = queuedResponseSeqNum;
        queuedResponseSeqNum ++;
        queuedResponses[seqNum] = res;
        forked.send({   message_type:   "downloadWebDocument", 
                        seq_num:         seqNum, 
                        query_id:        req.query.id });
    });


    //------------------------------------------------------------------------------
    // test_firewall
    //------------------------------------------------------------------------------
    app.get('/test_firewall', function (req, res) {
        return testFirewall(req,res);
    });


    
    //zzz
    //------------------------------------------------------------------------------
    // get_intranet_servers
    //------------------------------------------------------------------------------
    app.get('/get_intranet_servers', function (req, res) {
        console.log("1 - get_intranet_servers: " + req.ip)
        console.log("1.1 - get_intranet_servers: " + Object.keys(req.headers))
        
        var seqNum = queuedResponseSeqNum;
        queuedResponseSeqNum ++;
        queuedResponses[seqNum] = res;
        console.log("2")
        forked.send({   message_type:               "get_intranet_servers", 
                        seq_num:                    seqNum, 
                        requestClientPublicIp:      req.ip ,
                        numberOfSecondsAliveCheck:  numberOfSecondsAliveCheck,
                        requestVia:                 findViafromString(req.headers.via)
                        });


    });



    app.ws('/websocket', function(ws, req) {
        //console.log("app.get('/websocket'");
        return websocketFn(ws, req)
    });


    //------------------------------------------------------------------------------
    // Scan the hard disk for documents to Index
    //------------------------------------------------------------------------------
    app.get('/scanharddisk', function (req, res) {
    		return scanharddiskFn(req, res)
    });




    app.get('/stopscanharddisk', function (req, res) {
    		return stopscanharddiskFn(req, res)
    });


    app.post('/file_upload', upload.array( 'file' ), function (req, res, next) {
        return file_uploadFn(req, res, next);
    });




    app.post('/open_query_in_native_app', function (req, res) {
    		return open_query_in_native_appFn(req, res);
    })


    //------------------------------------------------------------------------------
    // Get the result of a SQL query
    //------------------------------------------------------------------------------
    app.post('/getresult', function (req, res) {
    	  return getresultFn(req, res);
    })


    //------------------------------------------------------------------------------
    // Get the related documents
    //------------------------------------------------------------------------------
    app.get('/get_related_documents', function (req, res) {
        return get_related_documentsFn(req, res);
    })


    //------------------------------------------------------------------------------
    // Get the result of a search
    //------------------------------------------------------------------------------
    app.get('/get_search_results', function (req, res) {
        return get_search_resultsFn(req, res);
    });


    app.post('/getqueryresult', function (req, res) {
    	return getqueryresultFn(req, res);
    })


    app.get('/send_client_details', function (req, res) {
    	return send_client_detailsFn(req, res);
    })


    app.get('/lock', function (req, res) {
        return lockFn(req, res);
    })


    process.on('uncaughtException', function (err) {
      console.log(err);
    })



    //------------------------------------------------------------------------------
    // This is called by the central server to get the details of the last
    // client that connected tp the central server
    //------------------------------------------------------------------------------
    app.get('/get_connect', function (req, res) {
    	return get_connectFn(req, res);
    })

    //app.enable('trust proxy')


    app.get('/get_all_table', function (req, res) {
    		return get_all_tableFn(req, res);
    });

    app.post('/add_new_connection', function (req, res) {
    		return add_new_connectionFn(req, res)
    });



    app.post('/add_new_query',function (req, res) {
        return add_new_queryFn(req, res)
    });




    //------------------------------------------------------------------------------
    // run on the central server only
    //
    // This is where the client sends its details to the central server
    //------------------------------------------------------------------------------
    app.get('/client_connect', function (req, res) {
    	  return clientConnectFn(req,res);

    })




    //------------------------------------------------------------------------------
    // start the web server
    //------------------------------------------------------------------------------
    app.listen(port, hostaddress, function () {
    	console.log(typeOfSystem + ' started on port ' + port + ' with local folder at ' + process.cwd() + ' and __dirname = ' + __dirname);
    })




      //console.log('addr: '+ hostaddress + ":" + port);






    aliveCheckFn();


    setupChildProcesses();

    if (typeOfSystem == 'client') {
        setInterval(aliveCheckFn ,numberOfSecondsAliveCheck * 1000);

        forkedIndexer.send({ message_type: "childRunIndexer" });


    }




    forked.send({ message_type: "when_connections_changes" });
    forked.send({ message_type: "when_queries_changes" });




	//console.log("******************************ADDING DRIVERS*********************************")
	//console.log("******************************ADDING DRIVERS*********************************")


    forked.send({
                    message_type:       'setUpDbDrivers'
                    });














	//--------------------------------------------------------
	// open the app in a web browser
	//--------------------------------------------------------


	if (typeOfSystem == 'client') {
        var localClientUrl = 'http://' + hostaddress  + ":" + port;
        var remoteServerUrl = 'http://' + centralHostAddress  + ":" + centralHostPort + "/visifile/list_intranet_servers.html?time=" + new Date().getTime();


        request({
                  uri: remoteServerUrl,
                  method: "GET",
                  timeout: 10000,
                  agent: false,
                  followRedirect: true,
                  maxRedirects: 10
            },
            function(error, response, body) {
              if (error) {
                  //console.log("Error opening central server: " + error);
                  open(localClientUrl);
              } else {
                open(remoteServerUrl);
              }
            });
	} else if (typeOfSystem == 'server') {
	  open('http://' + hostaddress  + ":" + port + "/visifile/list_intranet_servers.html?time=" +  + new Date().getTime());
	}


}









var isPcDoingStuff = false;
//Set delay for second Measure
setInterval(function() {
    perf.isDoingStuff(function(retVal){
        if ((retVal == false) &&  (isPcDoingStuff)){
            sendOverWebSockets({
                                    type:   "server_scan_status",
                                    value:  "VisiFile Server busy - scanning paused "
                                    });
        }

        isPcDoingStuff = retVal;
        //console.log("    isPcDoingStuff = " + isPcDoingStuff);
    });
}, 1000);
