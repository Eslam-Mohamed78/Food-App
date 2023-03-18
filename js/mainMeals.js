export default class Meals {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    const result = await fetch(this.url);
    const data = await result.json();
    // console.log(data.meals);
    return data;
  }

  display(meals, x = "Meal", style = "meal-info", categoryInfo = false) {
    let mealsContainer = ``;
    for (let i = 0; i < meals.length; i++) {
      mealsContainer += `
		<div class=' col-lg-3 col-md-6'>
			<div class="meal position-relative">
				<img src="${meals[i][`str${x}Thumb`]}" class="w-100 rounded-2" alt="meal">
				<div 
				class="${style} position-absolute w-100 h-100 rounded-2">
				<span>${meals[i][`str${x}`]}</span>
        ${
          categoryInfo == true
            ? `<p class="w-100 description">${meals[
                i
              ].strCategoryDescription.slice(0, 95)}</p>`
            : ""
        }
				</div>
			</div>
		</div>
	`;
    }
    return mealsContainer;
  }

  setupPage() {
    $("main .all-meals").removeClass("d-none");
    $("main .all-meals .input-fields").addClass("d-none");
    $("main .all-meals .meal-data").html("");
    $("main .single-meal").addClass("d-none");
  }
}
