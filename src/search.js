module.exports.binarySearch = binarySearch

function binarySearch(target, arr = []){
    if (arr.length <= 0) return -1;
    if (arr.length <= 1) return arr[0] === target ? 0 : -1;

    const middle = getMiddle(arr);
    if (arr[middle] === target) return middle;
    if (arr[middle] > target) return binarySearch(target, arr.slice(0, middle));

    return binarySearch(target, arr.slice(middle));
}

function getMiddle(arr = []) {
    return Math.floor((arr.length - 1)/2)
}