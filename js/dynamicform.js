(function () {
    var formElements = document.querySelectorAll('dynamicform');

    for(let formElement of formElements) {
        console.log(formElement.dataset.json + '.json');
        var formData = require(formElement.dataset.json + '.json');

    }
    
})();
