import { gastos } from './cota-parlamentar-8.5-mil.mjs'

let trocas, comps, pass

function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1) {
    if(fim > ini) {     // Condição de saída das chamadas recursivas
        pass++
        const pivot = fim
        let div = ini - 1
        // Loop for vai até a PENÚLTIMA posição
        for(let i = ini; i < fim; i++) {
            //if(vetor[i] < vetor[pivot]) {
            if(fnComp(vetor[pivot], vetor[i])) {    // Parâmetros invertidos
                comps++
                div++
                if(i !== div) {
                    [ vetor[i], vetor[div] ] = [ vetor[div], vetor[i] ]
                    trocas++
                }
            }
        }
        div++
        // Colocamos o pivô no seu lugar definitivo
        //if(vetor[pivot] < vetor[div]) {
        if(fnComp(vetor[div], vetor[pivot])) {      // Parâmetros invertidos
            [ vetor[pivot], vetor[div] ] = [ vetor[div], vetor[pivot] ]
            trocas++
        }
        comps++

        // Ordena o subvetor à esquerda do pivô
        quickSort(vetor, fnComp, ini, div - 1)

        // Ordena o subvetor à direita do pivô
        quickSort(vetor, fnComp, div + 1, fim)
    }
}

trocas = 0, pass = 0, comps = 0

console.time('Ordenando gastos...')

quickSort(gastos, (a, b) => {
    if(a.partido === b.partido) { //O primeiro critério é o partido caso igual
        if(a.nome_parlamentar === b.nome_parlamentar)  // Segundo critério é o nome
            return a.id_documento > b.id_documento  // Se não o id documento
        else 
            return a.nome_parlamentar > b.nome_parlamentar // Caso atendido se só o partido foi igual
    }
    else 
        return a.partido > b.partido // Caso não exista nenhuma semelhanaça
})

let memoria = process.memoryUsage().heapUsed / 1024 / 1024
console.timeEnd('Ordenando gastos...')
console.log('DEPOIS:', gastos)
console.log({trocas, pass, comps, memoria})