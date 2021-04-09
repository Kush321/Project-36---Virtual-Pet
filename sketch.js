var dog,sadDog,happyDog, database;
var foodS,foodStock,lFed,fedTime;
var addFood;
var foodObj,feed,lastFed;
//create feed and lastFed variable here

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

    //Time Fed Instructons
    fill("red");
    textSize(24);
    if(lastFed>12){
    text("Last Fed : "+ (lastFed-12)+ " PM", 300,35); 
    }else if(lastFed===0){ 
    text("Last Fed : 12 AM",300,35); 
    }else if(lastFed<13){ 
    text("Last Fed : "+ lastFed + " AM", 300,35); 
    }
    //
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
    lastFed = hour();
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
  database.ref('/').update({
    FeedTime: lastFed
  });
}
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
