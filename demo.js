//点击开始游戏--》startpage消失--》游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右--》改变方向运动
//判断吃到食物--》食物消失，蛇加一
//判断游戏结束，弹出框
var word=document.getElementById('word');
var startPage=document.getElementById('startPage');
var startP=document.getElementById('startp');
var lose =document.getElementById('lose');
var loserScore =document.getElementById('loserScore');
var content =document.getElementById('content');

var snakeMove;
var speed=300;
var startGameBool=true;//是否可以开始游戏
var startPaushBool=true;//是否可以暂停了
var close=document.getElementById('close');
var scoreBox=document.getElementById('score');
var startBtn=document.getElementById('startBtn');
init();
function init(){
	//地图
	this.mapW=parseInt(getComputedStyle(content).width);
	this.mapH=parseInt(getComputedStyle(content).height);
	this.mapDiv=content;
	//食物
	this.foodW=20;
	this.foodH=20;
	this.foodX=0;
	this.foodY=0;
	//陷阱
	this.wellW=20;
	this.wellH=20;
	this.wellX=0;
	this.wellY=0;
 	//蛇
 	this.snakeW=20;
 	this.snakeH=20;
 	this.snakeBody=[[3,1,'head'],[2,1,'body'],[1,1,'body']];
 	//游戏属性
 	this.direct='right';

 	this.left=false;
 	this.right=false;
 	this.up=true;
 	this.down=true;
 	this.score=0;
     scoreBox.innerHTML = this.score;
    bindEvent();

}

 
function startGame(){
	startPage.style.display = 'none';
	 startP.style.display = 'block';
	food();
	snake();
	well();
	well();
	well();
 

}
 



function food(){
	 var food=document.createElement('div');
	 food.style.width=this.foodW+'px';
	 food.style.height=this.foodH+'px';
	 food.style.position='absolute';
	 this.foodX=Math.floor(Math.random()*(this.mapW/20));
	 this.foodY=Math.floor(Math.random()*(this.mapH/20));
	 food.style.left=this.foodX*20+'px';
	 food.style.top=this.foodY*20+'px';
	 food.style.position = 'absolute';
	 this.mapDiv.appendChild(food).setAttribute('class','food');

}
function well(){
	 var well=document.createElement('div');
	 well.style.width=this.wellW+'px';
	 well.style.height=this.wellH+'px';
	 well.style.position='absolute';
	 this.wellX=Math.floor(Math.random()*(this.mapW/20));
	 this.wellY=Math.floor(Math.random()*(this.mapH/20));
	 well.style.left=this.wellX*20+'px';
	 well.style.top=this.wellY*20+'px';
	 well.style.position = 'absolute';
	 this.mapDiv.appendChild(well).setAttribute('class','well');

}





function snake(){

	for(var i=0;i<this.snakeBody.length;i++){
		var snake=document.createElement('div');
		snake.style.width=this.snakeW+'px';
		snake.style.height=this.snakeH+'px';
		snake.style.position='absolute';
		snake.style.left=this.snakeBody[i][0]*20+'px';
		snake.style.top=this.snakeBody[i][1]*20+'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch(this.direct){

		case 'right':
		
		break;
		case 'up':
		snake.style.transform='rotate(270deg)';
		break;
		case 'left':
		snake.style.transform='rotate(180deg)';
		break;
		case 'down':
		snake.style.transform='rotate(90deg)';
		break;
		default:
		break;


		}
	}

}



