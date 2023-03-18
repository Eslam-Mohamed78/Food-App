import Meals from "./mainMeals.js";
import SingleMeal from "./singleMeal.js";
import Aside from "./aside.js";
import Links from "./links.js";
import InsideCategory from "./singleMealInside.js";
import Contact from "./contact.js";

// =============== main page meals ===============
$(function () {
  $(".spinner").fadeOut(1000, async () => {
    $("body").css("overflow", "auto");
    $("aside").css("display", "block");
  });
});
$("main .single-meal").css('display', 'none')


const mainMeals = new Meals(
  "https://www.themealdb.com/api/json/v1/1/search.php?s="
);
let dataMain = await mainMeals.getData(); // all the coming will not be excuted until data comes
console.log(dataMain.meals);

const mealsContainer = mainMeals.display(dataMain.meals);
$("main .all-meals .meal-data").html(mealsContainer);

// =============== single meal page ===============

export function clickMeal(displayedMeals) {
 
  $("main .meal-info").click(function (e) { 
    $("main .single-meal").css('display', 'flex')
    const mealName = e.target.innerText;
    console.log(mealName);

    const oneMeal = new SingleMeal(mealName, displayedMeals);

    oneMeal.displaySingleMeal();

    const index = oneMeal.getMealIndex();

    oneMeal.displayMealInfo(index);

    oneMeal.displayIngredients(index);

    oneMeal.displayTags(index);
  });
}

clickMeal(dataMain.meals);

// =============== Aside nav ===============

const asideWidth = $("aside .links").innerWidth();
const asideNav = new Aside(asideWidth);

$("aside").css({ left: `-${asideWidth}px` });
$("aside .icons i.fa-x").css({ display: "none" });

$("aside ul li").animate({ top: "200px" }, 700).hide();

$("aside .icons i.clk").click(() => {
  asideNav.asideToggle();
});

// =============== First Link (Search) ===============

const links = new Links();

$("aside .links ul li:first-child").click(async () => {
  $("main .all-meals .meal-data").removeClass("d-none");
  $("main .single-meal").css('display', 'none')
  $("main .all-meals").removeClass("d-none");

  asideNav.asideToggle();

  // setup page for search
  await $("main .all-meals .input-fields")
    .removeClass("d-none w-75 mx-auto vh-100 align-content-center")
    .addClass("d-flex");
  await $("main .all-meals .meal-data").html("");

  const inputContainer = links.inputFields();
  $("main .all-meals .input-fields").html(inputContainer);

  links.search();
});

// =============== Second Link (Categories) ===============

const categoryUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
const categories = new Meals(categoryUrl);

$("aside .links ul li:nth-child(2)").click(async () => {
  $("main .all-meals .meal-data").removeClass("d-none");

  asideNav.asideToggle();

  // setup page for categories
  categories.setupPage();

  const categoryData = await categories.getData();
  const mealCategories = categoryData.categories;
  console.log(mealCategories);

  const mealsContainer = await categories.display(
    mealCategories,
    "Category",
    "category-info",
    true
  );
  $("main .all-meals .meal-data").html(mealsContainer);

  // Meals inside each category
  $("main .meal").click(async (ele) => {
    const currentCategory = ele.currentTarget.children[1].children[0].innerText;
    console.log(ele.currentTarget.children[1].children[0].innerText);

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`;
    const insideCategory = new Meals(url);

    const insideMeals = await insideCategory.getData();
    console.log(insideMeals.meals);

    const mealsContainer = insideCategory.display(insideMeals.meals);
    $("main .all-meals .meal-data").html(mealsContainer);

    // display single meal
    $("main .single-meal").css('display', 'flex')
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    const singleMealCategory = new InsideCategory(baseUrl);
    singleMealCategory.singleMealInside();
  });
});

// =============== Third Link (Area) ===============

const areasUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const areas = new Meals(areasUrl);

$("aside .links ul li:nth-child(3)").click(async () => {
  $("main .all-meals .meal-data").removeClass("d-none");

  asideNav.asideToggle();

  // setup page for Area
  areas.setupPage();

  const areaData = await areas.getData();
  const areaNames = areaData.meals;
  console.log(areaNames);

  // display Areas
  let areaContainer = ``;
  for (let i = 0; i < areaNames.length; i++) {
    areaContainer += `
    <div class="col-lg-3 col-md-6">
      <div class='meal text-white text-center'>
      <i class="fa-solid fa-house-laptop mb-3 text-warning"></i>
      <h3 class='mb-4'>${areaNames[i].strArea}</h3>
      </div>
    </div>`;
  }
  $("main .all-meals .meal-data").html(areaContainer);

  // Meals inside each Area
  $("main .meal").click(async (ele) => {
    const currentArea = ele.currentTarget.children[1].innerText;
    console.log(ele.currentTarget.children[1].innerText);

    // meals inside current Area
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentArea}`;
    const insideArea = new Meals(url);

    const insideMeals = await insideArea.getData();
    console.log(insideMeals.meals);

    const mealsContainer = insideArea.display(insideMeals.meals);
    $("main .all-meals .meal-data").html(mealsContainer);

    // display single meal
    $("main .single-meal").css('display', 'flex')
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    const singleMealArea = new InsideCategory(baseUrl);
    singleMealArea.singleMealInside();
  });
});

// =============== Fourth Link (Ingredients) ===============

const ingredientUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
const ingredients = new Meals(ingredientUrl);

