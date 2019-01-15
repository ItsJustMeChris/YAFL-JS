# YAFL-JS
Yet another form library...

# Usage

Register a form for the library: class="yafl"
Create a form step for a multi step form: class="yafl-step"
Do everything you'd want that step to be..
Register a button after all steps that controls steps/submission: <button class="yafl-button">Next (If one step you can name it Submit or whatever)</button>
Name a form element for a conditional check
Register something on the dom to show/hide with a conditional check:  class="yafl-conditional" data-target="targetName" data-value="conditionalValue" data-action="show"

If using Regex, ignore the data-value attribute and instead use data-regex="regex"

# TODO

Make multilingual button
