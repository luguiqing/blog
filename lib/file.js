const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const log =	require("./log");
const code = require("./code");
const path = require('path');
const mkdirp = require('mkdirp');


module.exports = class {
	//返回json或者string
	static readFile(path, type='string'){
		return new Promise( (resolve, reject) => {
			if(!fs.existsSync(path)){
				//fs.writeFileSync(path,'');
				return resolve({})
			}
			let readstream = fs.createReadStream(path);
			let bufArr = [];
			let bufLen = 0, buf;
			return readstream.on('data', chunk => {
				bufArr.push(chunk);
				bufLen += chunk.length;
			}).on('end', () => {
				try{
					buf = Buffer.alloc(bufLen);
					for(let i = 0, pos = 0; i<bufArr.length&&pos<bufLen; i++){
						bufArr[i].copy(buf,pos);
						pos += bufArr[i].length;
					}
					let result = buf.toString();
					switch(type){
						case 'json':
								return resolve(JSON.parse(result))
							break;
						case 'string':
						default:
							return resolve(result)
							break;
					}
				}catch( e ){
					log.error( e.message, "readFile" );
					reject( e );
				}
			})
		}).catch( e => {
			log.error( e.message, "readFile" );
			throw new Error( code.fileSysError.code );
		});
	}
	/*
	*@param path  <require|true>
	*@param data  <require|true>
	*@param dir  <require|false>
	*/
	static writeFile(path, data, dirName){
		if(dirName){
			if( !fs.existsSync( dirName ) ){
				mkdirp.sync( dirName );
			}
		}
		return new Promise( (resolve, reject) => {

			let writeStream = fs.createWriteStream(path);
			writeStream.write(data,'UTF8');

			writeStream.end();

			writeStream.on('finish', () => {
				return resolve();
			})
		}).catch( e => {
			log.error( e.message, "writeFile" );
			throw new Error( code.fileSysError.code );
		});
	}
}