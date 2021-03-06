//declared varibles 
var apiKey = "a296389af1864268af1211e51671cff0";
var spoonacularUrl = "https://api.spoonacular.com/recipes/";
var btnSearchIngredients = $("#btn-search-ingredients");
var btnSaveCalendar = $("#btn-save-calendar");
var btnClearCalendar = $("#btn-clear-calendar");
var dataIds = [];
var calendarSlots = ["mon-b", "mon-l", "mon-d", "tue-b", "tue-l", "tue-d", "wed-b", "wed-l", "wed-d", "thu-b", "thu-l", "thu-d", "fri-b", "fri-l", "fri-d"]

/*
    If there is any data in local storage for a Calendar Slot,
    populate Slot with stored data
*/
function calenderLoad() {
    for (slot of calendarSlots) {
        var slotId = "#" + slot
        var savedSlot = localStorage.getItem(slot)
        if (savedSlot && savedSlot != "") {
            $(slotId).html(localStorage.getItem(slot))
        }
    }
}
//Enables adding a Recipe Card to a Calendar Slot 
$("#card-add0").on('click', function() {
    addRecipeToSlot("0");
});
$("#card-add1").on('click', function() {
    addRecipeToSlot("1");
});
$("#card-add2").on('click', function() {
    addRecipeToSlot("2");
});
$("#card-add3").on('click', function() {
    addRecipeToSlot("3");
});
$("#card-add4").on('click', function() {
    addRecipeToSlot("4");
});

