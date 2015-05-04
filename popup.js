/*
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

/* Javascript for popup.html
 * Only communicate with background script */

/*Variables*/
names=['form_id','login_id','login_name','pass_id','pass_name','cap_id','cap_input'];
send=chrome.runtime.sendMessage;
$(function(){
	send({'type':'init'},function(resp){
		console.log(resp);
		for(i in names){
			$('#'+names[i]).val(resp[names[i]]);
		}
		document.getElementById('mess').textContent=resp['error'];
	})
	$('#save_').click(function(){
		document.getElementById('mess').textContent='';
		console.log(123);
        save_();
    });
	$('#save_fill').click(function(){
		document.getElementById('mess').textContent='';
		console.log(234);
		save_fill();
	});
})

function save1_(){
	content={};
	for(i in names){
		content[names[i]]=document.getElementById(names[i]).value;
	}
	content['type']='save';
	content['filling']='1';
	a=document.getElementById('submit_');
	if(a.checked==true){content['submit_']='1';}
	else{content['submit_']='0';}
	send(content,function(){});
}

/*Load popup window*/

function save_(){
	content={};
	for(i in names){
		content[names[i]]=document.getElementById(names[i]).value;
	}
	content['type']='save';
	content['filling']='0';
	a=document.getElementById('submit_');
	if(a.checked==true){content['submit_']='1';}
	else{content['submit_']='0';}
	send(content,function(){});
}

function save_fill(){
	save1_();
	fill_();
}

var want=0;
/* The core function. Process registration. */
function fill_() {
	want=1;
	chrome.tabs.query(
		{active:true,currentWindow:true},	
		function(tabs)	{
			content['type']='filling';
			chrome.tabs.sendMessage(tabs[0].id,content,function(res){
				if(res.suc=='1'){
					document.getElementById('mess').textContent='succeed!';
					want=0;
				}
				else{
					document.getElementById('mess').textContent=res['error'];
					want=0;
				}
			});	
			console.log(content);
	});
}


chrome.runtime.onMessage.addListener(function(res, sender,send){
	if (res.type=="result") {
		if(res.suc=='1'){
			document.getElementById('mess').textContent='succeed!';
			want=0;
		}
		else{
			document.getElementById('mess').textContent=res['error'];
			want=0;
		}
	}
});