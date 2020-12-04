// VALIDATION FOR THE REGISTRATION FORM
let regFormVal = () => {
    // Accessing and initializing the html elements.
    const givenName = document.regForm.givenName;
    const givenNameErr = document.getElementById('givenNameErr');
    const surName = document.regForm.surName;
    const surnameErr = document.getElementById('surnameErr');
    // const dob = document.regForm.dob;
    const dobErr = document.getElementById('dobErr');
    const male = document.getElementById('male');
    const female = document.getElementById('female');
    const genderErr = document.getElementById("genderErr");
    const category = document.regForm.category;
    const categoryErr = document.getElementById('categoryErr');
    const occupation = document.regForm.occupation;
    const occupationErr = document.getElementById('occupationErr');
    const nationality = document.regForm.nationality;
    const nationalityErr = document.getElementById('nationalityErr');
    const successMsg = document.getElementById('successMsg');
    /*====REGEX EXPRESSION.====*/
    let regex = /^(?![\s.]+$)[a-zA-Z\s.]$/;

    /* ===VALIDATION STATEMENTS=== */
    if (!givenName.value.match(regex)) {
        givenName.style.border = '1px solid red';
        givenNameErr.innerHTML = "This field name is required.";
        return false;
    };

    if (!surName.value.match(regex)) {
        surName.style.border = '1px solid red';
        surnameErr.innerHTML = "This field name is required";
        surName.focus();
        return false;
    };

    // Birthdate should be added.
    // if (dob == "" || dob == null) {
    //     dobErr.innerHTML = "This field name is required.";
    //     return false;
    // };

    // Gender validation.
    if (male.checked == false && female.checked == false) {
        genderErr.innerHTML = "Please select your gender.";
        return false;
    };

    // category validation.
    if (category.value == "0") {
        category.style.border = '1px solid red';
        categoryErr.innerHTML = "Please select your category.";
        return false;
    };

    // occupation validation.
    if (!occupation.value.match(regex)) {
        occupation.style.border = '1px solid red';
        occupationErr.innerHTML = "This field name is required";
        return false;
    };

    // nationality number validation.
    if (!nationality.value.match(regex)) {
        nationality.style.border = '1px solid red';
        nationalityErr.innerHTML = "This field name is required";
        return false;
    }
    else {
        successMsg.innerHTML = "Registration was successful";
        return true;
    };
};


