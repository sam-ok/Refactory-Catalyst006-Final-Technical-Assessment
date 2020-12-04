// VALIDATION FOR THE REGISTRATION FORM
let regFormVal = () => {
    // Accessing and initializing the html elements.
    const givenName = document.regForm.givenName;
    const givenNameErr = document.getElementById('givenNameErr');
    const surName = document.regForm.surName;
    const surnameErr = document.getElementById('surnameErr');
    const dob = document.regForm.dob.value;
    const dobErr = document.getElementById('dobErr');
    const residence = document.regForm.residence;
    const residenceErr = document.getElementById('residenceErr');
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
    // Name validations.
    let regex = /^[a-zA-Z]{1,16}$/;
    // Place of residence validation
    let placeregex = /^(?![\s.]+$)[a-zA-Z\s.]{1,20}$/;
    // Occupation
    let occupationregex = /^(?![\s.]+$)[a-zA-Z\s.]{5,50}$/;

    /* ===VALIDATION STATEMENTS=== */
    if (!surName.value.match(regex)) {
        surName.style.border = '1px solid red';
        surnameErr.innerHTML = "It should be between 1 to 16 alpha-bet characters";
        surName.focus();
        return false;
    };


    if (!givenName.value.match(regex)) {
        givenName.style.border = '1px solid red';
        givenNameErr.innerHTML = "It should be between 1 to 16 alpha-bet characters.";
        return false;
    };

    // Birthdate should be added.
    if (dob == "" || dob == null) {
        dobErr.innerHTML = "The test can only be carried out to a Patient who is at least One year old and at most 150 years old.";
        return false;
    };

    // Place of residence.
    if (!residence.value.match(placeregex)) {
        residence.style.border = '1px solid red';
        residenceErr.innerHTML = "It should be between 1 to 20 alphabet characters.";
        return false;
    };

    // occupation validation.
    if (!occupation.value.match(occupationregex)) {
        occupation.style.border = '1px solid red';
        occupationErr.innerHTML = "It should be between 5 to 50 alphabet characters";
        return false;
    }

    // nationality number validation.
    if (!nationality.value.match(placeregex)) {
        nationality.style.border = '1px solid red';
        nationalityErr.innerHTML = "It should be between 5 to 20 alphabet characters.";
        return false;
    };


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
    }
    else {
    successMsg.innerHTML = "Registration was successful!";
    return true;
};
};


