class Game {

    constructor() {
        this.yourShip = document.querySelector('.player-shooter');
        this.playArea = document.querySelector('#main-play-area');
        this.aliensImg = ['../img/monster-1.png', '../img/monster-2.png', '../img/monster-3.png'];
        this.instrutionsText = document.querySelector('.game-instrutions');
        this.startButtom = document.querySelector('.start-buttom');
        this.limiteDeAliens = 10;
        
        this.clickButtom();
    }

    clickButtom() {
        this.startButtom.addEventListener('click', (event) =>{
           this.playGame(); 
        });
    }

    flyShip(event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.moveUp();
        } else if(event.key === 'ArrowDown') {
            event.preventDefault();
            this.moveDown();
        } else if(event.key === " "){
            event.preventDefault();
            this.fireLaser();
        }
    }

    moveUp() {
        let topPosition = getComputedStyle(this.yourShip).getPropertyValue('top');
        if (Number(topPosition.replace('px', '')) <= 0) {
            return;
            
        } else {
            let position = parseInt(topPosition);
            position -= 50;
            this.yourShip.style.top = `${position}px`;
        }
    }

    moveDown() {
        let topPosition = getComputedStyle(this.yourShip).getPropertyValue('top');  
        if (Number(topPosition.replace('px', '')) > 500) {
            return;
        } else {

            let position = parseInt(topPosition);
            position += 50;
            this.yourShip.style.top = `${position}px`;
        }
    }


    fireLaser() {
        let laser = this.createLaserElement();
        this.playArea.appendChild(laser);
        this.moveLaser(laser);
    }

    createLaserElement() {
        let xPosition = Number(window.getComputedStyle(this.yourShip).getPropertyValue('left').replace('px', ''));
        let yPosition = Number(window.getComputedStyle(this.yourShip).getPropertyValue('top').replace('px', ''));
        let newLaser = document.createElement('img');
        newLaser.src = '../img/shoot.png';
        newLaser.classList.add('laser');
        newLaser.style.left = `${xPosition}px`;
        newLaser.style.top = `${yPosition - 10}px`; 
        return newLaser;
    }
    
    moveLaser(laser) {
        let laserInterval = setInterval(()=>{
            let xPosition = Number(laser.style.left.replace('px', ''));
            let aliens = document.querySelectorAll('.alien');

            aliens.forEach((alien)=>{
                if (this.checkLaserCollision(laser, alien)) {
                    alien.src = '../img/explosion.png';
                    alien.classList.remove('alien');
                    alien.classList.add('dead-alien');

                }
            });

            if(xPosition >= 340) {
                laser.remove();
            } else {
                laser.style.left = `${xPosition + 8}px`;
            }
        }, 10)
    }

    createAlien() {
        let newAlien = document.createElement('img');
        let alienSprite = this.aliensImg[Math.floor(Math.random(this.aliensImg.length))];
   /*     if (Number(newAlien.style.top.replace('px', ''))>250) {
            return;
        }*/
        //let alienSprite = this.aliensImg[1];
        newAlien.src = alienSprite;
        newAlien.classList.add('alien');
        newAlien.classList.add('alien-transition');
        newAlien.style.left = '370px';
        newAlien.style.top = `${Math.floor(Math.random() * 8)+30}px`;
        this.playArea.appendChild(newAlien);
        this.moveAlien(newAlien);    
    }

    moveAlien(alien) {
        let moveAienInterval = setInterval(()=>{
            let xPosition = Number(window.getComputedStyle(alien).getPropertyValue('left').replace('px', ''));
            let yPosition = Number(window.getComputedStyle(alien).getPropertyValue('top').replace('px', ''));
            if (xPosition <= 50) {
                if (Array.from(alien.classList).includes('.dead-alien')) {
                    alien.remove();
                } else if (xPosition >= Number(this.yourShip.style.left.replace('px', '')) &&
                           yPosition >= Number(this.yourShip.style.left.replace('px', '')))  {
                    console.log(xPosition, yPosition );
                    this.gameOver();
                }

            } else {
                alien.style.left = `${xPosition - 4}px`;
            }
        }, 30);
    }

    checkLaserCollision(laser, alien) {
        
        let laserTop = Number(laser.style.top.replace('px', ''));
        let laserLeft = Number(laser.style.left.replace('px', ''));
        let laserBottom = laserTop - 20;
        let alienTop = Number(alien.style.top.replace('px', ''));
        let alienLeft = Number(alien.style.left.replace('px', ''));
        let alienBottom = alienTop - 30;

        if (laserLeft != 34 && laserLeft - 40 >= alienLeft) {
            if (laserTop <= alienTop && laserTop >= alienBottom) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    clearInterval(intervalo) {
        window.clearInterval(intervalo);
    }

    gameOver() {
        window.removeEventListener('keydown', this.flyShip);
        this.clearInterval(this.alienInterval);
        let aliens = document.querySelectorAll('.alien');
        aliens.forEach((alien)=>{
            alien.remove();
        });

        let lasers = document.querySelectorAll('.laser');
        lasers.forEach((laser)=> {
            laser.remove();
        });

        setTimeout(()=>{
            alert('game over!');
            this.yourShip.style.top = "250px";
            this.startButtom.style.display = "block";
            this.instrutionsText.style.display = "block";
            
        });
    }

    playGame() {
        this.startButtom.style.display = 'none';
        
        if (this.instrutionsText != null) {
            this.instrutionsText.style.display = 'none';    
        }
        
        window.addEventListener('keydown', (event)=>{this.flyShip(event)})
        this.alienInterval = setInterval(()=>{
          this.createAlien();  
      }, 2000);
    }
}   