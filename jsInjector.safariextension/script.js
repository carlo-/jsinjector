/**
 * script.js
 *
 * Created by carlo- on 21/01/2018.
 * Copyright © 2018 Carlo Rapisarda. All rights reserved.
 *
 */

function getTask() {
	var pageData = { location: window.location };
    safari.self.tab.dispatchMessage("getTask", JSON.stringify(pageData));
}

function inject(jsText) {
	var injScriptElem = document.createElement("script");
	injScriptElem.innerHTML = jsText;
	document.body.appendChild(injScriptElem);
}
 
function getAnswer(event) {
    if (event.name === "receivedTask" && event.message) {
        inject(event.message);
        console.log("jsInjector -|===-");
    }
}

safari.self.addEventListener("message", getAnswer, false);
 
getTask();
