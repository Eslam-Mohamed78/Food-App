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
		<form action="" class="form-data">
		<div class="row gy-3 align-content-center">
			<div class="col-lg-6">
				<div class="">
					<input
						type="text"
						name="y-name"
						placeholder="Enter Your Name"
						class="form-control bg-transparent text-white"
					/>
					<div
						class="parent-name invalid-feedback validation rounded-2 px-2 py-3 text-center"
					>
						Special characters and numbers not allowed
					</div>
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
					<div
						class="parent-email invalid-feedback validation rounded-2 px-2 py-3 text-center"
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
					<div
						class="parent-phone invalid-feedback validation rounded-2 px-2 py-3 text-center"
					>
						Enter valid Phone Number
					</div>
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
					<div
						class="parent-age invalid-feedback validation rounded-2 px-2 py-3 text-center"
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
					<div
						class="parent-password invalid-feedback validation rounded-2 px-2 py-3 text-center"
					>
						Enter valid password *Minimum eight characters, at least
						one letter and one number:*
					</div>
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
					<div
						class="parent-rePassword invalid-feedback validation rounded-2 px-2 py-3 text-center"
					>
						Not the same password
					</div>
				</div>
			</div>
		</div>
		<span class="btn bg-warning text-success disabled submit text-center w-100">Submit</span>
	</form>
		`;
    $("main .all-meals .input-fields").html(contactContainer);
  }

  validate(input, regex) {
    let isValid = false;
    // input.keyup((e) => {
      // const inputValue = e.target.value;
      console.log(input.val());

      if (!regex.test(input.val())) {
        console.log("notvalid");
        input.addClass("is-invalid");
        input.removeClass("is-valid");
        isValid = false;

      } else {
        console.log("valid");
        input.addClass("is-valid");
        input.removeClass("is-invalid");
        isValid = true;
      }
    // });
    return isValid;
  }


}
