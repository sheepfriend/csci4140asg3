/*
 *
 *Permission is hereby granted, free of charge, to any person obtaining a copy
 *of this software and associated documentation files (the "Software"), to deal
 *in the Software without restriction, including without limitation the rights
 *to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *copies of the Software, and to permit persons to whom the Software is
 *furnished to do so, subject to the following conditions:
 *
 *The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.
 *
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 * 
 */

/* Background script runs from here */

console.log("Background runs!");
names=['form_id','login_id','login_name','pass_id','pass_name','cap_id','cap_input','filling'];
var content;
chrome.storage.local.get(names,function(items){
	console.log("load successfully");
	content=items;
});
console.log(content);

chrome.runtime.onMessage.addListener(function(request, sender,send){
	if (request.type=="save") {
		console.log(request);
		chrome.storage.local.set(request,function(){console.log("save successfully")});
		content=request;
	}
	if (request.type=="init") {
		send(content);
	}
	if (request.type=="init1") {
		chrome.tabs.query(
			{active:true,currentWindow:true},	
			function(tabs)	{
				content['type']='filling1';
				chrome.tabs.sendMessage(tabs[0].id,content,function(res){});	
				console.log(content);
		});
	}
});
