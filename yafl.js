(function () {
    let forms = Array.from(document.getElementsByClassName('yafl')).map((form) => {
        form.steps = Array.from(form.getElementsByClassName('yafl-step'));
        form.buttons = Array.from(form.getElementsByClassName('yafl-button'));
        form.progress = 0;
        form.conditionals = Array.from(form.getElementsByClassName('yafl-conditional')).map((conditional) => {
            conditional.targets = Array.from(document.getElementsByName(conditional.dataset.target));
            return conditional;
        });
        return form;
    });

    forms.forEach((form) => {
        form.conditionals.forEach((c) => {
            c.targets.forEach((t) => {
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

        form.buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (form.progress != form.steps.length - 1) {
                    e.preventDefault();
                }
                form.progress += 1;
                if (form.progress == form.steps.length - 1) {
                    button.innerHTML = "Submit";
                }
                for (let i = 0; i < form.steps.length; i++) {
                    let step = form.steps[i];
                    if (i != form.progress) {
                        step.style.display = "none";
                    } else {
                        step.style.display = "";
                    }
                }
            });
        });
    });

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
})();