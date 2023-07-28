import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  // this link contains initialise app function for firebase
import { getDatabase , ref , push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  // this link contains initialise app function for firebase
 


const appSettings = {
    databaseURL: "https://shopping-cart-9dd1a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database  = getDatabase(app)  // this connects our project with db 
const shoppingListInDB = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");   


addButtonEl.addEventListener("click", function() {
    let inputvalue = inputFieldEl.value;
    push(shoppingListInDB , inputvalue)
    console.log(inputvalue)     // this outputs the text when you click on the button                                         
    clearInputField();                          // the .value method refers to getting a value from the input field of html
})

onValue(shoppingListInDB , function (snapshot) { 
    if(snapshot.exists()){    // this function is for fetching from the db
    let itemsArray = Object.entries(snapshot.val());   // converting object to array of items - here the object has various entries (key value pairs)
    clearShoppingListEl();
    for (let i = 0; i< itemsArray.length ; i++) {
        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];
        addItemsToShoppingListEl(currentItem)          // printing each index value (items from the cart)  
    }
} else{
    shoppingListEl.innerHTML = "Your cart looks Empty  .."
}
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
    
}

function clearInputField(){
    inputFieldEl.value = ""
}
function addItemsToShoppingListEl(item){    // this function is for simply adding items to the list
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent =  itemValue
    shoppingListEl.append(newEl)
    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDb = ref(database , `shoppingList/${itemID}`)  // this is how we get exact location of the item in the database
        remove(exactLocationOfItemInDb)    // we remove the item after clicking on it (like a checklist)
    })
}

// innerhtml helps us in simple cases to understand javascript in the beginning
// experiment a little with create html