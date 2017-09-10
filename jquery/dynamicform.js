(function ($) {
    function generateForm(formData) {
        var $form,
            $fieldset,
            $field,
            $label,
            $input;
        
        $form = $('<form></form>');
        $form.prop('name', formData.formSpecs.formName);
        $form.prop('method', formData.formSpecs.method);
        $form.prop('action', formData.formSpecs.action);

        for (var fieldset of formData.formRows) {
            $fieldset = $('<fieldset></fieldset>');

            for (var formRow of fieldset) {
                $field = $('<div></div>');
                if ('class' in formRow.fieldSpecs) $field.prop('class', formRow.fieldSpecs.class);

                $label = $('<label></label>');
                if ('class' in formRow.label) $label.prop('class', formRow.label.class);
                $label.prop('for', formRow.label.for);
                $label.text(formRow.label.text || '');

                $input = $('<input/>');
                $input.prop('id', formRow.input.id);
                $input.prop('name', formRow.input.name);
                if ('class' in formRow.input) $input.prop('class', formRow.input.class);
                if ('value' in formRow.input) $input.prop('value', formRow.input.value);
                if ('placeholder' in formRow.input) $input.prop('placeholder', formRow.input.placeholder);
                $input.prop('type', formRow.input.type);
                $input.prop('disabled', formRow.input.disabled || false);
                $input.prop('required', formRow.input.required || false);
                $input.prop('readonly', formRow.input.readonly || false);

                /* type specific input attributes, all of them are included for future improvements
                 * reference source is https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input 
                */
                switch (formRow.input.type) {
                    case 'button':
                        break;
                    case 'checkbox':
                        $form.prop('checked', formRow.input.checked || false);
                        break;
                    case 'color':
                        break;
                    case 'date':
                    case 'datetime-local':
                        if ('min' in formRow.input) $input.prop('min', formRow.input.min);
                        if ('max' in formRow.input) $input.prop('max', formRow.input.max);
                        if ('pattern' in formRow.input) $input.prop('pattern', formRow.input.pattern);
                        break;
                    case 'email':
                        $input.prop('multiple', formRow.input.multiple || false);
                        if ('size' in formRow.input) $input.prop('size', formRow.input.size);
                        if ('minLength' in formRow.input) $input.prop('minLength', formRow.input.minLength);
                        if ('maxLength' in formRow.input) $input.prop('maxLength', formRow.input.maxLength);
                        if ('pattern' in formRow.input) $input.prop('pattern', formRow.input.pattern);
                        break;
                    case 'file':
                        $input.prop('multiple', formRow.input.multiple || false);
                        if ('accept' in formRow.input) $input.prop('accept', formRow.input.accept);
                        break;
                    case 'hidden':
                        break;
                    case 'image':
                        $input.prop('src', formRow.input.src);
                        if ('alt' in formRow.input) $input.prop('alt', formRow.input.alt);
                        if ('width' in formRow.input) $input.prop('width', formRow.input.width);
                        if ('height' in formRow.input) $input.prop('height', formRow.input.height);
                        break;
                    case 'month':
                        break;
                    case 'number':
                        break;
                    case 'password':
                        $input.prop('autocoplete', formRow.input.autocomplete || false);
                        $input.prop('inputmode', formRow.input.inputmode || false);
                        if ('size' in formRow.input) $input.prop('size', formRow.input.size);
                        if ('minLength' in formRow.input) $input.prop('minLength', formRow.input.minLength);
                        if ('maxLength' in formRow.input) $input.prop('maxLength', formRow.input.maxLength);
                        if ('pattern' in formRow.input) $input.prop('pattern', formRow.input.pattern);
                        break;
                    case 'radio':
                        $form.prop('checked', formRow.input.checked || false);
                        break;
                    case 'range':
                        if ('min' in formRow.input) $input.prop('min', formRow.input.min);
                        if ('max' in formRow.input) $input.prop('max', formRow.input.max);
                        if ('step' in formRow.input) $input.prop('step', formRow.input.step);
                        break;
                    default:
                }
                
                // append label and input to field div
                $field.append($label).append($input);
                // append field div to fieldset
                $fieldset.append($field);
            }
            // append fieldset to form
            $form.append($fieldset);
        }
        $(document.getElementById(this.formId)).replaceWith($form);
    }

    $(function () {
        var formElements = $('dynamicform');

        for (var formElement of formElements) {
            $.getJSON(formElement.dataset.json, generateForm.bind({formId: formElement.dataset.id}));
        }
    });
}(jQuery));
