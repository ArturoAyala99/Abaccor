(function($) {
    // Function to update labels of text fields
    M.updateTextFields = function() {
        let input_selector =
        'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
        $(input_selector).each(function(element, index) {
        let $this = $(this);
        if (
            element.value.length > 0 ||
            $(element).is(':focus') ||
            element.autofocus ||
            $this.attr('placeholder') !== null
        ) {
            $this.siblings('label').addClass('active');
        } else if (element.validity) {
            $this.siblings('label').toggleClass('active', element.validity.badInput === true);
        } else {
            $this.siblings('label').removeClass('active');
        }
        });
    };

    function show_validate(hasErrors, object, prefix, suffix, parent) {
        if(!hasErrors)
        {
            object.classList.remove('invalid');
            prefix != null ? prefix.classList.remove("invalid") : true;
            suffix != null ? suffix.classList.remove("invalid") : true;

            object.classList.add('valid');
            prefix != null ? prefix.classList.add("valid") : true;
            suffix != null ? suffix.classList.add("valid") : true;

            if (parent !==undefined) {
                if (parent.classList.contains("invalid")) {
                    parent.classList.remove("invalid");
                }
                if(!parent.classList.contains("valid")) {
                    parent.classList.add("valid");
                }
            }
        }
        else {
            object.classList.remove('valid');
            prefix != null ? prefix.classList.remove("valid") : true;
            suffix != null ? suffix.classList.remove("valid") : true;

            object.classList.add('invalid');
            prefix != null ? prefix.classList.add("invalid") : true;
            suffix != null ? suffix.classList.add("invalid") : true;

            if (parent !==undefined) {
                if (parent.classList.contains("valid"))
                    {
                        parent.classList.remove("valid");
                    }
                    if(!parent.classList.contains("invalid")) {
                        parent.classList.add("invalid");
                    }
            }
        }
    };

    M.validate_field = function(object) {
        let element     =  object.tagName === undefined ? object[0] : object;
        let suffix      = element.previousElementSibling;
        let prefix      = suffix != null ? suffix.previousElementSibling : null;
        let parent      = element.parentElement;

        if(element.classList.contains("select-dropdown") && parent.classList.contains("validate")) {
            let selectValidate  = parent.lastElementChild,
                            ul  = parent.querySelector("ul"),
                        suffix  = parent.previousElementSibling,
                        prefix  = suffix != null ? suffix.previousElementSibling : null;

            if(ul && ul.style.display != "block" && selectValidate.hasAttribute("required")) {
                show_validate(!selectValidate.validity.valid, element,  prefix, suffix, parent);
            }
        }
        else {
            let hasValid    = element.validity.valid;
            let lenAttr     = parseInt(element.getAttribute("data-length"));
            let hasReadOnly = null !== element.getAttribute("readOnly") ? element.readOnly : false;
            let hasRequired = null !== element.getAttribute('required') ? element.required : false;
            let haveRegExp  = null !== element.getAttribute("pattern") || false;
            let id          = null !== element.getAttribute("id")  ? element.id : null;
            let name        = null !== element.getAttribute("name")  ? element.name : id;
            let value       = element.value;
            let field       = name;
            let min         = 0;
            let max         = -1;
            let isNum       = false;

            if(id != null) {
                let label = document.querySelector(`label[for='${id}']`);
                field = label ? label.innerText : name;
            }

            if (element.nodeName == 'INPUT' && element.type == 'radio' && name != null) {
                let options = document.getElementsByName(name);
                for (let j = 0; j < options.length; j++) {
                    if (options[j].checked) {
                        value = options[j].value;
                    }
                }
            }
            else if (element.nodeName == 'INPUT' && element.type == 'checkbox') {
                value = element.checked ? 1 : 0;
            }
            else if (element.nodeName == 'INPUT' && element.type == 'number') {
                min = element.getAttribute("min") ? element.min : 0;
                max = element.getAttribute("max") ? element.max : -1;
                isNum = true;
            }
            else if (element.nodeName == 'INPUT' && (element.type == 'text' || element.type == 'password')) {
                min = element.getAttribute("minlength") ? element.minLength : 0;
                max = (isNaN(lenAttr)) ? lenAttr : element.getAttribute("maxlength") ? element.maxLength : -1;
            }
            else if (element.nodeName == 'SELECT') {
                let options       = element.selectedOptions;
                let optionsSelect = [];
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value.trim() != "") {
                        optionsSelect.push(options[i].value);
                    }
                }
                value = optionsSelect;
            }

            let elementValid = { field: field, value: value, error: false, message: "" };

            if(!hasValid) {
                elementValid.error = true;
                elementValid.message = element.validationMessage;
            }
            else {
                //se valida la expresion regular para ver si es valido el formato
                if (haveRegExp) {
                    let er = new RegExp(element.pattern);
                    if (!er.test(value)) {
                        elementValid.error = true;
                        elementValid.message = title;
                    }
                }
                else if(hasReadOnly && hasRequired) {
                    //este escenario sucede al momento que el input sea readonly y se necesite validar
                    if(value == undefined || value == null || value == "" || value == []) {
                        elementValid.error = true;
                        elementValid.message = "is required";
                    }
                    else if ((isNum && (value < min)) || (isNum == false && (value.length < min))) {
                        elementValid.error = true;
                        elementValid.message = "the value is less than the required value";
                    }
                    else if ((isNum && (max != -1 && value > max)) || (isNum == false && (max != -1 && value.length > max))) {
                        elementValid.error = true;
                        elementValid.message = "the value is greater than the allowed value";
                    }
                }
            }

            if (element.classList.contains('validate')) {
                show_validate(elementValid.error, element, prefix, suffix);
            }

            return elementValid;
        }
    };

    M.textareaAutoResize = function($textarea) {
        // Wrap if native element
        if ($textarea instanceof Element) {
            $textarea = $($textarea);
        }

        if (!$textarea.length) {
            console.error('No textarea element found');
            return;
        }

        // Textarea Auto Resize
        let hiddenDiv = $('.hiddendiv').first();
        if (!hiddenDiv.length) {
            hiddenDiv = $('<div class="hiddendiv common"></div>');
            $('body').append(hiddenDiv);
        }

        // Set font properties of hiddenDiv
        let fontFamily = $textarea.css('font-family');
        let fontSize = $textarea.css('font-size');
        let lineHeight = $textarea.css('line-height');

        // Firefox can't handle padding shorthand.
        let paddingTop = $textarea.css('padding-top');
        let paddingRight = $textarea.css('padding-right');
        let paddingBottom = $textarea.css('padding-bottom');
        let paddingLeft = $textarea.css('padding-left');

        if (fontSize) {
            hiddenDiv.css('font-size', fontSize);
        }
        if (fontFamily) {
            hiddenDiv.css('font-family', fontFamily);
        }
        if (lineHeight) {
            hiddenDiv.css('line-height', lineHeight);
        }
        if (paddingTop) {
            hiddenDiv.css('padding-top', paddingTop);
        }
        if (paddingRight) {
            hiddenDiv.css('padding-right', paddingRight);
        }
        if (paddingBottom) {
            hiddenDiv.css('padding-bottom', paddingBottom);
        }
        if (paddingLeft) {
            hiddenDiv.css('padding-left', paddingLeft);
        }

        // Set original-height, if none
        if (!$textarea.data('original-height')) {
            $textarea.data('original-height', $textarea.height());
        }

        if ($textarea.attr('wrap') === 'off') {
            hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
        }

        hiddenDiv.text($textarea[0].value + '\n');
        let content = hiddenDiv.html().replace(/\n/g, '<br>');
        hiddenDiv.html(content);

        // When textarea is hidden, width goes crazy.
        // Approximate with half of window size

        if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
            hiddenDiv.css('width', $textarea.width() + 'px');
        } else {
            hiddenDiv.css('width', window.innerWidth / 2 + 'px');
        }

        /**
         * Resize if the new height is greater than the
         * original height of the textarea
         */
        if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
            $textarea.css('height', hiddenDiv.innerHeight() + 'px');
        } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
            /**
             * In case the new height is less than original height, it
             * means the textarea has less text than before
             * So we set the height to the original one
             */
            $textarea.css('height', $textarea.data('original-height') + 'px');
        }
        $textarea.data('previous-length', $textarea[0].value.length);
    };

    $(document).ready(function() {
        // Text based inputs
        let input_selector =
        'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

        // Add active if form auto complete
        $(document).on('change', input_selector, function() {
            if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
                $(this)
                .siblings('label')
                .addClass('active');
            }
            M.validate_field($(this));
        });

        // Add active if input element has been pre-populated on document ready
        $(document).ready(function() {
            M.updateTextFields();
        });

        // HTML DOM FORM RESET handling
        $(document).on('reset', function(e) {
            let formReset = $(e.target);
            if (formReset.is('form')) {
                formReset
                .find(input_selector)
                .removeClass('valid')
                .removeClass('invalid');
                formReset.find(input_selector).each(function(e) {
                if (this.value.length) {
                    $(this)
                    .siblings('label')
                    .removeClass('active');
                }
                });

                // Reset select (after native reset)
                // setTimeout(function() {
                //   formReset.find('select').each(function() {
                //     // check if initialized
                //     if (this.M_FormSelect) {
                //       $(this).trigger('change');
                //     }
                //   });
                // }, 0);
            }
        });

        /**
         * Add active when element has focus
         * @param {Event} e
         */
        document.addEventListener(
            'focus',
            function(e) {
                if ($(e.target).is(input_selector)) {
                $(e.target)
                    .siblings('label, .prefix')
                    .addClass('active');
                }
            },
            true
        );

        /**
         * Remove active when element is blurred
         * @param {Event} e
         */
        document.addEventListener(
            'blur',
            function(e) {
                let $inputElement = $(e.target);
                if ($inputElement.is(input_selector)) {
                    let selector = '.prefix';

                    if (
                        $inputElement[0].value.length === 0 &&
                        $inputElement[0].validity.badInput !== true &&
                        $inputElement.attr('placeholder') === null
                    ) {
                        selector += ', label';
                    }
                    $inputElement.siblings(selector).removeClass('active');
                    M.validate_field($inputElement);
                }
            },
            true
        );

        // Radio and Checkbox focus class
        let radio_checkbox = 'input[type=radio], input[type=checkbox]';
        $(document).on('keyup', radio_checkbox, function(e) {
        // TAB, check if tabbing to radio or checkbox.
        if (e.which === M.keys.TAB) {
            $(this).addClass('tabbed');
            let $this = $(this);
            $this.one('blur', function(e) {
                $(this).removeClass('tabbed');
            });
            return;
        }
        });

        let text_area_selector = '.abaccor-textarea';
        $(text_area_selector).each(function() {
            let $textarea = $(this);
            /**
             * Resize textarea on document load after storing
             * the original height and the original length
             */
            $textarea.data('original-height', $textarea.height());
            $textarea.data('previous-length', this.value.length);
            M.textareaAutoResize($textarea);
        });

        $(document).on('keyup', text_area_selector, function() {
            M.textareaAutoResize($(this));
        });
        $(document).on('keydown', text_area_selector, function() {
            M.textareaAutoResize($(this));
        });

        // File Input Path
        $(document).on('change', '.file-field input[type="file"]', function() {
            let file_field = $(this).closest('.file-field');
            let path_input = file_field.find('input.file-path');
            let files = $(this)[0].files;
            let file_names = [];
            for (let i = 0; i < files.length; i++) {
                file_names.push(files[i].name);
            }
            path_input[0].value = file_names.join(', ');
            path_input.trigger('change');
        });
    }); // End of $(document).ready
})(cash);
