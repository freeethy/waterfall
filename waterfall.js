window.onload = function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":"001.jpg"},{"src":"002.jpg"},{"src":"003.jpg"},{"src":"004.jpg"},{"src":"005.jpg"}]};
	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将当前数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}

	}
}
function waterfall(parent,box){
	var oParent = document.getElementById('main');
	var boxArr = getByClass(oParent,box);
	var boxW = boxArr[0].offsetWidth;
	var Wwidth = document.documentElement.clientWidth;
	var cols = Math.floor(Wwidth / boxW);
	var topArr = [];
	//console.log(col);
	oParent.style.cssText = 'width:'+boxW*cols+'px;margin:0 auto';
	for(var i=0;i<boxArr.length;i++){
		if(i<cols){
			topArr.push(boxArr[i].offsetHeight);
		}else{
			var minH = getMin(topArr);
			//console.log(topArr+' '+minH);
			var index = getMinhIndex(topArr,minH);
			//console.log(index);
			boxArr[i].style.position='absolute';
			boxArr[i].style.top = minH+'px';
			boxArr[i].style.left = boxArr[index].offsetLeft+'px';
			topArr[index]+=boxArr[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(),
		oElements = parent.getElementsByTagName('*');
	for(var e in oElements){
		if(oElements[e].className == clsName){
			boxArr.push(oElements[e]);
		}
	}
	return boxArr;
}

function getMin(arr){
	return Math.min.apply(null,arr);
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//判断是否具备加载图片的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clentHeight || document.documentElement.clentHeight;
	return (lastBoxH<scrollTop+height)? true : false;
}
