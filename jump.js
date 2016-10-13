/*! jump */
var jump = function(url) {
	if(history.pushState)
		// history.pushState(null,null,url);
	history.replaceState(null,null,url);
	//window.location.hash = url;
	//return;
	// 创建ajax引擎对象
	var xhr = null;
	try {
		// 非IE浏览器
		xhr = new XMLHttpRequest();
	} catch (e1) {
		try {
			// IE系列浏览器
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (e2) {
			// 不支持Ajax直接跳转
			window.location.href = url;
			return;
		}
	}

	// 打开
	xhr.open("get", url, true);
	// 发送
	//xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// 标记为ajax请求
	//xhr.setRequestHeader("X-Requested-With", "");
	xhr.send(null);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var res = xhr.responseText;
			document.open();
			document.write(res);
			document.close();

		}
	};
};

// window.addEventListener('popstate', function(event) {
// 	var history = event;
// 	document.open();
// 	document.write(event.state);
// 	document.close();
// });

(function(){
	//var hash = window.location.hash;
	//if('' != hash){
	//	jump(hash);
	//}
	var website_host = window.location.host;
	var a_list = document.getElementsByTagName('a');
	for(var i = 0;i< a_list.length;i++){
		//console.log(a_list[i]);
		var a = a_list[i];
		//a.setAttribute('target','_blank');
		if(website_host == a.host){
			a.href = 'javascript:jump("'+a.href+'")';
		}
	}
})();