(function () {
    /**
     * Determine the ready state of DOM
     * @param {*function} fn 
     */
    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    /**
     * Read JSON file
     * @param {*url of JSON file} path
     * @param {*function} callback
     */
    function readTextFile(path, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", path, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    /**
     * Generate form according to structure JSON
     * @param {*JSON object which includes form data} formData 
     */
    function generateForm(textData) {
        var formData = JSON.parse(textData);
        var $form,
            $fieldset,
            $field,
            $label,
            $input;

        if (!formData) throw 'No JSON data';
        
        $form = document.createElement('form');
        $form.setAttribute('name', formData.formSpecs.formName);
        $form.setAttribute('method', formData.formSpecs.method);
        $form.setAttribute('action', formData.formSpecs.action);

        for (var fieldset of formData.formRows) {
            $fieldset = document.createElement('fieldset');

            for (var formRow of fieldset) {
                $field = document.createElement('div');
                if ('class' in formRow.fieldSpecs) $field.setAttribute('class', formRow.fieldSpecs.class);

                $label = document.createElement('label');
                if ('class' in formRow.label) $label.setAttribute('class', formRow.label.class);
                $label.setAttribute('for', formRow.label.for);
                var textNode = document.createTextNode(formRow.label.text || '');
                $label.appendChild(textNode);

                if (formRow.input.type == 'textarea') {
                    $input = document.createElement('textarea');
                } else {
                    $input = document.createElement('input');
                    $input.setAttribute('type', formRow.input.type);
                }
                $input.setAttribute('id', formRow.input.id);
                $input.setAttribute('name', formRow.input.name);
                if ('class' in formRow.input) $input.setAttribute('class', formRow.input.class);
                if ('value' in formRow.input) $input.setAttribute('value', formRow.input.value);
                if ('placeholder' in formRow.input) $input.setAttribute('placeholder', formRow.input.placeholder);
                $input.setAttribute('disabled', formRow.input.disabled || false);
                $input.setAttribute('required', formRow.input.required || false);
                $input.setAttribute('readonly', formRow.input.readonly || false);

                /* type specific input attributes, all of them are included for future improvements
                * reference source is https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input 
                */
                switch (formRow.input.type) {
                    case 'button':
                        break;
                    case 'checkbox':
                        $form.setAttribute('checked', formRow.input.checked || false);
                        break;
                    case 'color':
                        break;
                    case 'date':
                    case 'datetime-local':
                        if ('min' in formRow.input) $input.setAttribute('min', formRow.input.min);
                        if ('max' in formRow.input) $input.setAttribute('max', formRow.input.max);
                        if ('pattern' in formRow.input) $input.setAttribute('pattern', formRow.input.pattern);
                        break;
                    case 'email':
                        $input.setAttribute('multiple', formRow.input.multiple || false);
                        if ('size' in formRow.input) $input.setAttribute('size', formRow.input.size);
                        if ('minLength' in formRow.input) $input.setAttribute('minLength', formRow.input.minLength);
                        if ('maxLength' in formRow.input) $input.setAttribute('maxLength', formRow.input.maxLength);
                        if ('pattern' in formRow.input) $input.setAttribute('pattern', formRow.input.pattern);
                        break;
                    case 'file':
                        $input.setAttribute('multiple', formRow.input.multiple || false);
                        if ('accept' in formRow.input) $input.setAttribute('accept', formRow.input.accept);
                        break;
                    case 'hidden':
                        break;
                    case 'image':
                        $input.setAttribute('src', formRow.input.src);
                        if ('alt' in formRow.input) $input.setAttribute('alt', formRow.input.alt);
                        if ('width' in formRow.input) $input.setAttribute('width', formRow.input.width);
                        if ('height' in formRow.input) $input.setAttribute('height', formRow.input.height);
                        break;
                    case 'month':
                        break;
                    case 'number':
                        break;
                    case 'password':
                        $input.setAttribute('autocoplete', formRow.input.autocomplete || false);
                        $input.setAttribute('inputmode', formRow.input.inputmode || false);
                        if ('size' in formRow.input) $input.setAttribute('size', formRow.input.size);
                        if ('minLength' in formRow.input) $input.setAttribute('minLength', formRow.input.minLength);
                        if ('maxLength' in formRow.input) $input.setAttribute('maxLength', formRow.input.maxLength);
                        if ('pattern' in formRow.input) $input.setAttribute('pattern', formRow.input.pattern);
                        break;
                    case 'radio':
                        $form.setAttribute('checked', formRow.input.checked || false);
                        break;
                    case 'range':
                        if ('min' in formRow.input) $input.setAttribute('min', formRow.input.min);
                        if ('max' in formRow.input) $input.setAttribute('max', formRow.input.max);
                        if ('step' in formRow.input) $input.setAttribute('step', formRow.input.step);
                        break;
                    case 'reset':
                        break;
                    case 'search':
                        $input.setAttribute('autocoplete', formRow.input.autocomplete || false);
                        if ('placeholder' in formRow.input) $input.setAttribute('placeholder', formRow.input.placeholder);
                        if ('size' in formRow.input) $input.setAttribute('size', formRow.input.size);
                        if ('minLength' in formRow.input) $input.setAttribute('minLength', formRow.input.minLength);
                        if ('maxLength' in formRow.input) $input.setAttribute('maxLength', formRow.input.maxLength);
                        if ('pattern' in formRow.input) $input.setAttribute('pattern', formRow.input.pattern);
                        break;
                    case 'submit':
                        break;
                    case 'text':
                        if ('placeholder' in formRow.input) $input.setAttribute('placeholder', formRow.input.placeholder);
                        break;
                    case 'textarea':
                        $input.setAttribute('rows', formRow.input.rows || '');
                        $input.setAttribute('cols', formRow.input.cols || '');
                    case 'time':
                        if ('step' in formRow.input) $input.setAttribute('step', formRow.input.step);
                        break;
                    default:
                }
                
                // append label and input to field div
                $field.appendChild($label);
                $field.appendChild($input);
                // append field div to fieldset
                $fieldset.appendChild($field);
            }
            // append fieldset to form
            $form.appendChild($fieldset);
        }
        document.getElementById(this.formId).replaceWith($form);
    }

    // document ready actions
    ready(function() {
        var formElements = document.querySelectorAll('dynamicform');

        for (var formElement of formElements) {
            readTextFile(formElement.dataset.json, generateForm.bind({"formId": formElement.id}));
        } 
    })
})();
