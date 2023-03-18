export default class Contact {
  constructor() {}

  contactSetup() {
    $("main .all-meals").removeClass("d-none");
    $("main .single-meal").addClass("d-none");
    $("main .all-meals .meal-data").addClass("d-none");
    $("main .all-meals .input-fields").removeClass("d-none");
    $("main .all-meals .input-fields").addClass(
      "w-75 mx-auto vh-100 align-content-center"
    );
  }

  appendFields() {
    const contactContainer = `
		<div class="row gy-3 align-content-center">
		<div class="col-lg-6">
			<div>
				<input
					type="text"
					name="y-name"
					placeholder="Enter Your Name"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="col-lg-6">
			<div>
				<input
					type="email"
					name="y-email"
					placeholder="Enter Your Email"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="parent-name d-none col-lg-6">
			<div>
				<div
					class="child-name validation rounded-2 px-2 py-3 text-center"
				>
					Special characters and numbers not allowed
				</div>
			</div>
		</div>
		<div class="parent-email d-none col-lg-6">
			<div>
				<div
					class="child-email validation rounded-2 px-2 py-3 text-center"
				>
					Email not valid *exemple@yyy.zzz
				</div>
			</div>
		</div>

		<div class="col-lg-6">
			<div>
				<input
					type="tel"
					name="y-phone"
					placeholder="Enter Your Phone"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="col-lg-6">
			<div>
				<input
					type="number"
					name="y-age"
					placeholder="Enter Your Age"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="parent-phone d-none col-lg-6">
			<div>
				<div
					class="child-phone validation rounded-2 px-2 py-3 text-center"
				>
					Enter valid Phone Number
				</div>
			</div>
		</div>

		<div class="parent-age d-none col-lg-6">
			<div>
				<div
					class="child-age validation rounded-2 px-2 py-3 text-center"
				>
					Enter valid age
				</div>
			</div>
		</div>

		<div class="col-lg-6">
			<div>
				<input
					type="password"
					name="y-password"
					placeholder="Enter Your Password"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="col-lg-6">
			<div>
				<input
					type="password"
					name="y-password-confirm"
					placeholder="Confirm Your Password"
					class="form-control bg-transparent text-white"
				/>
			</div>
		</div>

		<div class="parent-password d-none col-lg-6">
			<div>
				<div
					class="child-password validation rounded-2 px-2 py-3 text-center"
				>
					Enter valid password *Minimum eight characters, at least one
					letter and one number:*
				</div>
			</div>
		</div>

		<div class="parent-rePassword d-none col-lg-6">
			<div>
				<div
					class="child-rePassword validation rounded-2 px-2 py-3 text-center"
				>
					Not the same password
				</div>
			</div>
		</div>
	</div>
	<span class="btn btn-outline-danger submit "
		>Submit</span
	>
		`;
    $("main .all-meals .input-fields").html(contactContainer);
  }

  validate(input, parent1, parent2, currChild, otherChild, regex) {
    let flag = false;
    input.keyup((e) => {
      const inputValue = e.target.value;
      console.log(inputValue);

      if (!regex.test(inputValue)) {
        $("main .input-fields span.submit").css({
          color: "red",
          borderColor: "red",
        });
        console.log("notvalid");
        parent1.removeClass("d-none");
        parent2.removeClass("d-none");
        currChild.removeClass("visually-hidden");
        otherChild.addClass("visually-hidden");
        flag = false;
      } else {
        $("main .input-fields span.submit").css({
          color: "green",
          borderColor: "green",
        });
        console.log("valid");
        parent1.addClass("d-none");
        parent2.addClass("d-none");
        currChild.removeClass("visually-hidden");
        otherChild.removeClass("visually-hidden");
        flag = true;
      }
    });
    return flag;
  }

  submit(name, email, phone, age, password, rePassword) {
    $("main .input-fields span.submit").click(() => {
      console.log("enter");
      if (
        name.hasClass("d-none") &&
        email.hasClass("d-none") &&
        phone.hasClass("d-none") &&
        age.hasClass("d-none") &&
        password.hasClass("d-none") &&
        rePassword.hasClass("d-none")
      ) {
        $("main .input-fields span.submit").css({
          color: "green",
          borderColor: "green",
        });
      }
    });
  }
}
