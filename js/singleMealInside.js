import Meals from "./mainMeals.js";
import SingleMeal from "./singleMeal.js";

export default class InsideCategory {
  constructor(url) {
    this.url = url;
  }

  singleMealInside() {
    $("main .meal-info").click(async (e) => {
      // must be arrow function becauseof this to return to constructor
      const mealName = e.target.innerText;
      // console.log(mealName);
      const allUrl = `${this.url}${mealName}`;

      const singleMeal = new Meals(allUrl);
      const singleMealData = await singleMeal.getData();
      console.log(singleMealData.meals);

      const oneMeal = new SingleMeal(mealName, singleMealData.meals);

      oneMeal.displaySingleMeal();

      const index = oneMeal.getMealIndex();

      oneMeal.displayMealInfo(index);

      oneMeal.displayIngredients(index);

      oneMeal.displayTags(index);
    });
  }
}
