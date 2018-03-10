const	Promise						=	require("bluebird"),
		code						=	require( "./code" ),
		config						=	require( "../global/config" ),
		http						=	require( "./http" ),
		API							=	require( "./api" ),
		log							=	require( "./log" );

const 	httpNative					=	require("http"),
		urlParser					=	require("url"),
		httpsNative					=	require("https");

module.exports = class {
	/**
	 * 验证参数是否为空
	 * @version	2017-05-29
	 * @param	{array|string}		validArr		验证空的参数名/数组
	 * @param	{object}			paramObj		验参的对象
	 */
	validEmpty( validArr, paramObj ){
		if( validArr.length < 1 || validArr === undefined ){
			return true;
		}
		let i, validParam;
		if( typeof validArr === "object" && validArr.length > 0 ){
			for( i = 0; i < validArr.length; i++ ){
				validParam	=	validArr[ i ];
				if( typeof validParam === "string" ){
					if( API.isNull( paramObj[ validParam ] ) ){
						throw new Error( validParam + "|" + code.paramError.code );
					}
				}else{
					if( validParam.premise !== undefined && paramObj[ validParam.premise.name ] === validParam.premise.value && API.isNull( paramObj[ validParam.name ] ) ){
						throw new Error( validParam.name + "|" + code.paramError.code );
					}
				}
			}
		}else if( typeof validArr === "string" ){
			if( API.isNull( paramObj[ validArr ] ) ){
				throw new Error( validArr + "|" + code.paramError.code );
			}
		}
		return true;
	}

	/**
	 * 抛出参数错误
	 * @version	2017-05-29
	 * @param	{string}		name		抛出错误的参数名
	 */
	paramError( name ){
		if( name !== null && name !== undefined ){
			throw new Error( name + "|" + code.paramError.code );
		}
	}

	/**
	 * 安全模式
	 * @version	2017-05-29
	 * @param	{object}		req		request对象
	 * @param	{object}		res		response对象
	 * @param	{function}		fun		加工方法
	 */
	safeMode( funName, req, res, next ){
		let sendData;
		Promise.try( () => {
			let fun		=	this[ funName ];
			return fun.call( this, req, res, next );
		}).then( result => {
			log.info( result.str + code.success.msg, "Response", req.originalUrl );
			// log.info( JSON.stringify( result.data ), "Response Data", req.originalUrl );
			sendData	=	{
				retcode		:	code.success.code,
				retdata		:	result.data,
				retmsg		:	API.isEmpty( result.str ) ? code.success.msg : result.str
			};
		}).catch( e => {
			let str = "", error, errType;
			if( e.message.indexOf( "|" ) !== -1 ){
				str			=	e.message.split( "|" )[ 0 ];
				e.message	=	Number.parseInt( e.message.split( "|" )[ 1 ] );
			}else{
				e.message	=	Number.parseInt( e.message );
			}

			for( let temp in code ){
				if( code[ temp ].code === e.message ){
					error		=	code[ temp ];
					errType		=	temp;
					break;
				}
			}
			if( error === undefined ){
				log.error( e.stack, "unKnownError", req.originalUrl );
				sendData	=	{
					retcode		:	code.unKnownError.code,
					retmsg		:	code.unKnownError.msg
				};
			}else{
				let stackStr	=	e.stack.split( "at " )[ 1 ].split( "\n" )[ 0 ];
				switch( error.type ){
					case "info":
						log.info( stackStr, errType, req.originalUrl );
						log.info( str + error.msg, errType, req.originalUrl );
					break;

					case "warning":
						log.warning( stackStr, errType, req.originalUrl );
						log.warning( str + error.msg, errType, req.originalUrl );
					break;

					case "error":
						log.error( stackStr, errType, req.originalUrl );
						log.error( str + error.msg, errType, req.originalUrl );
					break;

					default:
						log.warning( stackStr, errType, req.originalUrl );
						log.warning( str + error.msg, errType, req.originalUrl );
					break;
				}
				sendData	=	{
					retcode		:	error.code,
					retmsg		:	str.length === 0 ? error.msg : str
				};
			}
		}).finally( () => {
			res.json( sendData );
			res.end();
		});
	}

	/**
	 * 请求服务器接口
	 * @version	2017-05-29
	 * @param	{string}		url			请求链接
	 * @param	{object}		data		请求参数
	 * @param	{string}		method		请求类型
	 */
	request( url, data, method = "post", option ){
		let promise;
		method	=	method.toLowerCase();
		switch( method ){
			case "get":
				promise		=	http.get( config.serverUrl + url, data, option );
			break;

			case "post":
				promise		=	http.post( config.serverUrl + url, data, option );
			break;

			default:
				return null;
		}
		return promise.then( result => {
			switch( result.retcode ){
				case 0:
					return result.retdata;

				case -1:
					this.paramError( result.retmsg );
				break;

				default:
					throw new Error( result.retcode );
			}
		});
	}

	/**
	 * 作为代理服务器接口,暂未对data进行buffer二进制处理
	 * @version	2017-05-29
	 * @param	{string}		url			请求链接
	 * @param	{object}		data		请求参数
	 * @param	{string}		method		请求类型
	 */
	proxyRequest( req, res, url, data, method = "post"){

		let options, httpClient, tempOptions;
		tempOptions = urlParser.parse(config.serverUrl + url)
		options = {
			hostname	:	tempOptions.hostname,
			port		:	tempOptions.port,
			path		:	tempOptions.pathname,
			method		:	method,
			encoding	:	"utf-8"
		}
  		options.headers = req.headers;
  		//默认传递json数据
  		data = JSON.stringify( data );

  		switch( req.protocol ){
			case "http:":
				httpClient	=	httpNative;
			break;

			case "https:":
				httpClient	=	httpsNative;
			break;

			default:
				httpClient	=	httpNative;
		}

  		return new Promise( ( resolve, reject ) => {
			let request = httpClient.request( options, function( response ){
				if( response.statusCode !== 200 ){
					reject( new Error( "httpReuest error, status : " + response.statusCode ) );
				}
				let result, buf, bufArr, bufLen;
				result	=	{
					httpVersion		:	response.httpVersion,
					httpStatusCode	:	response.statusCode,
					headers			:	response.headers,
					body			:	"",
					trailers		:	response.trailers
				};
				bufArr	=	[];
				bufLen	=	0;
				return response.on( "data", function( chunk ){
					bufArr.push( chunk );
					bufLen	+=	chunk.length;
				}).on( "end", function(){
					try{
						buf		=	Buffer.alloc( bufLen );
						for( let i = 0, pos = 0; i < bufArr.length && pos < bufLen; i++ ){
							bufArr[ i ].copy( buf, pos );
							pos		+=	bufArr[ i ].length;
						}
						//必须返回全部信息才能让客户端和服务器创建连接
						//resolve( JSON.parse( buf.toString() ) );
						result.body		=	buf.toString();
						resolve( result );
					}catch( e ){
						reject( e );
					}
				});
			});

			request.on( "error", error => {
				log.error( "request : " + error.message, "Http" );
				reject( error );
			});

			if( data !== null ){
				request.write( data );
			}

			request.end();
		}).catch( e => {
			log.error( e.message, "Http" );
			throw new Error( code.httpError.code );
		}).then( result => {
			let body = JSON.parse(result.body);

			//必须把把响应头返回给客户端
			for(let item in result.headers){
				res.set(item, result.headers[item])
			}
			switch( body.retcode ){
				case 0:
					result.body = body.retdata;
				break;

				case -1:
					this.paramError( body.retmsg );
				break;

				default:
					throw new Error( body.retcode );
			}
			return result;
		})
	}
};
