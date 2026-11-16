const limiteEco = 60000;

class LoteTela {
    constructor(id, tipoFibra, kilogramos) {
        this.id = id;
        this.tipoFibra = tipoFibra;
        this.kilogramos = kilogramos;
        this.agua = this.calcularAgua();
    }
    calcularAgua() {
        const litrosPorKg = this.tipoFibra === 'algodon' ? 10000 : 300;
        return this.kilogramos * litrosPorKg;
    }
}
let lotes = JSON.parse(localStorage.getItem('lotes')) || [];
const btnCalcular = document.getElementById('btnCalcular');
const btnLimpiar = document.getElementById('btnLimpiar');
const aguaTotalEl = document.getElementById('aguaTotal');
const historialEl = document.getElementById('historialLotes');

function mostrarLotes() {
    historialEl.innerHTML = '';
    let total = 0;

    lotes.forEach(lote => {
        total += lote.agua;
        const colorAlerta = lote.agua > limiteEco ? 'list-group-item-danger' : 'list-group-item-light';

        historialEl.innerHTML += `
            <li class="list-group-item ${colorAlerta}">
                <strong>Lote #${lote.id}</strong> (${lote.tipoFibra} - ${lote.kilogramos} kg): ${lote.agua} L
            </li>
        `;
    });

    aguaTotalEl.textContent = total;
}
btnCalcular.addEventListener('click', () => {
    const fibra = document.getElementById('tipoFibra').value;
    const kilos = Number(document.getElementById('kilosTela').value);

    if (kilos <= 0) return;

    const nuevoLote = new LoteTela(lotes.length + 1, fibra, kilos);
    lotes.push(nuevoLote);
    localStorage.setItem('lotes', JSON.stringify(lotes));

    mostrarLotes();
});

btnLimpiar.addEventListener('click', () => {
    lotes = [];
    localStorage.removeItem('lotes');
    mostrarLotes();
});

mostrarLotes();