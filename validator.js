function Validator(options) {
    let formElement = document.querySelector(options.form);
    options.rules.forEach(rule => {
        let ruleElement = formElement.querySelector(rule.selector);
        let messageElement = ruleElement.parentElement.querySelector(".text-field-message");
        ruleElement.onblur = () => {
            if (ruleElement) {
                validate(messageElement, rule, ruleElement);
            }
        }
        ruleElement.oninput = () => {
            ruleElement.parentElement.classList.remove("has-error");
            messageElement.innerText = "";
        }
    });

}

function validate(messageElement, rule, ruleElement) {
    let message = rule.test(ruleElement.value);
    if (message) {
        messageElement.innerText = message;
        ruleElement.parentElement.classList.add("has-error")
    } else {
        messageElement.innerText = "";
        ruleElement.parentElement.classList.remove("has-error")
    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : "Nhập trường này !";
        }
    };
}

Validator.isEmail = function(selector) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        selector: selector,
        test: function(value) {
            return regexEmail.test(value.trim()) ? undefined : "Nhập trường này là email !"
        }
    };
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim().length >= min ? undefined : `Nhập tối thiểu ${min} kí tự !`;
        }
    };
}