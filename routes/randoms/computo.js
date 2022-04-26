const calculo = (num) => {

    let array = []

    array[0] = 0
    array[1] = 0
    array[2] = 0
    array[3] = 0
    array[4] = 0
    array[5] = 0
    array[6] = 0
    array[7] = 0
    array[8] = 0
    array[9] = 0

    for (let i = 0; i < num; i++) {
        numero = Math.floor(Math.random() * 10)

        array[numero] += 1
    }

    return array
}

process.on('message', (data) => {

    const arrayNum = calculo(data)

    process.send(arrayNum)

})

