(function () {


    let forms = Array.from(document.getElementsByClassName('yafl'));

    let formSteps = forms.map(e => Array.from(e.getElementsByClassName('yafl-step')));

    let formButtons = forms.map(e => Array.from(e.getElementsByClassName('yafl-button')));

    let formProgress = forms.map(e => 0);

    let formConditionals = Array.from(document.getElementsByClassName('yafl-conditional'));

    function setupConditionals() {
        formConditionals.forEach((c) => {
            let conditionalTargets = document.getElementsByName(c.dataset.target);
            conditionalTargets.forEach((t) => {
                t.addEventListener('input', (e) => {
                    if (e.target.value == c.dataset.value) {
                        if (c.dataset.action == "show") {
                            c.style.display = "";
                        } else if (c.dataset.action == "hide") {
                            c.style.display = "none";
                        }
                    } else {
                        if (c.dataset.action == "show") {
                            c.style.display = "none";
                        } else if (c.dataset.action == "hide") {
                            c.style.display = "";
                        }
                    }
                });
            });
        });
    }

    function setupForms() {
        for (let i = 0; i < forms.length; i++) {
            for (let b = 0; b < formButtons[i].length; b++) {
                formButtons[i][b].addEventListener('click', (e) => {
                    if (formProgress[i] != formSteps[i].length - 1) {
                        e.preventDefault();
                    }
                    formProgress[i] += 1;
                    if (formProgress[i] == formSteps[i].length - 1) {
                        formButtons[i][b].innerHTML = "Submit";
                    }
                    showNextStep();
                });
            }
        }
    }

    function showNextStep() {
        for (let f = 0; f < forms.length; f++) {
            let progress = formProgress[f];
            for (let i = 0; i < formSteps[f].length; i++) {
                let step = formSteps[f][i];
                if (i != progress) {
                    step.style.display = "none";
                } else {
                    step.style.display = "";
                }
            }
        }
    }

    showNextStep();
    setupForms();
    setupConditionals();
})();