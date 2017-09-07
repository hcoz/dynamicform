(function ($) {
    $(function () {
        var formElements = $('dynamicform');

        for (var formElement of formElements) {
            $.getJSON(formElement.dataset.json + '.json', function (formData) {
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
                        $field.prop('class', formRow.fieldSpecs.class);

                        $label = $('<label></label>');
                        $label.prop('class', formRow.label.class);
                        $label.prop('for', formRow.label.for);

                        $input = $('<input/>');
                        $input.prop('id', formRow.input.id);
                        $input.prop('class', formRow.input.class);
                        $input.prop('type', formRow.input.type);
                        
                        // append label and input to field div
                        $field.append($label).append($input);
                        // append field div to fieldset
                        $fieldset.append($field);
                    }
                    // append fieldset to form
                    $form.append($fieldset);
                }
                $(formElement).replaceWith($form);
            });
        }
    });
}(jQuery));
