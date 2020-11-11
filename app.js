document.addEventListener('DOMContentLoaded', ()=> {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15;
    let currentInvaderIndex = 0; //starting point of Alein Invaders
    let currentshooterIndex = 202; // starting point of shooter
    let AlienInvaderTakenDown = []; // alein taken down will be pushed in here
    let result = 0; // result at the beginning of the game
    let direction = 1; 
    let invaderId;
     
    let AleinInvader = [
        //array containing aleins (kinda)
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ];
    
    AleinInvader.forEach( Anything => squares[currentInvaderIndex + Anything].classList.add('invader'));
    //adding Alein Invader into Game
    squares[currentshooterIndex].classList.add('shooter');
    //adding shooter into game
    
   // moving the shooter
   function MoveShooter(e){
       //removing shooter using classlist method , using this we can access class 
       squares[currentshooterIndex].classList.remove('shooter');
        //use of switch statement
        switch (e.keyCode){
            //if the width is not equal to 0 , then we can move left    
            case 37: if(currentshooterIndex % width !== 0) currentshooterIndex -=1;
                break;
            //if the width is less then 14 , then we can move right
            case 39: if(currentshooterIndex % width < width -1) currentshooterIndex +=1;
                break;
        }
        //adding shooter using classlist method
        squares[currentshooterIndex].classList.add('shooter');
    }
    
    //moveInvader function , it Moves the aleinInvaders
    function MoveInvaders (){
        //applying the logic to the first item to check leftEdge , if equal to 0 (index) means its at leftEdge.
        const leftEdge = AleinInvader[0] % width === 0 ;
        //appling the logic to the last item to check rightEdge , if width = 14 that means its at rightEdge.
        const rightEdge = AleinInvader[AleinInvader.length -1] % width === width -1;
        // -1 for left And 1 for right
        if((leftEdge && direction === -1)||(rightEdge && direction === 1)){
            //if any of the above condition is true then direction is equal to width which is 15.
            direction = width ;
        //if already direction  is equal to width then 
        }else if (direction === width){
            //direction is positive if alein invader is at leftEdge , when width is equal to 0
            if(leftEdge) direction = 1;
            // direction is negative means that alein invader will move left , when width is !equal to 0 
            else direction = -1;
        }
        //removing Invader 
        for( let i = 0 ; i <= AleinInvader.length - 1 ; i++){
            squares[AleinInvader[i]].classList.remove('invader');
        }
        // giving direction to alein invaders , +=direction means Alein Invader will start moving
        for( let i = 0 ; i <= AleinInvader.length -1 ; i++){
            AleinInvader[i] += direction ;
        }
        // if Alein Invader does not include Space , then WE will Add 'Invader' Class .
        //basically we won't Add Alein Again , once taken Down
        for( let i=0 ; i <= AleinInvader.length -1 ; i++){
            if(!AlienInvaderTakenDown.includes(i)){
                squares[AleinInvader[i]].classList.add('invader');
            }
        }
    
    // if the Alein Invader touches or intersect shooter Then Game Will Be Over.
    if (squares[currentshooterIndex].classList.contains('invader','shooter')){
        result = 'Game Over!'; 
        resultDisplay.textContent = result ; //setting result equal to 'Game Over!'
        squares[currentshooterIndex].classList.add('boom');//once Alein Invader Touches Shooter , we will just add Boom class for Fun.
        clearInterval(invaderId);// clearing the invaderId
    }
    
    //any alein misses the shooter but it's End Of the Grid , then game Is Over Too
    for (let i=0 ; i <= AleinInvader.length -1 ; i++){
        //if any Aleins Are on the last 15 squares of the grid , "the Game Is Over"
        if(AleinInvader[i] > (squares.length - (width -1))){
            result = 'Game Over!';
            resultDisplay.textContent = result ;//setting result equal to 'Game Over!'
            clearInterval(invaderId);// clearing invaderId
        }
    
    //if alein Invader taken down is equal to number of Alein invader , then You will be declared As "winner".
    if (AlienInvaderTakenDown.length === AleinInvader.length){
        result = 'You Win!'
        resultDisplay.textContent = result ;//setting result equal to 'You Win!'
        clearInterval(invaderId);// clearing invaderId
        //removing the shooter class when game is over , it's upto you if you want to keep shooter or not , basically it's optional .
        squares[currentshooterIndex].classList.remove('shooter');
        
    }
  }
}
    //shoot function 
    function shoot(e){
        let laserId;//creating laser id
        let currentLaserIndex = currentshooterIndex; //creating current laser index
        // laser won't move by itself , we have to move it . so, MoveLaser function
        function MoveLaser (){
            //removing laser class using classlist
            squares[currentLaserIndex].classList.remove('laser');
            //we want the laser to Move up . so, width - 1 , which will help the laser to upward.
            currentLaserIndex -= width;
            //then adding laser class again  using classlist 
            squares[currentLaserIndex].classList.add('laser');
            // checking if current laser index contains Alein Invader . if yes , then 
            if(squares[currentLaserIndex].classList.contains('invader')){
                //removing Alein Invader using classlist method.
                squares[currentLaserIndex].classList.remove('invader');
                //removing laser using classlist method
                squares[currentLaserIndex].classList.remove('laser');
                //at last adding boom effect just for fun And it looks Good as well
                squares[currentLaserIndex].classList.add('boom');
                
                //we want the boom effect to go after one second . so, we have used set time out method (built-in)
                setTimeout (() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);//clearing the laser id.
                
                //if alein Invaders Contain current laser Index then
                //indexOf() method returns the position of the first occurrence of a specified value in a String (in this case , it will return first occurrence of alein Invader who are taken down by laser).
                const alienTakenDown = AleinInvader.indexOf(currentLaserIndex);
                //then we are adding alein Taken Down to AleinInvaderTakenDown Array using push method
                AlienInvaderTakenDown.push(alienTakenDown);
                result++ ; //result incrementation is directly proportional to Number of Alein Taken Down. means score is 1 , if one Alein is taken down And so On.....
                resultDisplay.textContent = result;
               }
                // if the laser is in the very first 15 sqaures , we will clear the laserID interval and remove the laser class from the grid.
                if(currentLaserIndex < width){
                    clearInterval(laserId);
                    setTimeout (() => squares[currentLaserIndex].classList.remove('laser'), 100);
                }
            
        }
        
//    document.addEventListener('keyup', e () => {
//        if(e.keyCode === 32){
//            laserID = setInterval(MoveLaser , 100);
//        }
//    })
    
    //setting the MoveLaser Function when SpaceBar is pressed
    switch (e.keyCode){
        case 32: laserId = setInterval (MoveLaser , 100);
            break;
         }
    }
    
    //setting the MoveInvaders function.
    invaderId = setInterval (MoveInvaders , 500);
    //setting MoveShooter function.
    document.addEventListener('keydown', MoveShooter);
    //setting shoot Function.
    document.addEventListener('keyup', shoot);

    
})