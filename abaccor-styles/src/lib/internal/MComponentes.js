/**
* @author Felipe Tun <ftun@palaceresorts.com>
* @var object. Clase para inicializacion de los componentes de Materialize 1.0.0
*/
const MComponentes = {};

/**
* @author Angel Solis <angesolis@palaceresorts.com>
* @var object. array de Clase para validacion y obtener la instancia de los componentes de Materialize 1.0.0
*/
const COMPONENTSCLASS = {
                            "carousel"         : (element) => { return window.M.Carousel.getInstance(element);    },
                            "collapsible"      : (element) => { return window.M.Collapsible.getInstance(element); },
                            "datepicker"       : (element) => { return window.M.Datepicker.getInstance(element);  },
                            "dropdown-trigger" : (element) => { return window.M.Dropdown.getInstance(element);    },
                            "materialboxed"    : (element) => { return window.M.Materialbox.getInstance(element); },
                            "modal"            : (element) => { return window.M.Modal.getInstance(element);       },
                            "parallax"         : (element) => { return window.M.Parallax.getInstance(element);    },
                            "pushpin"          : (element) => { return window.M.Pushpin.getInstance(element);     },
                            "scrollspy"        : (element) => { return window.M.ScrollSpy.getInstance(element);   },
                            "sidenav"          : (element) => { return window.M.Sidenav.getInstance(element);     },
                            "slider"           : (element) => { return window.M.Slider.getInstance(element);      },
                            "tabs"             : (element) => { return window.M.Tabs.getInstance(element);        },
                            "tap-target"       : (element) => { return window.M.TapTarget.getInstance(element);   },
                            "tooltipped"       : (element) => { return window.M.Tooltip.getInstance(element);     },
                            "chips"            : (element) => { return window.M.Chips.getInstance(element);     },
                            "fixed-action-btn" : (element) => { return window.M.FloatingActionButton.getInstance(element);     }
                        };

/**
* @author Angel Solis <angesolis@palaceresorts.com>
* @var object. array de tipos de componentes para validacion y obtener la instancia de los componentes de Materialize 1.0.0
*/
const COMPONENTSTYPE = {
                            "select" : (element) => { return window.M.FormSelect.getInstance(element); }
                       };

/**
* Se obtienen los elementos DOM especificados en el query 'selector css'
* @param string
* @return object <element>
*/
MComponentes.getSelectElements = (query) => {
    return document.querySelectorAll(query);
};

/**
* Se inicializa y obtiene la instancias de los componentes Carousel
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.carousel = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Carousel.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Collapsible
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Collapsible = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Collapsible.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Dropdown
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Dropdown = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Dropdown.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes TapTarget
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.TapTarget = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.TapTarget.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Materialbox
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Materialbox = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Materialbox.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Slider
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Slider = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Slider.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Modal
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Modal = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Modal.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Parallax
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Parallax = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Parallax.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Pushpin
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Pushpin = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Pushpin.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes ScrollSpy
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.ScrollSpy = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.ScrollSpy.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Sidenav
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Sidenav = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Sidenav.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Tabs
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Tabs = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Tabs.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Tooltip
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Tooltip = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Tooltip.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes toast
* @param string
* @param object
* @return object <element>
*/
MComponentes.toast = (htmlMsn, options = {}) => {
    var opt = Object.assign({html : htmlMsn}, options);
    return window.M.toast(opt);
};

/**
* Se inicializa y obtiene la instancias de los componentes Select
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Select = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.FormSelect.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes DatePicker
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.DatePicker = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Datepicker.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes Chips
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.Chip = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.Chips.init(elements, options) : false;
};

/**
* Se inicializa y obtiene la instancias de los componentes FloatingActionButton
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.FloatingActionButton = (elems, options = {}) => {
    var elements = MComponentes.getSelectElements(elems);
    return elements ? window.M.FloatingActionButton.init(elements, options) : false;
};

/**
* Se obtiene la instancias de los componentes de acorde a la clase que tenga asignado
* @param string
* @return object <element> || boolean
*/
MComponentes.getInstance = (elem) => {
    let element = typeof elem == 'string' ? document.querySelector(elem) : elem;

    let foundInstance = undefined;

    if (element == null) { return false; }

    let listClass = element.className.split(" ");

    let foundClassName = listClass.find( val => COMPONENTSCLASS.hasOwnProperty(val) );

    if(foundClassName != undefined) { foundInstance = COMPONENTSCLASS[foundClassName](element); }

    if(foundInstance != undefined) { return foundInstance; }

    let foundTagName = COMPONENTSTYPE.hasOwnProperty(element.tagName.toLowerCase());

    if(foundTagName) { foundInstance = COMPONENTSTYPE[element.tagName.toLowerCase()](element); }

    if(foundInstance != undefined) { return foundInstance; }

    return false;
};

/**
* Funcion para re-inicializar los <label> de los <input> agregados dinamicamente.
* @return mixed
*/
MComponentes.updateTextFields = () => {
    return window.M.updateTextFields();
};


MComponentes.ValidateDataForm  = (form) => {
    let elements = form.elements;
    let errors   = [];
    let json     = {};
    let hasError = false;
    for (var i = 0; i < elements.length; i++) {
        let element=elements[i];
        if (element.name) {
            let elementValid =  M.validate_field(element);
            if (elementValid.error) {
                errors.push(elementValid);
                hasError = true;
            }

            json[elementValid.field] = elementValid.value;
        }
    }
    return { data: json, error: hasError, message: errors };
};