export default class SingleMeal {
  constructor(mealName, meals) {
    this.mealName = mealName;
    this.meals = meals;
  }

  displaySingleMeal() {
    $("main .all-meals").addClass("d-none");
    $("main .single-meal").removeClass("d-none");
  }

  getMealIndex() {
    let mealIndex;
    for (let i = 0; i < this.meals.length; i++) {
      this.meals[i].strMeal === this.mealName ? (mealIndex = i) : "";
    }
    console.log(mealIndex);
    return mealIndex;
  }

  displayMealInfo(mealIndex) {

    

    $(".single-meal .image img").attr(
      "src",
      this.meals[mealIndex].strMealThumb
    );
    $(".single-meal .meal-name").text(this.mealName);
    $(".single-meal .instructions").text(this.meals[mealIndex].strInstructions);
    $(".single-meal .area span").text(this.meals[mealIndex].strArea);
    $(".single-meal .category span").text(this.meals[mealIndex].strCategory);
  }

  displayIngredients(mealIndex) {
    let ingredientNum = 1;
    // console.log(this.meals[mealIndex][`strIngredient${ingredientNum}`]);
    let ingredientContainer = ``;
    while (true) {
      if (
        this.meals[mealIndex][`strIngredient${ingredientNum}`] !== null &&
        this.meals[mealIndex][`strIngredient${ingredientNum}`].length !== 0
      ) {
        ingredientContainer += `<span class="me-3 mb-3">${
          this.meals[mealIndex][`strMeasure${ingredientNum}`]
        } ${this.meals[mealIndex][`strIngredient${ingredientNum}`]}</span>`;
        ingredientNum++;
      } else {
        break;
      }
    }
    $(".single-meal .ingredient").html(ingredientContainer);
  }

  displayTags(mealIndex) {
    let tagsContainer = ``;
    if (this.meals[mealIndex].strTags !== null) {
      this.meals[mealIndex].strTags.split(",").map((ele) => {
        tagsContainer += `<span class="me-3 mb-3">${ele}</span>`;
      });
    } else {
      tagsContainer = `<span>None</span>`;
    }

    $(".single-meal .tags").html(tagsContainer);
    $(".single-meal .source").attr("href", this.meals[mealIndex].strSource);
    $(".single-meal .youtube").attr("href", this.meals[mealIndex].strYoutube);
  }
}
