const a = ['a','b'], b = ['A','B'], c = ['1','0'];


function hebingN(...args) {
    return args.reduce(hebing2);
};

function hebing2(arr1, arr2) {
    const tmp = [];
    if (arr1.length <= 0) return arr2;
    if (arr2.length <= 0) return arr1;
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            tmp.push(`${arr1[i]}${arr2[j]}`);
        }
    }
    return tmp;
}