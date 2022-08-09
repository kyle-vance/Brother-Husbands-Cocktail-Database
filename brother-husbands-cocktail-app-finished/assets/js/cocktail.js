var searchByName = $('#search-button');
var recipe = $('#recipe');
var drunkSubmitEl = $('#drinkSubmit');
var searchCount = 0;

// pulls the lastCocktail from storage
var storedCocktail = localStorage.getItem("lastCocktail");

// checks if the pulled variable has value
if (storedCocktail != null) {
  searchParameters = "search.php?s=" + storedCocktail;

  getApi2(searchParameters);
}

// set search param based on cocktail name
$("#drinkSubmit1").click(function (event) {
  event.preventDefault();
  var searchByName = $('#searchByName').val();
  searchType = true;
  searchParameters = "search.php?s=" + searchByName;
  getApi(searchParameters);
  return searchType;
})

// set search parameters based on search by ingredient
$("#drinkSubmit2").click(function (event) {
  event.preventDefault();
  var searchIngredient = $('#searchByIngredient').val();
  searchType = true;
  searchParameters = "filter.php?i=" + searchIngredient;
  getApi(searchParameters);
  return searchType;
})

// populate a random cocktail
$("#yolo").click(function (event) {
  event.preventDefault();

  searchParameters = "random.php"

  getApi(searchParameters);
})

// getting API based on the search parameters sent
function getApi(searchParameters) {

  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/' + searchParameters;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // populates modal if there is 1> drink option
      if (data.drinks.length > 1) {
        // makes modal visible
        $("#multiplePop").css({
          "visibility": "visible"
        });
        //sends data to selectMultiple()
        selectMultiple(data);
      }
      // populates recipe if there is only one drink
      else {
        populateRecipe(data);
      }
    })
}

// api search that wont pull the modal
function getApi2(searchParameters) {

  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/' + searchParameters;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      populateRecipe(data);

    })
}


// populates the modal when there are multiple drink options
function selectMultiple(data) {
  // emptying the last search before populating more
  $("#drinkOptions").empty();

  // looping i through available drinks
  for (i = 0; i < data.drinks.length; i++) {
    var drinkOptions = data.drinks[i].strDrink;

    // appending drink names into an input checkbox
    $("#drinkOptions").append("<input type='checkbox' class ='xOption' name='" + drinkOptions + "' value='" + drinkOptions + "'> <label for='" + drinkOptions + "'>" + drinkOptions + "</label><br>");
  }

  // closes modal when clicking the close button
  $("#closeButton").on("click", function () {
    $("#multiplePop").css({
      "visibility": "hidden"
    });
  })

  // captures click on the multipleSub button
  $("#multipleSub").on("click", function () {

    // populateRecipe(data);

    // sets the selected box value into a variable
    var selected = $("input[type='checkbox']:checked").val();

    // adds the selected variable as search parameters
    if (searchType === true) {
      searchParameters = "search.php?s=" + selected;
    } else {
      searchParameters = "filter.php?i=" + selected;
    }

    // hides the modal
    $("#multiplePop").css({
      "visibility": "hidden"
    });

    getApi2(searchParameters);
  })
}

