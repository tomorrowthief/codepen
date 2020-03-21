
const a = [1, 3, 6, 9, 14];
const b = [2, 5, 7, 11, 20];
const c = [3, 1, 9, 5, 7];

const merge = (arr1, arr2) => {
    const tmp = [];
    while (arr1.length && arr2.length ) {
        if (arr1[0] < arr2[0]) {
            tmp.push(arr1.shift());
        } else {
            tmp.push(arr2.shift());
        }
    }
    return tmp.concat(arr1, arr2);
}

// 归并排序
const sort_merge = (arr) => {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(
        sort_merge(left), sort_merge(right)
    );
}

module.exports.sort_merge = sort_merge


function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
    return arr;
  }


  function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        swap(items, i, j); //swap two elements
        i++;
        j--;
    }
    return i;
} 

// 快速排序
const sort_quick = (items, left=0, right) => {
    if (!Array.isArray(items)) throw 'input must be an arrray'
    
    var index;
    if (items.length > 1) {
        index = partition(items, left, right || items.length - 1); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            sort_quick(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            sort_quick(items, index, items.length - 1);
        }
    }
    return items;
}

module.exports.sort_quick = sort_quick

// 插入排序
module.exports.sort_insert =  function insertSort (arr) {
    if (!Array.isArray(arr)) throw 'input must be an arrray'
    if (arr.length <= 1) return arr
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        const tmp = arr[i];
        for (; j >= 0; j--) {
            if (arr[j] > tmp) {
                arr[j + 1] = arr[j];
            } else {
                break
            }
        }
        arr[j + 1] = tmp;
    }
    return arr;
}

// 插入排序
module.exports.quick_ryf_sort =  function quick_ryf_sort (arr) {
    if (!Array.isArray(arr)) throw 'input must be an arrray'
    if (arr.length <= 1) return arr
    const s = Math.floor(arr.length/2);
 
    const temp = arr.splice(s,1);
    
    let left=[];
    let right=[];

    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] > temp) right.push(arr[i]);
        else left.push(arr[i]);
    }

    return [].concat(quick_ryf_sort(left), temp, quick_ryf_sort(right))
}