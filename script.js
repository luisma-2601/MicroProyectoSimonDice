const ronda = document.getElementById('ronda');
const record = document.getElementById('record');
const botones = document.getElementsByClassName('cuadro');
const btnComenzar = document.getElementById('btnComenzar');
const inicioDiv = document.getElementById('inicioDiv');
const btnContenedor = document.getElementById('contenedorBtn');
const btnReinicio = document.getElementById('btnReinicio');
const btnTop = document.getElementById('btnTop');
const tabla = document.getElementById('top');
const home = document.getElementById('home');
const game = document.getElementById('juegoDiv');
const usuario = document.getElementById('usuario');


class Juego {
    constructor(botones, btnComenzar, ronda, record) {
        this.record = 0;
        this.ronda = 0;
        this.posicionJugador = 0;
        this.rondasTotales = 10000;
        this.secuencia = [];
        this.velocidad = 1000;
        this.bloqueoBotones = true;
        this.listaBotones = Array.from(botones);
        this.records = [];
        this.display = {
            btnComenzar,
            ronda
        }
        this.errorSound = new Audio('./Sonidos/Derrota.mp3');
        this.victorySound = new Audio('./Sonidos/Victoria.mp3');
        this.listaSonidos = [
            new Audio('./Sonidos/1.mp3'),
            new Audio('./Sonidos/2.mp3'),
            new Audio('./Sonidos/3.mp3'),
            new Audio('./Sonidos/4.mp3'),
        ]
    }

    //Inicio del juego
    inicio() {
        console.log('Inicio');
        home.onclick = () => this.volver();
        console.log('Inicio2');
        usuario.value = "";
        btnReinicio.disabled = true;
        this.display.btnComenzar.onclick = () => this.comenzarJuego();
        btnTop.onclick = () => this.mostrarRecords();
    }

    volver() {
        inicioDiv.classList.remove('noVisible');
        inicioDiv.classList.add('inicio');
        tabla.classList.remove('top');
        tabla.classList.add('noVisible');
        home.classList.remove('home');
        home.classList.add('noVisible');
        btnContenedor.classList.remove('btnContenedor');
        btnContenedor.classList.add('noVisible');
        this.display.btnComenzar.disabled = false;
        game.classList.remove('juegoDiv');
        game.classList.add('noVisible');
        this.inicio();

    }

    mostrarRecords() {
        home.classList.remove('noVisible');
        home.classList.add('home');
        this.display.btnComenzar.disabled = true;
        inicioDiv.classList.remove('inicio');
        inicioDiv.classList.add('noVisible');
        tabla.classList.remove('noVisible');
        tabla.classList.add('top');
    }

    //Comenzar el juego
    comenzarJuego() {
        if(document.getElementById('usuario').value == ""){
            alert('Por favor ingrese un nombre de usuario');
            return;
        }
        this.display.btnComenzar.disabled = true;
        home.classList.remove('noVisible');
        home.classList.add('home');
        btnReinicio.disabled = false; 
        btnReinicio.onclick = () => this.reiniciarJuego();
        game.classList.remove('noVisible');
        game.classList.add('juego');
        inicioDiv.classList.remove('inicio');
        inicioDiv.classList.add('noVisible');
        btnContenedor.classList.remove('noVisible');
        btnContenedor.classList.add('btnContenedor');

        this.actualizarRonda(0);
        this.posicionJugador = 0;
        this.secuencia = this.crearSecuencia();
        this.listaBotones.forEach((btn, i) => {
            btn.classList.remove('ganador');
            btn.onclick = () => this.clickBoton(i);
        });
        this.mostrarSecuencia();
    }

    reiniciarJuego() {
        this.juegoReiniciado();
        setTimeout( () => this.comenzarJuego(), this.velocidad / 2)
    }

    // Actualiza la ronda y el tablero
    actualizarRonda(valor) {
        this.ronda = valor;
        this.display.ronda.textContent = 'Ronda ' + this.ronda;
        
    }

    // Crea el array aleatorio de botones
    crearSecuencia() {
        return Array.from({length: this.rondasTotales}, () =>  this.obtenerColorAzar());
    }

    // Devuelve un número al azar entre 0 y 3
    obtenerColorAzar() {
        return Math.floor(Math.random() * 4);
    }

    // Ejecuta una función cuando se hace click en un botón
    clickBoton(valor) {
        !this.bloqueoBotones && this.validarColorEscogido(valor);
        
        
    }

    // Valida si el boton que toca el usuario corresponde a al valor de la secuencia
    validarColorEscogido(valor) {
        if(this.secuencia[this.posicionJugador] === valor) {
            this.listaSonidos[valor].play();
            if(this.ronda === this.posicionJugador) {
                this.actualizarRonda(this.ronda + 1);
                this.velocidad /= 1.02;
                this.isJuegoTerminado()
            } else {
                this.posicionJugador++;
            }
        } else {
            this.juegoPerdido();
        }
    }

    // Verifica que no haya acabado el juego
    isJuegoTerminado() {
        if (this.ronda === this.rondasTotales) {
            this.juegoReiniciado();
        } else {
            this.posicionJugador = 0;
            this.mostrarSecuencia();
        };
    }

    // Muestra la secuencia de botones que va a tener que tocar el usuario
    mostrarSecuencia() {
        this.bloqueoBotones = true;
        let indiceSecuencia = 0;
        let timer = setInterval(() => {
            const boton = this.listaBotones[this.secuencia[indiceSecuencia]];
            console.log(boton);
            this.listaSonidos[this.secuencia[indiceSecuencia]].play();
            this.pintarBoton(boton)
            setTimeout( () => this.pintarBoton(boton), this.velocidad / 1.75)
            indiceSecuencia++;
            if (indiceSecuencia > this.ronda) {
                this.bloqueoBotones = false;
                clearInterval(timer);
            }
        }, this.velocidad);
    }

    // Pinta los botones para cuando se está mostrando la secuencia
    pintarBoton(boton) {
        boton.classList.toggle('active');
    }

    // Actualiza el simon cuando el jugador pierde
    juegoPerdido() {
        // if (this.ronda > this.record) {
        //     this.record = this.ronda;
        //     this.display.record.textContent = 'Record ' + this.record;
        // }
        console.log(this.ronda);
        console.log(this.record);
        this.errorSound.play();
        setTimeout( () => alert("Has Perdido!!, presiona Reiniciar para intentarlo nuevamente"), this.velocidad / 2)
        this.records.push({'jugador': usuario.value, 'puntuacion': this.ronda});
        console.log(this.records);
        this.display.btnComenzar.disabled = false; 
        
        this.bloqueoBotones = true;
    }

    // Muestra la animación de triunfo y actualiza el simon cuando el jugador gana
    juegoReiniciado() {
        this.display.btnComenzar.disabled = false; 
        this.bloqueoBotones = true;
        this.listaBotones.forEach(btn =>{
            btn.classList.toggle('ganador');
        });
        this.actualizarRonda('❌');
    }
}

const juego = new Juego(botones, btnComenzar, ronda, record);
juego.inicio();