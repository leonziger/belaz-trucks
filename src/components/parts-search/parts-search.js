import $ from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'jquery-validation/dist/jquery.validate';
import 'jquery-validation/dist/localization/messages_ru';
import {openThanksModal} from "../thanks/thanks";

const psForm = $('.parts-search__form');
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

psForm.validate({
    rules: {
        'phone': {
            required: true,
            condition: () => (value) => value.indexOf('_') === -1
        },
        'artikul': {
            required: true,
            condition: () => (value) => {
                const expression = new RegExp(/^[\d]+$/);
                if(expression.test(value)) {
                    return expression.test(value);
                }
            },
            minlength: 4
        }
    },

    messages: {
        'phone': {
            required: 'Обязательное поле для заполнения',
            condition: 'Пожалуйста, введить 10 цифр номера Вашого телефона'
        },
        'artikul': {
            required: 'Обязательное поле для заполнения',
            minlength: 'Пожалуйста, вводите только числа, минимум {0} символов',
            condition: 'Пожалуйста, вводите только числа'
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
        psForm.trigger('reset');
        openThanksModal();
    }
});
