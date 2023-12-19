function calculateFitness(){
    let currentRecord = Infinity; 
    for (let i = 0; i < popSize; i++) {
        let d = calcDistance(cities, population[i])
        if(d<recordDistance){
          recordDistance = d;
          bestEver = population[i]
          bestFoundGeneration=generation;
        }
        if(d<currentRecord){
            currentRecord = d;
            currentBest = population[i]
          }
        fitness[i] = 1 / (d+1)
    }
}

function normalizeFitness(){
    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum+= fitness[i]
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum
    }
}

function nextGeneration(){
    let newPopulation = []
    for (let i = 0; i < population.length; i++) {
        let orderA = pickOne(population, fitness)
        let orderB = pickOne(population, fitness)
        let order = crossOver(orderA,orderB)
        mutate(order, .01)
        newPopulation[i] = order
    }
    population = newPopulation
    generation++;
}

function crossOver(orderA,orderB){
    let start = floor(random(orderA.length))
    let end = floor(random(start+1, orderA.length))
    let newOrder = orderA.slice(start,end)

    // let left = totalCities - newOrder.length;
    for (let i = 0; i < orderB.length; i++) {
        let city = orderB[i];
        if(!newOrder.includes(city)){
            newOrder.push(city)
        }
    }
    return newOrder;
}

function mutate(order, mutationRate){
    for (let i = 0; i < totalCities; i++) {
        if(random(1) < mutationRate){
            let indexA = floor(random(order.length))
            let indexB = floor(random(order.length))
            swap(order,indexA, indexB)
        }
    }
}

function evaluate() {
    if(bestFoundGeneration){
        if(generation > bestFoundGeneration+endAfterNoBest){
            finished = true;
        }  
    }
  }

function pickOne(list, probs){
    let index = 0;
    let r = random(1)
  
    while (r>0){
      r = r - probs[index];
      index++
    }
    index--
  
    return list[index].slice()
  }