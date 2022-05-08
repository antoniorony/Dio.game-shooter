class Game {

    constructor() {
        this.yourShip = document.querySelector('.player-shooter');
        this.playArea = document.querySelector('#main-play-area');

        window.addEventListener('keydown', (event)=>{this.flyAhip(event)});
    }

    flyAhip(event) {
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
        let xPosition = Number(window.getComputedStyle(this.yourShip).getPropertyValue('left'));
        let yPosition = Number(window.getComputedStyle(this.yourShip).getPropertyValue('top'));
        let newLaser = document.createElement('img');
        newLaser.src = 'img/shoot.png';
        newLaser.classList.add('laser');
        newLaser.style.left = `${xPosition}px`;
        newLaser.style.top = `${yPosition - 10}px`; 
        return newLaser;
    }
    
    moveLaser(laser) {
        let laserInterval = setInterval(()=>{
            let xPosition = Number(laser.style.left.replace('px', ''));
            //let yPosition = Number(laser.style.top);
            if(xPosition > 340) {
                laser.remove();
            } else {
                laser.style.left = `${xPosition + 8}px`;
            }
        }, 100)
    }

}   