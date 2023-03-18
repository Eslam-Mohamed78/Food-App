import Meals from "./mainMeals.js";
import { clickMeal } from "./script.js";

export default class Links {
  inputFields() {
    const inputContainer = `
		<div class="col-lg-6">
		<div>
			<input
				type="text"
				name="searchByName"
				placeholder="Search By Name"
				class="name form-control bg-transparent text-white"
			/>
		</div>
		</div>
		<div class="col-lg-6">
			<div>
				<input
					type="text"
					name="searchByFirstLetter"
					placeholder="Search By First Letter"
					class="letter form-control bg-transparent text-white"
				/>
			</div>
		</div>`;

    return inputContainer;
  }

  search() {
    let nameInput, letterInput, url;
    $("main .all-meals input.name").keyup(async (ele) => {
      nameInput = ele.target.value;
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameInput}`;

      await this.fetchDataAndDisplay(url);
    });
    $("main .all-meals input.letter").keyup(async (ele) => {
      letterInput = ele.target.value;
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterInput}`;
      console.log(url);
      await this.fetchDataAndDisplay(url);
    });
  }

  async fetchDataAndDisplay(url) {
    // get url
    const searchData = new Meals(url);
    const nameMeals = await searchData.getData();

    // display founded meals
    console.log(nameMeals.meals);
    const mealsContainer = searchData.display(nameMeals.meals);
    $("main .all-meals .meal-data").html(mealsContainer);

    // enter a single meal
    clickMeal(nameMeals.meals);
  }
}
