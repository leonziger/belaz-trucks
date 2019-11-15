import $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'jquery-validation/dist/jquery.validate';
import 'jquery-validation/dist/localization/messages_ru';
import {openThanksModal} from "../thanks/thanks";

const fcForm = $('.free-consultation__form');
const phone = $('[name="phone"]');
const fieldErrorClassName = 'parts-search__field-error';
const fieldValidClassName = 'parts-search__field-valid';

phone.mask('+7 (999) 999-99-99', { autoclear: false });

$.validator.addMethod('condition', function(value, element, condition) {
    if (typeof condition !== 'function') {
        throw new Error('"condition" rule must return a function');
    }
    return this.optional(element) || condition(value);
});

const fcValidator = fcForm.validate({
    rules: {
        'phone': {
            required: true,
            condition: () => (value) => value.indexOf('_') === -1
        }
    },

    messages: {
        'phone': {
            required: 'Обязательное поле для заполнения',
            condition: 'Пожалуйста, введите 10 цифр номера Вашого телефона'
        }
    },

    highlight: (element) => {
        $(element).addClass(fieldErrorClassName).removeClass(fieldValidClassName);
    },

    unhighlight: (element) => {
        $(element).removeClass(fieldErrorClassName).addClass(fieldValidClassName);
    },

    errorPlacement: function(error, element) {
        error.addClass('parts-search__error-message');
        error.insertAfter(element);
    },

    submitHandler: function(form) {
        fcForm.trigger('reset');
        openThanksModal();
    }
});

fcForm.click( function() {
    console.log('click');
    fcValidator.form();
});
