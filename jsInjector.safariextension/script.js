function getTask() {
	var pageData = {
    	location: window.location
    };
    safari.self.tab.dispatchMessage("getTask", JSON.stringify(pageData));
}

function inject(jsText) {
	var injScriptElem = document.createElement("script");
	injScriptElem.innerHTML = jsText;
	document.body.appendChild(injScriptElem);
}
 
function getAnswer(event) {
    if (event.name === "receivedTask" && event.message) {
        console.log("injection");
        inject(event.message);
    }
}

safari.self.addEventListener("message", getAnswer, false);
 
getTask();










/*

if (window.location.href === "https://www.kth.se/student/minasidor/kurser/?l=en_UK") {
	
	var injScriptElem = document.createElement("script");
	
	injScriptElem.innerHTML = (function () {
		//__ScriptInj__

		toggleDetails();

		var coursesRows = document.getElementById("courselistresults").getElementsByTagName("tbody")[0].children;

		for (var i = 0; i < coursesRows.length; i++) {
			coursesRows[i].setAttribute("onMouseOver","coursesRows["+i+"].setAttribute('style','background-color:#ddd')");
			coursesRows[i].setAttribute("onMouseOut","coursesRows["+i+"].setAttribute('style','background-color:#FFF')");
		}

		//__ScriptInj__
	}).toString().split("//__ScriptInj__")[1]

	document.body.appendChild(injScriptElem);
}

*/
