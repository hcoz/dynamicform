// (function () {
//     var formElements = document.querySelectorAll('dynamicform');

//     for(let formElement of formElements) {
//         console.log(formElement.dataset.json + '.json');
//         var formData = require(formElement.dataset.json + '.json');

//     }
    
// })();

jQuery.noConflict();
(function ($) {
    $(function () {
        var formElements = $('dynamicform');

        for(let formElement of formElements) {
            var form;

            $.getJSON(formElement.dataset.json + '.json', function (formData) {
                var form = '<form name="' + formData.formSpecs.formName 
                    + '" method="' + formData.formSpecs.method 
                    + '" action="' + formData.formSpecs.action + '">';

                for(let formRow of formData.formRows) {
                    form += '<fieldset><label class="' + formRow.label.class + '">'
                        + formRow.label.text + '</label>' 
                        + '<input name="' + formRow.input.name 
                        + '" type="' + formRow.input.type 
                        + '" value="' + formRow.input.value
                        + '" class="' + formRow.input.class + '"/></fieldset>';
                }
                form += '</form>';
                $(formElement).replaceWith(form);
            });
        }
    });
})(jQuery);
