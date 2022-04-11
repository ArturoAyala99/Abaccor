/**
 * @class
 *
 */
class FloatingSheetButton extends Component {
	/**
	 * Construct FloatingSheetButton instance
	 * @constructor
	 * @param {Element} el
	 * @param {Object} options
	 */
	constructor(el, options) {
		super(FloatingSheetButton, el, options);

		this.el.C_FloatingSheetButton = this;

		/**
		 * Options for the FBS
		 * @member FloatingSheetButton #options
		 * @prop {Function} onOpenStart - Function called when dropdown starts opening
		 * @prop {Function} onOpenEnd - Function called when dropdown finishes opening
		 * @prop {Function} onCloseStart - Function called when dropdown starts closing
		 * @prop {Function} onCloseEnd - Function called when dropdown finishes closing
		 */
		this.options = Object.assign({}, FloatingSheetButton.defaults, options);

		this.isOpen = false;
		this.isDisabled = false;

		this._setupEventHandlers();
		this._createOverlay();
	}

	static get defaults() {

		return	{
					onOpenStart: null,
					onOpenEnd: null,
					onCloseStart: null,
					onCloseEnd: null
				};
	}

	static init(els, options) {
		return super.init(this, els, options);
	}

	/**
	 * Get Instance
	 */
	static getInstance(el) {
		let domElem = el;
		return domElem.C_FloatingSheetButton;
	}

	/**
	 * Teardown component
	 */
	destroy() {
		this._removeEventHandlers();
		let parent = this._overlay.parentNode;
		if(parent !== undefined && parent !== null) {
			this._overlay.parentNode.removeChild(this._overlay);
		}
		this.el.C_FloatingSheetButton = undefined;
	}

    _createOverlay() {
		let overlay = document.createElement('div');
		this._closeBound = this.close.bind(this);
		overlay.classList.add('overlay-floating-sheet');

		overlay.addEventListener('click', this._closeBound);

		document.body.appendChild(overlay);
		this._overlay = overlay;
    }


	/**
	 * Setup Event Handlers
	 */
	_setupEventHandlers() {
		this._handleClickBound = this._handleClick.bind(this);
		this._handleOpenBound = this.open.bind(this);
		this._handleCloseBound = this.close.bind(this);

		this.el.addEventListener('click', this._handleClickBound);
	}

	/**
	 * Remove Event Handlers
	 */
	_removeEventHandlers() {
		this.el.removeEventListener('click', this._handleClickBound);
	}

	/**
	 * Handle FBS Click
	 */
	_handleClick() {
		if(!this.el.classList.contains('disabled')) {
			if (this.isOpen) {
				this.close();
			} else {
				this.open();
			}
		}
	}

	/**
	 * Open FBS
	 */
	open() {
		if (this.isOpen) {
			return;
		}

		// onOpenStart callback
		if (typeof this.options.onOpenStart === 'function') {
			this.options.onOpenStart.call(this, this.el);
		}

		this.el.parentElement.classList.add("active");
		this._overlay.style.display = 'block';
		this.isOpen = true;

		// onOpenEnd callback
		if (typeof this.options.onOpenEnd === 'function') {
			this.options.onOpenEnd.call(this, this.el);
		}
	}

	/**
	 * Close FBS
	 */
	close() {
		if (!this.isOpen) {
			return;
		}
		// onCloseStart callback
		if (typeof this.options.onCloseStart === 'function') {
			this.options.onCloseStart.call(this, this.el);
		}

		this.el.parentElement.classList.remove("active");
		this._overlay.style.display = 'none';
		this.isOpen = false;

		// onCloseEnd callback
		if (typeof this.options.onCloseEnd === 'function') {
			this.options.onCloseEnd.call(this, this.el);
		}
	}

	/**
	 * setDisabled FBS
	 */
	setDisabled(disabled) {
		let hasClassDisabled = this.el.classList.contains('disabled');
		let isDisabled = disabled === undefined ? true : disabled;
		if(isDisabled  && !hasClassDisabled) {
			this.el.classList.add("disabled");
		}
		else if(!isDisabled && hasClassDisabled) {
			this.el.classList.remove("disabled");
		}
	}

	/**
	 * setOptions FBS
	 */
	setOptions(options) {
		this.options = Object.assign({}, FloatingSheetButton.defaults, options);
	}

	/**
	 * setOpenStart FBS
	 */
	setOpenStart(event) {
		this.options.onOpenStart = event;
	}

	/**
	 * setOpenEnd FBS
	 */
	setOpenEnd(event) {
		this.options.onOpenEnd = event;
	}

	/**
	 * setCloseStart FBS
	 */
	setCloseStart(event) {
		this.options.onCloseStart = event;
	}

	/**
	 * setCloseEnd FBS
	 */
	setCloseEnd(event) {
		this.options.onCloseEnd = event;
	}
}
//Asigna la referencia al index
C.FloatingSheetButton= FloatingSheetButton;