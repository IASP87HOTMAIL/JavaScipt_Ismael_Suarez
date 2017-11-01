var calculadora = {
    display: "0",
    operacion: "",
    numero1: 0.0,
    numero2: 0.0,
    resultado: 0.0,
    leerNumero: false,
    init: function () {
        var teclas = document.querySelectorAll(".tecla");

        for (var i = 0; i < teclas.length; i++) {
            var elementHtml = teclas[i];
            var id = elementHtml.getAttribute("id");
            var tecla = {
                tipo: !isNaN(id) ? "numeros" : id,
                elementHtml: elementHtml,
                val: id
            };
            this.teclaPressDown(tecla);
            this.teclaPressUp(tecla);
        }
    },
    mas: function () {
        this.resultado = this.numero1 + this.numero2;
    },
    menos: function () {
        this.resultado = this.numero1 - this.numero2;
    },
    por: function () {
        this.resultado = (this.numero1 !== 0) ? this.numero1 * this.numero2 : this.numero1;
    },
    dividido: function () {
        this.resultado = (this.numero1 !== 0) ? this.numero1 / this.numero2 : this.numero1;
    },
    actualizarDisplay: function () {
        this.display = (this.display.length > 8) ? this.display.substring(0, 8) : this.display;
        document.getElementById("display").innerHTML = this.display;
    },
    on: function () {
        this.numero1 = 0;
        this.numero2 = 0;
        this.resultado = 0;
        this.operacion = "";
        this.leerNumero = false;
        this.display = "0";
    },
    punto: function () {
        if (this.display.indexOf('.') < 0) {
            this.display += (this.display === "" ? "0" : "") + ".";
        }
    },
    sign: function () {
        if (this.display !== "0" && this.display !== "0.") {
            this.display = (this.display.indexOf('-') < 0) ? "-" + this.display : this.display.replace("-", "");
        }
    },
    numeros: function (tecla) {
        this.leerNumero = true;
        this.display = (this.display === "0") ? tecla.val : this.display + tecla.val;
    },
    igual: function () {
        if (this.leerNumero) {
            this.numero2 = Number.parseFloat(this.display);
        } else {
            this.numero1 = this.resultado;
        }
        if (this[this.operacion] !== "") {
            this[this.operacion]();
            this.display = this.resultado.toString();
            this.leerNumero = false;
        }
    },
    operar: function (tecla) {
        this.leerNumero = true;
        this.igual();
        this.operacion = tecla.tipo;
        this.numero1 = (this.resultado !== 0) ? this.resultado : this.numero2;
        this.display = "";
    },
    teclaPressDown: function (tecla) {
        tecla.elementHtml.addEventListener("mousedown", function () {
            this.style.padding = "1px";
        });
    },
    teclaPressUp: function (tecla) {
        var objC = this;
        tecla.elementHtml.addEventListener("mouseup", function () {
            this.style.padding = "0px";
            objC.teclaAction(tecla);
        });

    },
    teclaAction: function (tecla) {
        var metodo = (tecla.tipo === "mas" || tecla.tipo === "mas" || tecla.tipo === "mas" || tecla.tipo === "mas") ?
                "operar" : tecla.tipo;
        this[metodo](tecla);
        this.actualizarDisplay();

    }
};


calculadora.init();