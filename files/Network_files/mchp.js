var W3CDOM = (document.createElement && document.getElementsByTagName);
var timeOutMS = 5000;
var ajaxList = new Array();
function newAJAXCommand(url, container, repeat, data){
	var newAjax = new Object();
	var theTimer = new Date();
	newAjax.url = url;
	newAjax.container = container;
	newAjax.repeat = repeat;
	newAjax.ajaxReq = null;
	if(window.XMLHttpRequest) {
		newAjax.ajaxReq = new XMLHttpRequest();
		newAjax.ajaxReq.open((data==null)?"GET":"POST", newAjax.url, true);
		newAjax.ajaxReq.send(data);
	} else if(window.ActiveXObject) {
		newAjax.ajaxReq = new ActiveXObject("Microsoft.XMLHTTP");
		if(newAjax.ajaxReq) {
			newAjax.ajaxReq.open((data==null)?"GET":"POST", newAjax.url, true);
			newAjax.ajaxReq.send(data);
		}
	}
	newAjax.lastCalled = theTimer.getTime();
	ajaxList.push(newAjax);
}
function pollAJAX() {	
	var curAjax = new Object();
	var theTimer = new Date();
	var elapsed;
	for(i = ajaxList.length; i > 0; i--)
	{
		curAjax = ajaxList.shift();
		if(!curAjax)
			continue;
		elapsed = theTimer.getTime() - curAjax.lastCalled;
		if(curAjax.ajaxReq.readyState == 4 && curAjax.ajaxReq.status == 200) {
			if(typeof(curAjax.container) == 'function'){
				curAjax.container(curAjax.ajaxReq.responseXML.documentElement);
			} else if(typeof(curAjax.container) == 'string') {
				document.getElementById(curAjax.container).innerHTML = curAjax.ajaxReq.responseText;
			}			
	    	curAjax.ajaxReq.abort();
	    	curAjax.ajaxReq = null;
			if(curAjax.repeat)
				newAJAXCommand(curAjax.url, curAjax.container, curAjax.repeat);
			continue;
		}
		if(elapsed > timeOutMS) {
			if(typeof(curAjax.container) == 'function'){
				curAjax.container(null);
			} else {
				alert("Command failed.\nConnection to Zone Protector was lost.");
			}
	    	curAjax.ajaxReq.abort();
	    	curAjax.ajaxReq = null;
			if(curAjax.repeat)
				newAJAXCommand(curAjax.url, curAjax.container, curAjax.repeat);
			continue;
		}
		ajaxList.push(curAjax);
	}
	setTimeout("pollAJAX()",250);
}
function getXMLValue(xmlData, field) {
	try {
		if(xmlData.getElementsByTagName(field)[0].firstChild.nodeValue)
			return xmlData.getElementsByTagName(field)[0].firstChild.nodeValue;
		else
			return null;
	} catch(err) { return null; }
}
setTimeout("pollAJAX()",500);
function FDis(ID) {
document.getElementById(ID).disabled = false;
}
function FEn(ID) {
document.getElementById(ID).disabled = true;
}
function FInl(ID) {
document.getElementById(ID).style.display="inline";
}
function FHid(ID) {
document.getElementById(ID).style.display="none";
}
function HIn(ID) {
document.getElementById(ID).style.left='-224px';
}
function HOut(ID) {
document.getElementById(ID).style.left='-5000px';
}
function initFileUploads() {
	if (!W3CDOM) return;
	var ffu = document.createElement('div');
	ffu.className = 'ff';
	var ff1 = document.createElement('div');
	ff1.className = 'ff1';
	var input = document.createElement('input');
	ff1.appendChild(input);
	ffu.appendChild(ff1);
	var ff2 = document.createElement('div');
	ff2.className = 'ff2';
	var image = document.createElement('img');
	image.src='images/select.gif';
	image.className = 'fi';
	ff2.appendChild(image);
	ffu.appendChild(ff2);
	var x = document.getElementsByTagName('input');
	for (var i=0;i<x.length;i++) {
		if (x[i].type != 'file') continue;
		if (x[i].parentNode.className != 'fileinputs') continue;
		x[i].className = 'file hidden';
		var clone = ffu.cloneNode(true);
		x[i].parentNode.appendChild(clone);
		x[i].relatedElement = clone.getElementsByTagName('input')[0];
		x[i].onchange = x[i].onmouseout = function () {
			this.relatedElement.value = this.value;
		}
	}
}