$("aside .links ul li:nth-child(4)").click(async () => {
  $("main .all-meals .meal-data").removeClass("d-none");

  asideNav.asideToggle();

  // setup page for Area
  ingredients.setupPage();

  const ingredientData = await ingredients.getData();
  const ingredientNames = ingredientData.meals.slice(0, 20);
  console.log(ingredientNames);

  // display Ingredients
  let ingredientContainer = ``;
  for (let i = 0; i < ingredientNames.length; i++) {
    ingredientContainer += `
    <div class="col-lg-3 col-md-6">
      <div class='meal text-white text-center bg-warning bg-opacity-25 p-2 rounded-2'>
        <i class="fa-solid fa-drumstick-bite mb-3 text-warning"></i>
        <h3 class='mb-3'>${ingredientNames[i].strIngredient}</h3>
        <p class="w-100 description">${ingredientNames[i].strDescription.slice(
          0,
          106
        )}</p>
      </div>
    </div>`;
  }
  $("main .all-meals .meal-data").html(ingredientContainer);

  // Meals inside each Ingredient
  $("main .meal").click(async (ele) => {
    const currentIngredient = ele.currentTarget.children[1].innerText;
    console.log(ele.currentTarget.children[1].innerText);

    // meals inside current Ingredient
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentIngredient}`;
    const insideIngredient = new Meals(url);

    const insideMeals = await insideIngredient.getData();
    console.log(insideMeals.meals);

    const mealsContainer = insideIngredient.display(insideMeals.meals);
    $("main .all-meals .meal-data").html(mealsContainer);

    // display single meal
    $("main .single-meal").css('display', 'flex')
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    const singleMealIngredient = new InsideCategory(baseUrl);
    singleMealIngredient.singleMealInside();
  });
});

// =============== Fifth Link (Contact) ===============

const contact = new Contact();

$("aside .links ul li:nth-child(5)").click(() => {
  asideNav.asideToggle();

  // setup page for Area
  contact.contactSetup();

  // Append Feilds
  contact.appendFields();

  // ===================== Validation ================

  // Name Validate
  const nameInput = $('.input-fields input[name="y-name"]');
  const nameParent1 = $(".input-fields .parent-name");
  const nameParent2 = $(".input-fields .parent-email");
  const nameChild1 = $(".input-fields .child-name");
  const nameChild2 = $(".input-fields .child-email");
  const nameRegex = /^[a-zA-Z]{1,}$/;

  contact.validate(
    nameInput,
    nameParent1,
    nameParent2,
    nameChild1,
    nameChild2,
    nameRegex
  );

  // Email Validate
  const emailInput = $('.input-fields input[name="y-email"]');
  const emailParent1 = $(".input-fields .parent-email");
  const emailParent2 = $(".input-fields .parent-name");
  const emailChild1 = $(".input-fields .child-email");
  const emailChild2 = $(".input-fields .child-name");
  const emailRegex = /^\S+@\S+\.\S+$/;

  contact.validate(
    emailInput,
    emailParent1,
    emailParent2,
    emailChild1,
    emailChild2,
    emailRegex
  );

  // Phone Validate
  const phoneInput = $('.input-fields input[name="y-phone"]');
  const phoneParent1 = $(".input-fields .parent-phone");
  const phoneParent2 = $(".input-fields .parent-age");
  const phoneChild1 = $(".input-fields .child-phone");
  const phoneChild2 = $(".input-fields .child-age");
  const phoneRegex = /^01[0125][0-9]{8}$/;

  contact.validate(
    phoneInput,
    phoneParent1,
    phoneParent2,
    phoneChild1,
    phoneChild2,
    phoneRegex
  );

  // Age Validate
  const ageInput = $('.input-fields input[name="y-age"]');
  const ageParent1 = $(".input-fields .parent-age");
  const ageParent2 = $(".input-fields .parent-phone");
  const ageChild1 = $(".input-fields .child-age");
  const ageChild2 = $(".input-fields .child-phone");
  const ageRegex = /^[0-9]{1,2}$/;

  contact.validate(
    ageInput,
    ageParent1,
    ageParent2,
    ageChild1,
    ageChild2,
    ageRegex
  );

  // Password Validate
  const passwordInput = $('.input-fields input[name="y-password"]');
  const passwordParent1 = $(".input-fields .parent-password");
  const passwordParent2 = $(".input-fields .parent-rePassword");
  const passwordChild1 = $(".input-fields .child-password");
  const passwordChild2 = $(".input-fields .child-rePassword");
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  contact.validate(
    passwordInput,
    passwordParent1,
    passwordParent2,
    passwordChild1,
    passwordChild2,
    passwordRegex
  );

  // RePassword Validation

  const repasswordInput = $('.input-fields input[name="y-password-confirm"]');
  const repasswordParent1 = $(".input-fields .parent-rePassword");
  const repasswordParent2 = $(".input-fields .parent-password");
  const repasswordChild1 = $(".input-fields .child-rePassword");
  const repasswordChild2 = $(".input-fields .child-password");

  repasswordInput.keyup((e) => {
    const inputValue = e.target.value;
    console.log(inputValue);

    const passwordValue = passwordInput.val();

    if (inputValue !== passwordValue) {
      console.log("notvalid");
      repasswordParent1.removeClass("d-none");
      repasswordParent2.removeClass("d-none");
      repasswordChild1.removeClass("visually-hidden");
      repasswordChild2.addClass("visually-hidden");
    } else {
      console.log("valid");
      repasswordParent1.addClass("d-none");
      repasswordParent2.addClass("d-none");
      repasswordChild1.removeClass("visually-hidden");
      repasswordChild2.removeClass("visually-hidden");
    }
  });

  // Submit
  contact.submit(
    nameParent1,
    emailParent1,
    phoneParent1,
    ageParent1,
    passwordParent1,
    repasswordParent1
  );
});

$("main .single-meal").removeClass("d-none");
