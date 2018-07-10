export default class {
	static formatDate(date) {
		date = new Date(date);
		let year, month, day, hour, minute, second;
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		hour = date.getHours();
		minute = date.getMinutes();
		second = date.getSeconds();
		//guiqing
		//console.log('压缩打包不会去掉console.log')

		return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
	}
}

function formatNumber(num){
	num = num.toString();
	return num[1] ? num : '0'+num;
}