function move(){

	for(var i=this.snakeBody.length-1;i>0 ;i--){

		this.snakeBody[i][0]=this.snakeBody[i-1][0];
		this.snakeBody[i][1]=this.snakeBody[i-1][1];

		 
	}

	 switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;    
            break;
        default:
            break;

    }

	removeClass('snake');
	snake();

	if(this.snakeBody[0][0]==this.foodX&&this.snakeBody[0][1]==this.foodY){
		var snakeEndX=this.snakeBody[this.snakeBody.length-1][0];
		var snakeEndY=this.snakeBody[this.snakeBody.length-1][1];


		switch(this.direct){

		case 'right':
		this.snakeBody.push([snakeEndX+1,snakeEndY,'body']);
		break;
		case 'up':
		this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
		break;
		case 'left':
		this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
		break;
		case 'down':
		this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
		break;
		default:
		break;

	}

 this.score+=1;
 if(this.score>20){
 	word.innerHTML= '哎哟 不错哟！';
 }


 if(this.score>50){
 	word.innerHTML= '真棒 比心心！！';
 }
		scoreBox.innerHTML=this.score;
		removeClass('food');
		removeClass('well');
		food();
		well();
		well();
		well();

 	}



 	if (this.snakeBody[0][0]<0||this.snakeBody[0][0]>=this.mapW/20){
 				reloadGame();


 	}
	if (this.snakeBody[0][1]<0||this.snakeBody[0][1]>=this.mapH/20){
 					reloadGame();

 	}

 	if(this.snakeBody[0][0]==this.wellX&&this.snakeBody[0][1]==this.wellY){

 		        reloadGame();
 	}

 	var snakeHX=this.snakeBody[0][0];

 	var snakeHY=this.snakeBody[0][1];
 	
 	for(var i=1;i<this.snakeBody.length;i++){

 		if(snakeHX==snakeBody[i][0]&&snakeHY==snakeBody[i][1]){

 					 reloadGame();
 		}

		 
}

}




function reloadGame(){
		removeClass("snake");
		removeClass("food");
		removeClass("well");
		clearInterval(snakeMove);
		 startP.setAttribute('src', './img/start.png');
		this.snakeBody=[[3,1,'head'],[2,1,'body'],[1,1,'body']];
		this.direct='right';

 	this.left=false;
 	this.right=false;
 	this.up=true;
	 this.down=true;
	 startPauseBool = true;
    startGameBool = true;	 
	lose.style.display='block';
	loserScore.innerHTML=this.score;
	this.score=0;
	scoreBox.innerHTML=this.score;
}






function removeClass(className){
		var ele=document.getElementsByClassName(className);
		while(ele.length>0){


			ele[0].parentNode.removeChild(ele[0]);
		}
}





function setDerict(code){


	switch(code){

		case 37:
		if(this.left){
			this.direct='left';
			this.left=false;
			this.right=false;
			this.up=true;
			this.down=true;

		}
		break;
		 
		 case 38:
		if(this.up){
			this.direct='up';
			this.left=true;
			this.right=true;
			this.up=false;
			this.down=false;

		}
		break;

		 case 39:
		if(this.right){
			this.direct='right';
			this.left=false;
			this.right=false;
			this.up=true;
			this.down=true;

		}
		break;
		 
		 

		 	 case 40:
		if(this.down){
			this.direct='down';
			this.left=true;
			this.right=true;
			this.up=false;
			this.down=false;

		}
		break;
		  default:
            break;
	}
}





 function bindEvent(){

 
	close.onclick=function(){
		
		lose.style.display='none';
	}


	startBtn.onclick=function(){
			startAndPaush();

	}

	startP.onclick=function(){

		startAndPaush();


	}
 }






 function startAndPaush(){
	 	if(startPaushBool){
	 		if(startGameBool){

	 			startGame();
	 			startGameBool=false;
          
	 		}

	 	startP.setAttribute('src','./img/pause.png');
	 	snakeMove=setInterval(function(){
			move();

		},speed);

	 	document.onkeydown=function(e){
	 		var code=e.keyCode;
	 		setDerict(code);
	};
 
	startPaushBool=false;

	 	}else{
	 		startP.setAttribute('src','./img/start.png');
	 		clearInterval(snakeMove);
	 		document.onkeydown=function(e){

	 			e.returnValue=false;
	 			return false;
	 		};
	 		startPaushBool=true;

	 	}


	 }
