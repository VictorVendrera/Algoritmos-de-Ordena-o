//Importando a const que será usado como objeto de análise
import { gastos }  from './cota-parlamentar-282-mil.mjs'

// Declaração de variáveis auxiliares
let totTrocas, pass, comps

// Início da Função de Ordenação do vetor
function bubbleSort(vetor, fnComp){
    //Atribuindo valor p/ variáveis
    totTrocas = 0, pass = 0, comps = 0
    let trocas    
    do{
        trocas = 0
        //Soma uma passada toda vez que executa o cód aqui        
        pass++
        // Percurso do vetor, da primeira até a PENÚLTIMA posição
        for (let i = 0; i <= vetor.length - 2; i++) {
                if (fnComp(vetor[i], vetor[i + 1])) {
                    // Troca direta em JS via desestruturação de vetor
                    [ vetor[i], vetor[i + 1] ] = [ vetor[i + 1], vetor[i] ]
                    trocas++
            }
            comps++
        }
        
        totTrocas += trocas
    } while (trocas > 0) //Utilizado para ter uma saída do loop
}

let memoria = process.memoryUsage().heapUsed / 1024 / 1024
console.time('Ordenando gastos...');

bubbleSort(gastos, (a, b) => {
    if(a.partido === b.partido) { //O primeiro critério é o partido caso igual
        if(a.nome_parlamentar === b.nome_parlamentar)  // Segundo critério é o nome
            return a.id_documento > b.id_documento  // Se não o id documento
        else 
            return a.nome_parlamentar > b.nome_parlamentar // Caso atendido se só o partido foi igual
    }
    else 
        return a.partido > b.partido // Caso não exista nenhuma semelhanaça
})
console.timeEnd('Ordenando gastos...')
console.log('Depois:', gastos)
console.log({totTrocas, pass, comps, memoria})