//function to allow meals to be put on certain days and times
function addRecipeToSlot(buttonId) {
    var meals = $("#meals").val();
    var days = $("#days").val();
    var name = $('#idTitle' + buttonId).text()
    var recipe = $('#card-text' + buttonId).html()
    var calories = $('#card-cal' + buttonId).text()
    if (days == 'Monday' && meals == 'Breakfast') {
        document.getElementById("bRecipe1").innerText = " " + name;
        document.getElementById("bDiretions1").innerHTML = " " + recipe;
        document.getElementById("bCalorie1").innerText = " " + calories;
    }
    if (days == 'Monday' && meals == 'Lunch') {
        document.getElementById("lRecipe1").innerText = " " + name;
        document.getElementById("lDiretions1").innerHTML = " " + recipe;
        document.getElementById("lCalorie1").innerText = " " + calories;
    }
    if (days == 'Monday' && meals == 'Dinner') {
        document.getElementById("dRecipe1").innerText = " " + name;
        document.getElementById("dDiretions1").innerHTML = " " + recipe;
        document.getElementById("dCalorie1").innerText = " " + calories;
    }
    if (days == 'Tuesday' && meals == 'Breakfast') {
        document.getElementById("bRecipe2").innerText = " " + name;
        document.getElementById("bDiretions2").innerHTML = " " + recipe;
        document.getElementById("bCalorie2").innerText = " " + calories;
    }
    if (days == 'Tuesday' && meals == 'Lunch') {
        document.getElementById("lRecipe2").innerText = " " + name;
        document.getElementById("lDiretions2").innerHTML = " " + recipe;
        document.getElementById("lCalorie2").innerText = " " + calories;
    }
    if (days == 'Tuesday' && meals == 'Dinner') {
        document.getElementById("dRecipe2").innerText = " " + name;
        document.getElementById("dDiretions2").innerHTML = " " + recipe;
        document.getElementById("dCalorie2").innerText = " " + calories;
    }
    if (days == 'Wednesday' && meals == 'Breakfast') {
        document.getElementById("bRecipe3").innerText = " " + name;
        document.getElementById("bDiretions3").innerHTML = " " + recipe;
        document.getElementById("bCalorie3").innerText = " " + calories;
    }
    if (days == 'Wednesday' && meals == 'Lunch') {
        document.getElementById("lRecipe3").innerText = " " + name;
        document.getElementById("lDiretions3").innerHTML = " " + recipe;
        document.getElementById("lCalorie3").innerText = " " + calories;
    }
    if (days == 'Wednesday' && meals == 'Dinner') {
        document.getElementById("dRecipe3").innerText = " " + name;
        document.getElementById("dDiretions3").innerHTML = " " + recipe;
        document.getElementById("dCalorie3").innerText = " " + calories;
    }
    if (days == 'Thursday' && meals == 'Breakfast') {
        document.getElementById("bRecipe4").innerText = " " + name;
        document.getElementById("bDiretions4").innerHTML = " " + recipe;
        document.getElementById("bCalorie4").innerText = " " + calories;
    }
    if (days == 'Thursday' && meals == 'Lunch') {
        document.getElementById("lRecipe4").innerText = " " + name;
        document.getElementById("lDiretions4").innerHTML = " " + recipe;
        document.getElementById("lCalorie4").innerText = " " + calories;
    }
    if (days == 'Thursday' && meals == 'Dinner') {
        document.getElementById("dRecipe4").innerText = " " + name;
        document.getElementById("dDiretions4").innerHTML = " " + recipe;
        document.getElementById("dCalorie4").innerText = " " + calories;
    }
    if (days == 'Friday' && meals == 'Breakfast') {
        document.getElementById("bRecipe5").innerText = " " + name;
        document.getElementById("bDiretions5").innerHTML = " " + recipe;
        document.getElementById("bCalorie5").innerText = " " + calories;
    }
    if (days == 'Friday' && meals == 'Lunch') {
        document.getElementById("lRecipe5").innerText = " " + name;
        document.getElementById("lDiretions5").innerHTML = " " + recipe;
        document.getElementById("lCalorie5").innerText = " " + calories;
    }
    if (days == 'Friday' && meals == 'Dinner') {
        document.getElementById("dRecipe5").innerText = " " + name;
        document.getElementById("dDiretions5").innerHTML = " " + recipe;
        document.getElementById("dCalorie5").innerText = " " + calories;
    }
    //data.datasets = createCalorieDataset()
    myChart.data.datasets[0].data = createCalorieDataset(false)
    myChart.update();
}
//save button for calendar
btnSaveCalendar.on("click", function() {
    for (slot of calendarSlots) {
        var slotId = "#" + slot
        localStorage.setItem(slot, $(slotId).html())
    }
})
//clear button for calendar
btnClearCalendar.on("click", function() {
    for (slot of calendarSlots) {
        localStorage.removeItem(slot)
    }
    window.location.reload()
})
//search button for inputting ingredients
btnSearchIngredients.on("click", function() {
    var userInput = document.getElementById("input-ingredients").value;

    if (userInput !== null) {
        localStorage.setItem("ingredient", userInput);
    }

    getRecipe();
//function to get recipe from API 
    function getRecipe() {
        fetch(spoonacularUrl + "findByIngredients?apiKey=" + apiKey + "&ingredients=" + userInput + "&number=5")
            .then((response) => response.json())
            .then(function(data) {
                for (recipe of data) {
                    dataIds.push(recipe.id);
                    console.log(dataIds)
                }
                displayRecipe(data);
                recipeInfo(data);
                displayCards();
            });
    }
//function to display the 5 recipes in cards
    function displayRecipe(data) {
        for (var i = 0; i < 5; i++) {
            $("#idTitle" + i).html(data[i].title);
            $("#card" + i).attr("src", data[i].image);
        }
    }

    function recipeInfo(data) {
        for (let i = 0; i < 5; i++) {
            var id = data[i].id;
            fetch(spoonacularUrl + id + "/information" + "?apiKey=" + apiKey)
                .then((response) => response.json())
                .then(function(recipeData) {
                    console.log("Setting recipe link for " + i + " with data url " + recipeData.sourceUrl)
                    var recipeLink = "Recipe".link(recipeData.sourceUrl);
                    document.getElementById("card-text" + i).innerHTML = recipeLink;
                });
            fetch(spoonacularUrl + id + "/nutritionWidget.json" + "?apiKey=" + apiKey)
                .then((response) => response.json())
                .then(function(nutritionData) {
                    var calories = nutritionData.calories;
                    console.log("Setting calories for " + i + " with calories " + nutritionData.calories)
                    document.getElementById("card-cal" + i).innerText = " " + calories;
                    console.log("widgetdata", nutritionData);
                });
        }
    }
});
//function to unhide cards once recipe is searched
function displayCards() {
    var cards = document.querySelector("#recipeChocies");
    cards.classList.toggle("d-none");
    cards.classList.toggle("d-block");
}
//chart.js input
const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const data = {
    labels: labels,
    datasets: [{
        label: 'Daily Calorie Intake',
        data: createCalorieDataset(true),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
//makes it a line chart
const config = {
    type: 'line',
    data: data,
};
//function to get total calories per day
function createCalorieDataset(shouldReloadFromLocalStorage) {
    return [
        getDailyCalories("1", shouldReloadFromLocalStorage),
        getDailyCalories("2", shouldReloadFromLocalStorage),
        getDailyCalories("3", shouldReloadFromLocalStorage),
        getDailyCalories("4", shouldReloadFromLocalStorage),
        getDailyCalories("5", shouldReloadFromLocalStorage),
    ]
}
//function to reload chart when new meals are inputed
function getDailyCalories(index, shouldReloadFromLocalStorage) {
    if (shouldReloadFromLocalStorage) {
        calenderLoad();
    }
    var bCal = parseInt(document.getElementById("bCalorie" + index).innerText.replace('k', '').replace(' ', ''));
    var lCal = parseInt(document.getElementById("lCalorie" + index).innerText.replace('k', '').replace(' ', ''));
    var dCal = parseInt(document.getElementById("dCalorie" + index).innerText.replace('k', '').replace(' ', ''));
    return (bCal ? bCal : 0) + (lCal ? lCal : 0) + (dCal ? dCal : 0)
}

calenderLoad();

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);