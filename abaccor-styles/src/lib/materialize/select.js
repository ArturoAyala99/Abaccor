(function($) {
    'use strict';

    let _defaults = {
		classes: '',
		useSearch: false,
		useCheckAll: false,
		textCheckAll: "Check All",
		dropdownOptions: {}
    };

	/**
	 * Lista de caracteres a reemplazar en la busqueda
	 */
	const specialCharacters = {
		"Ã": "A", "À": "A", "Á": "A", "Ä": "A", "Â": "A", "È": "E", "É": "E", "Ë": "E", "Ê": "E", "Ì": "I", "Í": "I",
		"Ï": "I", "Î": "I", "Ò": "O", "Ó": "O", "Ö": "O", "Ô": "O", "Ù": "U", "Ú": "U", "Ü": "U", "Û": "U", "Ç": "C"
	}

    /**
     * @class
     *
     */
    class FormSelect extends Component {
		/**
		 * Construct FormSelect instance
		 * @constructor
		 * @param {Element} el
		 * @param {Object} options
		 */
        constructor(el, options) {
			super(FormSelect, el, options);
			// Don't init if browser default version
			if (this.$el.hasClass('browser-default')) {
				return;
			}

			this.el.M_FormSelect = this;

			/**
			 * Options for the select
			 * @member FormSelect#options
			 */
			this.options = $.extend({}, FormSelect.defaults, options);

			this.isMultiple = this.$el.prop('multiple');

			// Setup
			this.inputSearch = null;
			this.containerCheckAll = null;
			this.inputCheckAll = null;
			this.id = M.guid();
			this.el.tabIndex = -1;
			this._keysSelected = {};
			this._valueDict = {}; // Maps key to original and generated option element.
			this._setupDropdown();

			this._setupEventHandlers();
		}

		static get defaults() {
			return _defaults;
        }

        static init(els, options) {
        	return super.init(this, els, options);
        }

        /**
         * Get Instance
         */
        static getInstance(el) {
			let domElem = !!el.jquery ? el[0] : el;
			return domElem.M_FormSelect;
        }

        /**
         * Teardown component
         */
        destroy() {
			this._removeEventHandlers();
			this._removeDropdown();
			this.el.M_FormSelect = undefined;
        }

        /**
         * Setup Event Handlers
         */
        _setupEventHandlers() {
			this._handleSelectChangeBound = this._handleSelectChange.bind(this);
			this._handleOptionClickBound = this._handleOptionClick.bind(this);
			this._handleInputClickBound = this._handleInputClick.bind(this);

			$(this.dropdownOptions)
			.find('li:not(.optgroup):not(.container-search):not(.container-check-all)')
			.each((el) => {
				el.addEventListener('click', this._handleOptionClickBound);
			});
			this.el.addEventListener('change', this._handleSelectChangeBound);
			this.input.addEventListener('click', this._handleInputClickBound);

			if(this.options.useSearch) {
				this._onFocusSearchBound = this._onFocusSearch.bind(this,false);
				this._onBlurSearchBound = this._onFocusSearch.bind(this,true);
				this._onKeyUpSearchBound = this._handleSearch.bind(this);
				this._onKeyDownSearchBound = this._onKeyDownSearch.bind(this);

				$(this.dropdownOptions)
				.find('li.container-search>div>input')
				.each((el) => {
					this.inputSearch = el;
					this.inputSearch.addEventListener('focus', this._onFocusSearchBound);
					this.inputSearch.addEventListener('blur', this._onBlurSearchBound);
					this.inputSearch.addEventListener('keyup', this._onKeyUpSearchBound);
					this.inputSearch.addEventListener('keydown', this._onKeyDownSearchBound);
				});
			}
			if(this.isMultiple && this.options.useCheckAll) {
				this._onClickCheckAllBound = this._onClickCheckAll.bind(this);

				$(this.dropdownOptions)
				.find('li.container-check-all')
				.each((el) => {
					this.containerCheckAll = el;
					this.inputCheckAll = el.firstElementChild.firstElementChild.firstElementChild || null;
					this.containerCheckAll.addEventListener('click', this._onClickCheckAllBound);
				});
			}
        }

        /**
         * Remove Event Handlers
         */
        _removeEventHandlers() {
			$(this.dropdownOptions)
				.find('li:not(.optgroup)')
				.each((el) => {
				el.removeEventListener('click', this._handleOptionClickBound);
				});
			this.el.removeEventListener('change', this._handleSelectChangeBound);
			this.input.removeEventListener('click', this._handleInputClickBound);

			if(this.options.useSearch && this.inputSearch != null) {
				this.inputSearch.removeEventListener('focus', this._onFocusSearchBound);
				this.inputSearch.removeEventListener('blur', this._onBlurSearchBound);
				this.inputSearch.removeEventListener('keyup', this._onKeyUpSearchBound);
				this.inputSearch.removeEventListener('keydown', this._onKeyDownSearchBound);
			}
			if(this.isMultiple && this.inputCheckAll != null) {
				this.containerCheckAll.removeEventListener('click', this._onClickCheckAllBound);
			}
        }

        /**
         * Handle Select Change
         * @param {Event} e
         */
        _handleSelectChange(e) {
			this._setValueToInput();
        }

        /**
         * Handle Option Click
         * @param {Event} e
         */
        _handleOptionClick(e) {
			e.preventDefault();
			let option = $(e.target).closest('li')[0];
			let key = option.id;
			if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup') && key.length) {
				let selected = true;

				if (this.isMultiple) {
					// Deselect placeholder option if still selected.
					let placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');
					if (placeholderOption.length) {
						placeholderOption.removeClass('selected');
						placeholderOption.find('input[type="checkbox"]').prop('checked', false);
						this._toggleEntryFromArray(placeholderOption[0].id);
					}
					selected = this._toggleEntryFromArray(key);
					if(this.options.useCheckAll && this.inputCheckAll != null) {
						this._setCheckState();
					}
				} else {
					$(this.dropdownOptions)
					.find('li')
					.removeClass('selected');
					$(option).toggleClass('selected', selected);
				}

				// Set selected on original select option
				// Only trigger if selected state changed
				let prevSelected = $(this._valueDict[key].el).prop('selected');
				if (prevSelected !== selected) {
					$(this._valueDict[key].el).prop('selected', selected);
					this.$el.trigger('change');
				}
			}

			e.stopPropagation();
        }

        /**
         * Handle Input Click
         */
        _handleInputClick() {
			if (this.dropdown && this.dropdown.isOpen) {
				this._setValueToInput();
				this._setSelectedStates();
			}
        }

        /**
         * Setup dropdown
         */
        _setupDropdown() {
			this.wrapper = document.createElement('div');
			$(this.wrapper).addClass('select-wrapper ' + this.options.classes);
			this.wrapper.id = `select-wrapper-${this.id}`;
			this.$el.before($(this.wrapper));
			this.wrapper.appendChild(this.el);

			if (this.el.required) {
				this.wrapper.setAttribute('data-required','true');
			}

			if (this.el.disabled) {
				this.wrapper.classList.add('disabled');
			}

			// Create dropdown
			this.$selectOptions = this.$el.children('option, optgroup');
			this.dropdownOptions = document.createElement('ul');
			this.dropdownOptions.id = `select-options-${this.id}`;
			$(this.dropdownOptions).addClass(
				'dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : '')
			);

			// Create dropdown structure.
			if (this.$selectOptions.length) {
				if(this.options.useSearch) {
					$(this.dropdownOptions).append(
						$(
							`<li class="container-search floating-header" tabindex="-1">
								<div class="input-field">
									<i class="material-icons suffix">search</i>
									<input id="input-search-${this.id}" type="search" placeholder="Search" class="active">
								</div>
							</li>`
						)
					);
				}
				if(this.isMultiple && this.options.useCheckAll) {
					$(this.dropdownOptions).append(
						$(
							`<li class="container-check-all" tabindex="-1">
								<span>
									<label>
										<input type="checkbox">
										<span>${this.options.textCheckAll}</span>
									</label>
								</span>
							</li>`
						)
					);
				}

				this.$selectOptions.each((el) => {
					if ($(el).is('option')) {
						// Direct descendant option.
						let optionEl;
						if (this.isMultiple) {
							optionEl = this._appendOptionWithIcon(this.$el, el, 'multiple');
						} else {
							optionEl = this._appendOptionWithIcon(this.$el, el);
						}

						this._addOptionToValueDict(el, optionEl);
					} else if ($(el).is('optgroup')) {
						// Optgroup.
						let selectOptions = $(el).children('option');
						$(this.dropdownOptions).append(
						$('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]
						);

						selectOptions.each((el) => {
						let optionEl = this._appendOptionWithIcon(this.$el, el, 'optgroup-option');
						this._addOptionToValueDict(el, optionEl);
						});
					}
				});
			}

        	this.$el.after(this.dropdownOptions);

			// Add input dropdown
			this.input = document.createElement('input');
			$(this.input).addClass('select-dropdown dropdown-trigger');
			this.input.setAttribute('type', 'text');
			this.input.setAttribute('readonly', 'true');
			this.input.setAttribute('data-target', this.dropdownOptions.id);
			if (this.el.disabled) {
				$(this.input).prop('disabled', 'true');
			}

			this.$el.before(this.input);
			this._setValueToInput();

			// Add caret
			let dropdownIcon = $(
				'<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
			);
        	this.$el.before(dropdownIcon[0]);

			// Initialize dropdown
			if (!this.el.disabled) {
				let dropdownOptions = $.extend({}, this.options.dropdownOptions);

				// Add callback for centering selected option when dropdown content is scrollable
				dropdownOptions.onOpenEnd = (el) => {
					let selectedOption = $(this.dropdownOptions)
					.find('.selected')
					.first();

					if (selectedOption.length) {
						// Focus selected option in dropdown
						M.keyDown = true;
						this.dropdown.focusedIndex = selectedOption.index();
						this.dropdown._focusFocusedItem();
						M.keyDown = false;

						// Handle scrolling to selected option
						if (this.dropdown.isScrollable) {
							let scrollOffset =
								selectedOption[0].getBoundingClientRect().top -
								this.dropdownOptions.getBoundingClientRect().top; // scroll to selected option
							scrollOffset -= this.dropdownOptions.clientHeight / 2; // center in dropdown
							this.dropdownOptions.scrollTop = scrollOffset;
						}

						if (this.inputSearch != null) {
							this.inputSearch.focus();
						}
					}
				};

				if (this.isMultiple) {
					dropdownOptions.closeOnClick = false;
				}

				if(this.options.useSearch ) {
					dropdownOptions.onOpenStart = (el) => {
						this._onOpenStartSearch(this);
					};
					dropdownOptions.onCloseStart = (el) => {
						this._onCloseStartSearch(this);
					};
				}
				this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
			}

			// Add initial selections
			this._setSelectedStates();
        }

        /**
         * Add option to value dict
         * @param {Element} el  original option element
         * @param {Element} optionEl  generated option element
         */
        _addOptionToValueDict(el, optionEl) {
			let index = Object.keys(this._valueDict).length;
			let key = this.dropdownOptions.id + index;
			let obj = {};
			optionEl.id = key;
			obj.el = el;
			obj.optionEl = optionEl;
			this._valueDict[key] = obj;
        }

        /**
         * Remove dropdown
         */
        _removeDropdown() {
			if(this.inputSearch != null) {
				$(this.inputSearch).remove();
			}
			if(this.containerCheckAll != null) {
				$(this.inputCheckAll).remove();
				$(this.containerCheckAll).remove();
			}

			$(this.wrapper)
				.find('.caret')
				.remove();
			$(this.input).remove();
			$(this.dropdownOptions).remove();

			if(this.wrapper && this.wrapper.parentNode != null) {
				$(this.wrapper).before(this.$el);
			}

			$(this.wrapper).remove();
			this.wrapper = undefined;
        }

        /**
         * Setup dropdown
         * @param {Element} select  select element
         * @param {Element} option  option element from select
         * @param {String} type
         * @return {Element}  option element added
         */
        _appendOptionWithIcon(select, option, type) {
			// Add disabled attr if disabled
			let disabledClass = option.disabled ? 'disabled ' : '';
			let optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
			let multipleCheckbox = this.isMultiple
				? `<label><input type="checkbox"${disabledClass}"/><span>${option.innerHTML}</span></label>`
				: option.innerHTML;
			let liEl = $('<li></li>');
			let spanEl = $('<span></span>');
			spanEl.html(multipleCheckbox);
			liEl.addClass(`${disabledClass} ${optgroupClass}`);
			liEl.append(spanEl);

			// add icons
			let iconUrl = option.getAttribute('data-icon');
			if (!!iconUrl) {
				let imgEl = $(`<img alt="" src="${iconUrl}">`);
				liEl.prepend(imgEl);
			}

			// Check for multiple type.
			$(this.dropdownOptions).append(liEl[0]);
			return liEl[0];
        }

        /**
         * Toggle entry from option
         * @param {String} key  Option key
         * @return {Boolean}  if entry was added or removed
         */
        _toggleEntryFromArray(key) {
			let notAdded = !this._keysSelected.hasOwnProperty(key);
			let $optionLi = $(this._valueDict[key].optionEl);

			if (notAdded) {
				this._keysSelected[key] = true;
			} else {
				delete this._keysSelected[key];
			}

			$optionLi.toggleClass('selected', notAdded);

			// Set checkbox checked value
			$optionLi.find('input[type="checkbox"]').prop('checked', notAdded);

			// use notAdded instead of true (to detect if the option is selected or not)
			$optionLi.prop('selected', notAdded);

			return notAdded;
        }

        /**
         * Set text value to input
         */
        _setValueToInput() {
			let values = [];
			let options = this.$el.find('option');

			options.each((el) => {
				if ($(el).prop('selected')) {
				let text = $(el).text();
				values.push(text);
				}
			});

			if (!values.length) {
				let firstDisabled = this.$el.find('option:disabled').eq(0);
				if (firstDisabled.length && firstDisabled[0].value === '') {
					values.push(firstDisabled.text());
				}
			}

			this.input.value = values.join(', ');
        }

        /**
         * Set selected state of dropdown to match actual select element
         */
        _setSelectedStates() {
			this._keysSelected = {};

			for (let key in this._valueDict) {
				let option = this._valueDict[key];
				let optionIsSelected = $(option.el).prop('selected');
				$(option.optionEl)
				.find('input[type="checkbox"]')
				.prop('checked', optionIsSelected);
				if (optionIsSelected) {
					this._activateOption($(this.dropdownOptions), $(option.optionEl));
					this._keysSelected[key] = true;
				} else {
					$(option.optionEl).removeClass('selected');
				}
			}
        }

        /**
         * Make option as selected and scroll to selected position
         * @param {jQuery} collection  Select options jQuery element
         * @param {Element} newOption  element of the new option
         */
        _activateOption(collection, newOption) {
			if (newOption) {
				if (!this.isMultiple) {
					collection.find('li.selected').removeClass('selected');
				}
				let option = $(newOption);
				option.addClass('selected');
			}
        }

        /**
         * Get Selected Values
         * @return {Array}  Array of selected values
         */
        getSelectedValues() {
			let selectedValues = [];
			for (let key in this._keysSelected) {
				selectedValues.push(this._valueDict[key].el.value);
			}
			return selectedValues;
        }

		/**
		* Funcion que se dispara al momento de entrar o salir del focus en el input de busqueda
		*/
		_onFocusSearch(autoFocus) {
			if (!autoFocus) { this.inputSearch.focus() };
			this.dropdown.options.closeOnClick = this.isMultiple ? false : autoFocus;
			this.dropdown.options.autoFocus = autoFocus;
		}

		/**
		* Funcion para buscar
		* @param {event} event
		*/
		_handleSearch(event) {
			if (!this._valueDict) return;
			this._searchValueInput(this._valueDict, (event) ? event.target.value.trim() : "");
			this.dropdown.recalculateDimensions();
		}

		/**
		 * Funcion para realizar reemplazo de caracteres epseciales en la busqueda
		 * @param {} value
		 */
		_rpChar(value) {
			if (!value) return "";
			return value.toUpperCase().replace(/[ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÇ]/ig, function (e) { return specialCharacters[e] });
		}

		/**
		 * Funcion para realizar la busqueda de acuerdo al input de busqueda del componente
		 * @param {} childrens
		 * @param {*} value
		 */
		_searchValueInput(childrens, value) {
			value = this._rpChar(value);
			Object.keys(childrens).map(key => {
				let child = childrens[key];
				let option = child.el;
				if (typeof option != 'object' || !child.optionEl) { return; }
				child.optionEl.hidden = (typeof option.text != "undefined" && (this._rpChar(option.text).indexOf(value) === -1))
			});
		}

		/**
		 * Funcion que se ejecuta cuando se presiona enter al buscador
		 * @param {*} e
		 */
		_onKeyDownSearch(e) {
			if (e.keyCode == 38 || e.keyCode == 40) {
				this.dropdown.options.autoFocus = true;
				this.dropdown.options.closeOnClick = !this.isMultiple;
			}
		}

		/**
		 * Funcion que se ejecuta cuando se abre el dropdown de  las opciones
		*/
		_onOpenStartSearch(value) {
			const { dropdownOptions } = this.options;
			this._handleSearch(null);
			this.dropdown.options.autoFocus = false;
			this.inputSearch.value = "";
			if (dropdownOptions && dropdownOptions.onOpenStart && typeof dropdownOptions.onOpenStart == 'function') {
				dropdownOptions.onOpenStart(value);
			}
		}

		/**
		 * Funcion que se invoca cuando se cierra el dropdown de las opciones
		 * @param {*} closeOnClick
		 */
		_onCloseStartSearch(value) {
			let { useSearch, dropdownOptions } = this.options;
			if (useSearch && this.inputSearch) {
				this.inputSearch.value = "";
				this.dropdown.options.closeOnClick = !this.isMultiple;
				this._handleSearch(null);
			}
			this.dropdown.options.autoFocus = true;
			if (dropdownOptions && typeof dropdownOptions.onCloseStart == 'function') {
				dropdownOptions.onCloseStart(value);
			}
		}

		/**
		 * Funcion que se ejecuta cuando se presiona la opcion check all
		 * @param {*} e
		 */
		_onClickCheckAll(e) {
			e.preventDefault();
			let {checked} = this.inputCheckAll || false;
			this.setChangeCheckAll(!checked);
		}

		/**
		 *
		 * @param {*} isChecked
		 */
		setChangeCheckAll(isChecked) {
			if (!this.isMultiple || !this._valueDict) return;

			Object.keys(this._valueDict).map(key => {
				let child = this._valueDict[key];
				let element = child.el || undefined;
				if(element == undefined || $(element).hasClass("container-check-all")|| $(element).hasClass("container-search") ) {
					return;
				}
				let check = child.optionEl.getElementsByTagName("input")[0]|| undefined;
				if (check == undefined || check.type != 'checkbox' || check.type == "checkbox" && check.checked == isChecked) {
					return;
				}
				$(child.optionEl).trigger('click');
			});

			if(this.inputCheckAll != null) {
				this.inputCheckAll.checked = isChecked;
			}
		}

		/**
         * Asigna el check al input de check all
         */
		_setCheckState() {
			if(this.inputCheckAll != null) {
				let countOptions = 0;

				for (let key in this._valueDict) {
					let option = this._valueDict[key];
					let element = $(option.optionEl);
					if(!element.hasClass("disabled") && !element.hasClass("container-check-all") && !element.hasClass("container-search")) {
						countOptions++;
					}
				}
				const countSelected =Object.keys(this._keysSelected).length || 0;
				const check = countSelected > 0 && countSelected == countOptions;
				this.inputCheckAll.checked= check;
			}
        }
    }

    M.FormSelect = FormSelect;

    if (M.jQueryLoaded) {
        M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
    }
})(cash);