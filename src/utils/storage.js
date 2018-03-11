export default class {
	//
	static setItem({key, data}){
		if(typeof data === 'object'){
			data = JSON.stringify(data)
		}

		localStorage.setItem(key, data);
	}

	/*
	*	type @param  value(int, float, object, array)
 	*/
	static getItem({key, type}){
		console.log(localStorage.getItem(key))
		switch(type){
			case 'int':
				return Number.parseInt(localStorage.getItem(key));
				break;
			case 'float':
				return Number.parseFloat(localStorage.getItem(key));
				break;
			case 'object':
			case 'array':
				return JSON.parse(localStorage.getItem(key));
				break;
			default:
				return localStorage.getItem(key);
				break;

		}
	}

	static removeItem(key){
		localStorage.removeItem(key)
	}
}