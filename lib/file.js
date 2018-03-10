const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const log =	require("./log");
const code = require("./code");
const path = require('path');


module.exports = class {
	static readFile(path){
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
					if(result.length > 0 && result.indexOf('{') > -1){
						return resolve(JSON.parse(result))
					}else{
						return resolve(result)
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

	static writeFile(path, data){
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