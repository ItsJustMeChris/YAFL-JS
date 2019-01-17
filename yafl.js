(function () {
    let forms = Array.from(document.getElementsByClassName('yafl')).map((form) => {
        form.steps = Array.from(form.getElementsByClassName('yafl-step'));
        form.buttons = Array.from(form.getElementsByClassName('yafl-button'));
        form.progress = 1;
        form.conditionals = Array.from(form.getElementsByClassName('yafl-conditional')).map((conditional) => {
            conditional.targets = Array.from(document.getElementsByName(conditional.dataset.target));
            return conditional;
        });
        return form;
    });

    function showHide(e) {
        if (e.dataset.action == "show" && e.style.display != "") {
            e.style.display = "";
            return e;
        } else if (e.dataset.action == "hide" && e.style.display != "none") {
            e.style.display = "none";
            return e;
        }
        if (e.dataset.action == "show" && e.style.display != "none") {
            e.style.display = "none";
            return e;
        } else if (e.dataset.action == "hide" && e.style.display != "") {
            e.style.display = "";
            return e;
        }
    }

    function checkConditional(c, e) {
        if (c.dataset.regex != undefined) {
            let reg = new RegExp(c.dataset.regex);
            if (e.target.value.match(reg)) {
                return showHide(c)
            } else {
                return showHide(c)
            }
        }
        if (e.target.value == c.dataset.value) {
            return showHide(c)
        } else {
            return showHide(c)
        }
    }

    function nextStep(form) {
        for (let i = 0; i < form.steps.length; i++) {
            let step = form.steps[i];
            if (i != form.progress) {
                step.style.display = "none";
            } else {
                step.style.display = "";
            }
        }
        return form;
    }

    forms.forEach((form) => {
        form.conditionals.forEach((c) => {
            c.targets.forEach((t) => {
                t.addEventListener('input', (e) => {
                    checkConditional(c, e)
                });
            });
        });

        form.buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (form.progress != form.steps.length) {
                    e.preventDefault();
                }
                if (form.progress == form.steps.length - 1) {
                    button.innerHTML = button.dataset.submittext != undefined ? button.dataset.submittext : "Submit";
                }
                nextStep(form);
                form.progress += 1;
            });
        });
    });
})();