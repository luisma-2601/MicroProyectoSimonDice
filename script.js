const ronda = document.getElementById('ronda');
const record = document.getElementById('record');
const botones = document.getElementsByClassName('cuadro');
const btnComenzar = document.getElementById('btnComenzar');

class Juego {
    constructor(botones, btnComenzar, ronda, record) {
        this.record = 0;
        this.ronda = 0;
        this.posicionJugador = 0;
        this.rondasTotales = 20;
        this.secuencia = [];
        this.velocidad = 1000;
        this.bloqueoBotones = true;
        this.listaBotones = Array.from(simonButtons);
        this.records = [];
        this.display = {
            btnComenzar,
            ronda
        }
    }

    //Inicio del juego
    inicio() {
        this.display.btnComenzar.onclick = () => this.comenzarJuego();
    }

    //Comenzar el juego
    comenzarJuego() {
        this.display.btnComenzar.disabled = true; 
        this.actualizarRonda(0);
        this.posicionJugador = 0;
        this.secuencia = this.crearSecuencia();
        this.listaBotones.forEach((btn, i) => {
            btn.classList.remove('ganador');
            btn.onclick = () => this.clickBoton(i);
        });
        this.mostrarSecuencia();
    }

    // Actualiza la ronda y el tablero
    actualizarRonda(valor) {
        this.ronda = valor;
        this.display.ronda.textContent = `Ronda ${this.ronda}`;
        
    }

    // Crea el array aleatorio de botones
    crearSecuencia() {
        return Array.from({length: this.rondasTotales}, () =>  this.getRandomColor());
    }

    // Devuelve un número al azar entre 0 y 3
    obtenerColorAzar() {
        return Math.floor(Math.random() * 4);
    }

    // Ejecuta una función cuando se hace click en un botón
    clickBoton(valor) {
        !this.bloqueoBotones && this.validarColorEscogido(valor);
        this.records.push({'jugador': 'J1', 'puntuacion': this.round});
        
    }



}

