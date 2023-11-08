'use strict';

const rightPic = document.querySelector('section img:first-child');
const middlePic = document.querySelector('section img:nth-child(2)');
const leftPic = document.querySelector('section img:nth-child(3)');
const div = document.querySelector('div');
let maxClicks = 25;
let clickCounter = 0;
let productNames = [];
let productClicks = [];
let productViews = [];

function Product(productName, src, alt) {
    this.productName = productName;
    this.src = src;
    this.alt = alt;
    this.views = 0;
    this.clicks = 0;
}
Product.allProducts = [];
Product.workingProducts = [];


const bag = new Product('bag', 'img/bag.jpg', 'r2d2 suitcase');
const banana = new Product('banana', 'img/banana.jpg', 'banana shaped banana slicer');
const bathroom = new Product('bathroom', 'img/bathroom.jpg', 'toilet paper roll stand that doubles as an ipad stand');
const boots = new Product('boots', 'img/boots.jpg', 'open toed rain boots');
const breakfast = new Product('breakfast', 'img/breakfast.jpg', 'a machine that makes eggs, bacon, coffee, and toast all in one');
const bubblegum = new Product('bubblegum', 'img/bubblegum.jpg', 'meatball bubblegum');
const chair = new Product('chair', 'img/chair.jpg', 'plastic chair with the seat bubbling outward');
const cthulhu = new Product('cthulhu', 'img/cthulhu.jpg', 'cthulhu action figure');
const dogDuck = new Product('dog duck', 'img/dog-duck.jpg', 'dog muzzle shaped like a duck bill');
const dragon = new Product('dragon', 'img/dragon.jpg', 'canned dragon meat');
const pen = new Product('pen', 'img/pen.jpg', 'pens with silverware shaped caps');
const petSweep = new Product('pen sweep', 'img/pet-sweep.jpg', 'dog slippers shaped like sweepers');
const scissors = new Product('scissors', 'img/scissors.jpg', 'scissors with a stencil writing out "pizza"');
const shark = new Product('shark', 'img/shark.jpg', 'shark shaped sleeping bag');
const sweep = new Product('sweep', 'img/sweep.png', 'baby onesie with sweepers attached');
const tauntaun = new Product('tauntaun', 'img/tauntaun.jpg', 'tauntaun shaped sleeping bag');
const unicorn = new Product('unicorn', 'img/unicorn.jpg', 'canned unicorn meat');
const waterCan = new Product('water can', 'img/water-can.jpg', 'watering can that shoots water back into itself');
const wineGlass = new Product('wine glass', 'img/wine-glass.jpg', 'egg shaped wine glass with one narrow opening');

Product.allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

// Fisher Yates function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

Product.workingProducts = Product.allProducts.slice();

let rightPicInstance = Product.workingProducts.pop();
let middlePicInstance = Product.workingProducts.pop();
let leftPicInstance = Product.workingProducts.pop();



function rightClick() {
    leftPicInstance.clicks += 1;
    clickCounter += 1;

    rightPicInstance = Product.workingProducts.pop();
    middlePicInstance = Product.workingProducts.pop();
    leftPicInstance = Product.workingProducts.pop();
    renderImg();
    if (Product.workingProducts.length <= 1) {
        Product.workingProducts = Product.allProducts.slice();
        shuffleArray(Product.workingProducts);
    }
}

function middleClick() {
    middlePicInstance.clicks += 1;
    clickCounter += 1;


    rightPicInstance = Product.workingProducts.pop();
    middlePicInstance = Product.workingProducts.pop();
    leftPicInstance = Product.workingProducts.pop();
    renderImg();
    if (Product.workingProducts.length <= 1) {
        Product.workingProducts = Product.allProducts.slice();
        shuffleArray(Product.workingProducts);
    }
}

function leftClick() {
    leftPicInstance += 1;
    clickCounter += 1;

    rightPicInstance = Product.workingProducts.pop();
    middlePicInstance = Product.workingProducts.pop();
    leftPicInstance = Product.workingProducts.pop();
    renderImg();
    if (Product.workingProducts.length <= 1) {
        Product.workingProducts = Product.allProducts.slice();
        shuffleArray(Product.workingProducts);
    }
}

function renderImg() {

    rightPic.setAttribute('src', rightPicInstance.src);
    rightPic.setAttribute('alt', rightPicInstance.alt);
    rightPicInstance.views += 1;

    middlePic.setAttribute('src', middlePicInstance.src); middlePic.setAttribute('alt', middlePicInstance.alt);
    middlePicInstance.views += 1;

    leftPic.setAttribute('src', leftPicInstance.src);
    leftPic.setAttribute('alt', leftPicInstance.alt);
    leftPicInstance.views += 1;

    rightPic.addEventListener('click', rightClick);
    middlePic.addEventListener('click', middleClick);
    leftPic.addEventListener('click', leftClick);


    if (clickCounter == maxClicks) {
        rightPic.removeEventListener('click', rightClick);
        middlePic.removeEventListener('click', middleClick);
        leftPic.removeEventListener('click', leftClick);

        const button = document.createElement('button');
        div.appendChild(button);
        button.textContent = 'View Results';
        button.addEventListener('click', buttonClick);
    }
}

function buttonClick() {
    for (let i = 0; i < Product.allProducts.length; i++) {
        
        for (let i = 0; i < Product.allProducts.length; i++) {
            productNames.push(Product.allProducts[i].productName);
            productClicks.push(Product.allProducts[i].clicks);
            productViews.push(Product.allProducts[i].views);
        }

        const data = {
            labels: productNames,
            datasets: [{
                label: 'clicks',
                data: productClicks,
                backgroundColor: ['rgba(255, 100, 169, 0.4)'],
                borderColor: ['rgba(255, 100, 169)'],
                borderWidth: 1
            },
            {
                label: 'views',
                data: productViews,
                backgroundColor: ['rgba(200, 100, 255, 0.4'],
                borderColor: ['rgba(200, 100, 255'],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };


        let chart = document.getElementById('myChart');
        const myChart = new Chart(chart, config);
    }
}

renderImg();