// populates the recipe field
function populateRecipe(data) {
  $("article").css({
    "visibility": "visible"
  });

  for (var i = 0; i < data.drinks.length; i++) {

    // setting recipe variables from data
    var drinkName = data.drinks[0].strDrink;
    var drinkGlass = data.drinks[0].strGlass;
    var drinkImg = data.drinks[0].strDrinkThumb;
    var instructions = data.drinks[0].strInstructions;
    var drinks = data.drinks[0];
    var tags = data.drinks[0].strTags;

    // setting ingredients  measurement into array
    var ingredients = [{
      "ingredient": drinks.strIngredient1,
      "measure": drinks.strMeasure1
    }, {
      "ingredient": drinks.strIngredient2,
      "measure": drinks.strMeasure2
    }, {
      "ingredient": drinks.strIngredient3,
      "measure": drinks.strMeasure3
    }, {
      "ingredient": drinks.strIngredient4,
      "measure": drinks.strMeasure4
    }, {
      "ingredient": drinks.strIngredient5,
      "measure": drinks.strMeasure5
    }, {
      "ingredient": drinks.strIngredient6,
      "measure": drinks.strMeasure6
    }, {
      "ingredient": drinks.strIngredient7,
      "measure": drinks.strMeasure7
    }, {
      "ingredient": drinks.strIngredient8,
      "measure": drinks.strMeasure8
    }, {
      "ingredient": drinks.strIngredient9,
      "measure": drinks.strMeasure9
    }, {
      "ingredient": drinks.strIngredient10,
      "measure": drinks.strMeasure10
    }, {
      "ingredient": drinks.strIngredient11,
      "measure": drinks.strMeasure11
    }, {
      "ingredient": drinks.strIngredient12,
      "measure": drinks.strMeasure12
    }, {
      "ingredient": drinks.strIngredient13,
      "measure": drinks.strMeasure13
    }, {
      "ingredient": drinks.strIngredient14,
      "measure": drinks.strMeasure14
    }, {
      "ingredient": drinks.strIngredient15,
      "measure": drinks.strMeasure15
    }];


    // inserting variables into recipe html
    $("#titleName").html(drinkName);
    $("#subGlass").html("use a " + drinkGlass);
    $("#drinkImg").children(1).attr("src", drinkImg);
    $("#directions").html(instructions);

    // checks if the tags variable has value
    if (tags === null) {
      // inserts empty string instead of null
      $("#drinkTags").html(" ");

    } else {
      // inserts tags if it has value
      $("#drinkTags").html(tags);
    }
    // function rotating through populated ingredients
    function pushIngredient() {
      // emptying the ingredients before populating more
      $("#ingredients-container").empty();
      // rotating i though the number of available ingredients
      for (i = 0; i < ingredients.length; i++) {

        // checking that ingredients have value
        if (ingredients[i].ingredient !== null) {
          // checking that measure has value
          if (ingredients[i].measure !== null) {
            // only appending both when they have a string
            $("#ingredients-container").append(`<li> ● ${ingredients[i].measure} of ${ingredients[i].ingredient}</li>`);
          } else {
            // appends only ingredient when there is no measurement
            $("#ingredients-container").append(`<li> ● ${ingredients[i].ingredient}</li>`);
          }
        }
      }
    }
    $("#convert").click(function (event) {
      event.preventDefault();

      var measureArr = [{
        "measure": drinks.strMeasure1
      }, {
        "measure": drinks.strMeasure2
      }, {
        "measure": drinks.strMeasure3
      }, {
        "measure": drinks.strMeasure4
      }, {
        "measure": drinks.strMeasure5
      }, {
        "measure": drinks.strMeasure6
      }, {
        "measure": drinks.strMeasure7
      }, {
        "measure": drinks.strMeasure8
      }, {
        "measure": drinks.strMeasure9
      }, {
        "measure": drinks.strMeasure10
      }, {
        "measure": drinks.strMeasure11
      }, {
        "measure": drinks.strMeasure12
      }, {
        "measure": drinks.strMeasure13
      }, {
        "measure": drinks.strMeasure14
      }, {
        "measure": drinks.strMeasure15
      }];

      var filterdMeasurements = measureArr.filter(item => item.measure)
      // var ryan = measureArr.filter(function(item) { return item.measure })
      var convertedMeasurements = filterdMeasurements.map(measure => {
        var splitter = measure.measure.split(" ")[0];
        return `${Math.round(splitter * 0.34 * 100) / 100} oz.`;
      });
      $("#ingredients-container").empty();
      for (i = 0; i < convertedMeasurements.length; i++) {
        $("#ingredients-container").append(`<li> ● ${convertedMeasurements[i]} of ${ingredients[i].ingredient}</li>`);
        
    };

    // sets click event on the convert button
    $("#convert").click(function (event) {
      event.preventDefault();

      // sets measurements in an array
      var measureArr = [{
        "measure": drinks.strMeasure1
      }, {
        "measure": drinks.strMeasure2
      }, {
        "measure": drinks.strMeasure3
      }, {
        "measure": drinks.strMeasure4
      }, {
        "measure": drinks.strMeasure5
      }, {
        "measure": drinks.strMeasure6
      }, {
        "measure": drinks.strMeasure7
      }, {
        "measure": drinks.strMeasure8
      }, {
        "measure": drinks.strMeasure9
      }, {
        "measure": drinks.strMeasure10
      }, {
        "measure": drinks.strMeasure11
      }, {
        "measure": drinks.strMeasure12
      }, {
        "measure": drinks.strMeasure13
      }, {
        "measure": drinks.strMeasure14
      }, {
        "measure": drinks.strMeasure15
      }];

      // filtering the measurements array to convert it to oz
      var filterdMeasurements = measureArr.filter(item => item.measure)
      // var ryan = measureArr.filter(function(item) { return item.measure })
      var convertedMeasurements = filterdMeasurements.map(measure => {
        var splitter = measure.measure.split(" ")[0];
        return `${Math.round(splitter * 0.34 * 100) / 100} oz.`;
      });

      // emptying the ingredients container
      $("#ingredients-container").empty();
      // appending the converted measurements and ingredients to the html
      for (i = 0; i < convertedMeasurements.length; i++) {
        $("#ingredients-container").append(`<li> ● ${convertedMeasurements[i]} of ${ingredients[i].ingredient}</li>`);
 
      };
    });
  });
  // rotating through the pushIngredient function for each ingredient 
  $.each(pushIngredient(ingredients.ingredient));
  getNinja();

  // sets populated recipe to a variable
  var lastSearch = $("#titleName").text();

  // stores last search to the local storage
  localStorage.setItem("lastCocktail", lastSearch);
}

function getNinja() {
  var nutritionString = $("#ingredients-container").text();

  $("#multipleSub").off();
  // LOCAL VARIABLES
  var APIKey = "K/T5UXdLDGG+gbua67VqQw==w2i8da76oBKobzcv";

  $.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + nutritionString,
    headers: {
      'X-Api-Key': APIKey
    },
    contentType: 'application/json',
    success: function (data) {

      // NUTRITION ARRAY VAR
      var calArr = [];
      var fatArr = [];
      var proteinArr = [];
      var carbsArr = [];
      var sugarsArr = [];

      // NUTRITION SUM VAR
      var sum = 0;
      var calSum = 0;
      var fatSum = 0;
      var proteinSum = 0;
      var carbsSum = 0;
      var sugarsSum = 0;

      console.log(data.items)

      // PUSHING DATA ITEMS TO ARRAY, TURNING INTO INT
      for (let i = 0; i < data.items.length; i++) {

        calArr.push(parseInt(data.items[i].calories));
        calSum = calSum + parseInt(data.items[i].calories);

        fatArr.push(parseInt(data.items[i].fat_total_g));
        fatSum = fatSum + parseInt(data.items[i].fat_total_g);

        carbsArr.push(parseInt(data.items[i].carbohydrates_total_g));
        carbsSum = carbsSum + parseInt(data.items[i].carbohydrates_total_g);

        proteinArr.push(parseInt(data.items[i].protein_g));
        proteinSum = proteinSum + parseInt(data.items[i].protein_g);

        sugarsArr.push(parseInt(data.items[i].sugar_g));
        sugarsSum = sugarsSum + parseInt(data.items[i].sugar_g);

      }
      // ADDING EACH ARRAY FOR A TOTAL SUM
      $.each(calArr, function () {
        sum += parseFloat(this) || 0;
      });
      $.each(fatArr, function () {
        sum += parseFloat(this) || 0;
      });
      $.each(carbsArr, function () {
        sum += parseFloat(this) || 0;
      });
      $.each(proteinArr, function () {
        sum += parseFloat(this) || 0;
      });
      $.each(sugarsArr, function () {
        sum += parseFloat(this) || 0;
      });

      // ADDING EACH FINAL SUM TO THE HTML
      $("#calorieNum").html(calSum + " calories");
      $("#proteinNum").html(proteinSum + " grams of protein");
      $("#fatNum").html(fatSum + " grams of fat");
      $("#carbNum").html(carbsSum + " grams of carbohydrates");
      $("#sugarNum").html(sugarsSum + " grams of sugar");
    },

    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }

  });
  return;
}};
