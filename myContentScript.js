/*Copyright (c) [2014] [XING Yue]
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

console.log('script loaded successfully');
names=['form_id','login_id','login_name','pass_id','pass_name','cap_id','cap_input'];
names_=['form_id','login_id','pass_id','cap_id','cap_input'];
console.log(names);

$(document).ready(function(e) {
	var send=chrome.runtime.sendMessage;
	a=document.getElementsByClassName('alert alert-danger');
	b=document.getElementsByClassName('alert alert-success');
	if(b.length>0){send({'suc':'1','type':'result'});send({'type':'init'});return;}
	else if(a.length>0){alert('username or password is wrong!');send({'suc':'0','error':'wrong captcha or username/password!','type':'result'});send({'type':'init'});return;}
	else{console.log(123);send({'type':'init1'});return;}
});


chrome.runtime.onMessage.addListener(function(request,sender,send) {
	console.log(request);
    if (request.type == "filling") {
		//check validation
		for(i in names){
			if(request[names[i]]==undefined){
				chrome.runtime.sendMessage({'type':'result','error':names[i]+' is empty!','suc':'0'});
				return;
			}
		}
		for(i in names_){
			if(document.getElementById(request[names_[i]])==undefined){
				chrome.runtime.sendMessage({'type':'result','error':names_[i]+' not found!','suc':'0'});
				return;
			}
			console.log(request[names_[i]]);
		}
		//process image
		var	image=new Image();	
		image.src=document.getElementById(request.cap_id).src;
		var	canvas=document.createElement('canvas');	
		canvas.height=image.height;	
		canvas.width=image.width;	
		var	imgDraw	=canvas.getContext('2d');	
		imgDraw.drawImage(image,0,0);	
		var	string=OCRAD(imgDraw);
		//fill in
		document.getElementById(request.login_id).value=request.login_name;
		document.getElementById(request.pass_id).value=request.pass_name;
		document.getElementById(request.cap_input).value=string;
    }
    if (request.type == "filling1") {
		//check validation
		if(request['filling']==undefined || request['filling']=='0'){return;}
		for(i in names){
			if(request[names[i]]==undefined){
				//send({'error':names[i]+' is empty!','suc':'0'});
				chrome.runtime.sendMessage({'type':'result','error':names[i]+' is empty!','suc':'0'});
				return;
			}
		}
		for(i in names_){
			if(document.getElementById(request[names_[i]])==undefined){
				//send({'error':names_[i]+' not found!','suc':'0'});
				chrome.runtime.sendMessage({'type':'result','error':names_[i]+' not found!','suc':'0'});
				return;
			}
			console.log(request[names_[i]]);
		}
		//process image
		var	image=new Image();	
		image.src=document.getElementById(request.cap_id).src;
		var	canvas=document.createElement('canvas');	
		canvas.height=image.height;	
		canvas.width=image.width;	
		var	imgDraw	=canvas.getContext('2d');	
		imgDraw.drawImage(image,0,0);	
		var	string=OCRAD(imgDraw);
		//fill in
		document.getElementById(request.login_id).value=request.login_name;
		document.getElementById(request.pass_id).value=request.pass_name;
		document.getElementById(request.cap_input).value=string;
		if(request.submit_==1){
			document.getElementById(request.form_id).submit();
		}
		chrome.runtime.sendMessage({'type':'result','suc':'1','error':'success'});
    }
});