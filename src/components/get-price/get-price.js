import $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'jquery-validation/dist/jquery.validate';
import 'jquery-validation/dist/localization/messages_ru';
import {openThanksModal} from "../thanks/thanks";

const gpForm = $('.get-price__form');
const phone = $('[name="phone"]');
const fieldErrorClassName = 'get-price__field-error';
const fieldValidClassName = 'get-price__field-valid';

phone.mask('+7 (999) 999-99-99', { autoclear: false });

$.validator.addMethod('condition', function(value, element, condition) {
    if (typeof condition !== 'function') {
        throw new Error('"condition" rule must return a function');
    }
    return this.optional(element) || condition(value);
});

gpForm.validate({
    rules: {
        'phone': {
            required: true,
            condition: () => (value) => value.indexOf('_') === -1
        },
        email: {
            required: true,
            condition: () => (value) => {
                const expression = new RegExp(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
                return expression.test(value);
            }
        },
    },

    messages: {
        'phone': {
            required: 'Обязательное поле для заполнения',
            condition: 'Пожалуйста, введите 10 цифр номера Вашого телефона'
        },
        'email': {
            required: 'Обязательное поле для заполнения',
            condition: 'Пожалуйста, введите корректный адрес электронной почты'
        }
    },

    highlight: (element) => {
        $(element).addClass(fieldErrorClassName).removeClass(fieldValidClassName);
    },

    unhighlight: (element) => {
        $(element).removeClass(fieldErrorClassName).addClass(fieldValidClassName);
    },

    errorPlacement: function(error, element) {
        error.addClass('get-price__error-message');
        error.insertAfter(element);
    },

    submitHandler: function(form) {
        gpForm.trigger('reset');
        openThanksModal();
    }
});