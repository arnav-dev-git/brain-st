const alertD = document.querySelector(".alert-danger");
const alertS = document.querySelector(".alert-success");
const loader = document.querySelector(".loader");

alertD.style.display = "none";
alertS.style.display = "none";

const handleSubmit = () => {
    const gender = document.querySelector("#exampleFormControlInput0").value;
    let age = document.querySelector("#exampleFormControlInput1").value;
    const hyper_tension = document.querySelector("#exampleFormControlInput2").value;
    const heart_disease = document.querySelector("#exampleFormControlInput3").value;
    const work_type = document.querySelector("#exampleFormControlInput4").value;
    const residence_type = document.querySelector("#exampleFormControlInput6").value;
    let glucose_level = document.querySelector("#exampleFormControlInput7").value;
    let bmi = document.querySelector("#exampleFormControlInput8").value;
    const smoking_status = document.querySelector("#exampleFormControlInput9").value;
    const has_stroke = document.querySelector("#exampleFormControlInput10").value;

    // age
    if (age <= 25) {
        age = 0;
    } else if (age > 25 && age <= 39) {
        age = 1;
    } else if (age > 39 && age <= 59) {
        age = 2;
    } else if (age > 59) {
        age = 3;
    }

    // bmi
    if (bmi <= 23) {
        bmi = 0;
    } else if (bmi > 23 && bmi <= 28) {
        bmi = 1;
    } else if (bmi > 28 && bmi <= 32) {
        bmi = 2;
    } else if (bmi > 32) {
        bmi = 3;
    }

    //glucose level
    if (glucose_level <= 50) {
        glucose_level = 0
    } else if (glucose_level > 50 && glucose_level <= 100) {
        glucose_level = 1
    } else if (glucose_level > 100 && glucose_level <= 150) {
        glucose_level = 2
    } else if (glucose_level > 150 && glucose_level <= 200) {
        glucose_level = 3
    } else if (glucose_level > 200) {
        glucose_level = 4
    }

    let payload = [Number(gender), age, Number(hyper_tension), Number(heart_disease), Number(work_type), Number(residence_type), glucose_level, bmi, Number(smoking_status), Number(has_stroke)];

    payload = encodeURIComponent(JSON.stringify(payload));

    console.log(payload);

    loader.style.display = "flex";

    fetch('/api?array=' + payload)
        .then((response) => response.json())
        .then((data) => {
            loader.style.display = "none";
            console.log(data, data.output[1]);
            if (Number(data.output[1]) === 0) {
                alertS.style.display = "block";
                alertD.style.display = "none";
            } else {
                alertD.style.display = "block";
                alertS.style.display = "none";
            }
        });
}

const submitBtn = document.querySelector('.submit');

console.log(submitBtn)

submitBtn.addEventListener('click', () => {
    handleSubmit();
})