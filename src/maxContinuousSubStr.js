function maxSubStr(strs) {
    // 去除连续的字符串 abbc -> ac; bb -> ''
    let str = strs.replace(/(.)\1{1,}/g, '');
    // 空直接返回
    if (!str) return str;
    let maxLen = 1;
    let start = 0;
    for (let i = start; i < str.length; i ++) {
        let j = i;
        while(str.charCodeAt(j) + 1 === str.charCodeAt(j + 1)) {
            j ++;
        }
        if ((j - i + 1) > maxLen) {
            maxLen = j - i + 1;
            start = i;
        }
    }
    return str.substr(start, maxLen);
}