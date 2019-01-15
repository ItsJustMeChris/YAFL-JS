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
                    if (c.dataset.regex != undefined) {
                        let reg = new RegExp(c.dataset.regex);
                        if (e.target.value.match(reg)) {
                            return showHide(c, true)
                        } else {
                            return showHide(c, false)
                        }
                    }
                    if (e.target.value == c.dataset.value) {
                        return showHide(c, true)
                    } else {
                        return showHide(c, false)
                    }
                });
            });
        });
    }

    function showHide(e, bool) {
        if (bool) {
            if (e.dataset.action == "show") {
                e.style.display = "";
            } else if (e.dataset.action == "hide") {
                e.style.display = "none";
            }
        } else {
            if (e.dataset.action == "show") {
                e.style.display = "none";
            } else if (e.dataset.action == "hide") {
                e.style.display = "";
            }
        }
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