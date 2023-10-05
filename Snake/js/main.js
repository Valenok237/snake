let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for(let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');

let x = 1;
    y = 10;

for(let i = 0; i < excel.length; i++){
    if(x > 10){
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
};

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')];

for(let i = 1; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead');

let food;

function createFood() {
    function generateFood() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    };
    let foodCoordinates = generateFood();
    food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]');

    while(food.classList.contains('snakeBody')){
        let foodCoordinates = generateFood();
        food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]');
    };

    food.classList.add('food');
};

createFood();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.classList.add('score');

let score = 0;
input.value = `Ваши очки: ${score}`;

function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction == 'right'){
        if(snakeCoordinates[0] < 10){
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left'){
        if(snakeCoordinates[0] > 1){
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction =='up'){
        if(snakeCoordinates[1] < 10){
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if (direction == 'down'){
        if(snakeCoordinates[1] > 1){
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') == food.getAttribute('posX') && snakeBody[0].getAttribute('posY') == food.getAttribute('posY')){
        food.classList.remove('food');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createFood();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if (snakeBody[0].classList.contains('snakeBody')){
        setTimeout(() =>{
            alert(`Игра окончена! Ваш результат: ${score}`);
        }, 500);
        clearInterval(interval);
    }
     
    snakeBody[0].classList.add('snakeHead');
    for(let i = 1; i < snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', function (e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
});