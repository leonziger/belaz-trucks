import $ from 'jquery';
import vex from 'vex-js';
import {openThanksModal} from "../thanks/thanks";


$('.main-header__contacts-button').click(function (e) {
    e.preventDefault();
    const modal = $(`[data-modal=callback]`);

    if (!modal.length) {
        return console.error('Modal is not exist!');
    }

    vex.open({
        unsafeContent: modal.html(),
        closeClassName: 'modal__close',
        afterOpen: function () {
            const cbForm = $('.callback__form');
            const phone = $('[name="phone"]');
            const fieldErrorClassName = 'callback__phone-error';
            const fieldValidClassName = 'callback__phone-valid';
            phone.mask('+7 (999) 999-99-99', { autoclear: false });

            $.validator.addMethod('condition', function(value, element, condition) {
                if (typeof condition !== 'function') {
                    throw new Error('"condition" rule must return a function');
                }
                return this.optional(element) || condition(value);
            });

            cbForm.validate({
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
                    error.addClass('callback__error-message');
                    error.insertAfter(element);
                },

                submitHandler: function(form) {
                    cbForm.trigger('reset');
                    $('.modal__close').trigger('click');
                    openThanksModal();
                }
            });
        }
    });
});