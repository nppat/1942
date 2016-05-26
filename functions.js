
var hero = {
	x: 500,
	y: 300
}

var enemies = [{x:50, y:50},{x:250, y:150},{x:550, y:50},{x:150, y:75},{x:220, y:100},{x:300, y:300},{x:25, y:40}];

var bullets = [];

var score = 0;

function displayHero(){  //Display the hero airplane
	document.getElementById('hero').style['top'] = hero.y + "px";
	document.getElementById('hero').style['left'] = hero.x + "px";
	// console.log(displayHero);
}

function displayEnemies(){  //Get enemies and display
	var output = '';
	for(i=0; i<enemies.length; i++){
		output += "<div class='enemy1' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
	}
	document.getElementById('enemies').innerHTML = output;
}

function moveEnemies(){
	for(var i=0; i<enemies.length; i++){
		enemies[i].y += 5;

		if(enemies[i].y > 384){
			enemies[i].y = 0;
			enemies[i].x = Math.random()*700;
		}
	}
}
function moveBullets(){
	for(var i=0; i<bullets.length; i++){
		bullets[i].y -= 5;
		if(bullets[i] > 0){
			bullets[i] = bullets(bullets.length - 1);
			bullets.pop();
		}
	}
}
function displayBullets(){
	var output = '';
	for(var i=0; i<bullets.length;i++){
		output += "<div class='bullet' style='top:" + bullets[i].y+"px; left:" + bullets[i].x+"px; '></div>";
	}
	document.getElementById('bullets').innerHTML = output;
}

function displayScore(){
	document.getElementById('score').innerHTML = score;
}

function gameLoop(){
	displayHero(); //Display hero
	moveEnemies(); //Moves the enemy planes
	displayEnemies(); //Display enemy planes
	moveBullets(); //Move bullets on screen
	displayBullets(); //Display the bullets
	detectCollision(); //Dectect collision of enemey and bullet, add 10 to score
	planeCollision(); //Detect when hero and enemy collide, subtract 500 from score     
	displayScore(); //Display score
}

function detectCollision(){
	for(var i=0; i<bullets.length; i++){
		for(var j=0; j<enemies.length; j++){
			if(Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10) {
				console.log('hit');
				score += 10;
				displayScore();
			}
		}
	}
}

function planeCollision(){
	for(var j=0; j<enemies.length; j++){
		if(Math.abs(hero.x - enemies[j].x) < 5 && Math.abs(hero.y - enemies[j].y) < 5) {
			score -= 500;
			displayScore();
		}
	}
}

setInterval(gameLoop, 100);

//Key strokes
document.onkeydown = function(a) {
	if(a.keyCode == 37){
		hero.x -= 10;
	}else if(a.keyCode == 39){
		hero.x += 10;
	}else if(a.keyCode == 38){
		hero.y -= 10;
	}else if(a.keyCode == 40){
		hero.y += 10;
	}else if(a.keyCode == 32){
		bullets.push({x: hero.x+8, y:hero.y-15});
		displayBullets();
	}
}

