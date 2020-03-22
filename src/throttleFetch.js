/**
 * 限流请求，接收一组请求地址，根据限制个数分片，所有分片结束后返回所有请求结果
 * github上有很多类似解决方案：p-limit， async-pool， es6-promise-pool； 本函数参考async-pool的源码
 * @param urls {Array} 
 * @param limit {Number}
 * @returns {Promise}
 */


const log = console.log;

function throttleFetch (urls, limit) {
    if (!Array.isArray(urls)) throw 'input mast array';
    const urlsTmp = [].concat(urls);
    const ret = []; // 所有的 promise列表
    const enqueueList = []; // limit 队列
    
    function toEnquene() {
        if (urlsTmp.length <= 0) return Promise.resolve();

        const url = urlsTmp.shift();
        const p = Promise.resolve().then(() => fetchUrl(url));
        ret.push(p); // 推入 ret
        
        // 关键：推入limit队列，当某个promise完成则移出队列，为下一个请求提供空间
        const e = p.then(() => enqueueList.splice(enqueueList.indexOf(e), 1));
        enqueueList.push(e);

        // 关键：判断队列是否有空间，没有则等待某个promise结束
        let r = Promise.resolve();
        if (enqueueList.length >= limit) {
            r = Promise.race(enqueueList);
        }

        // 返回promise
        return r.then(() => toEnquene());
    }

    return toEnquene().then(() => Promise.all(ret));
}

// use await
async function throttleFetch1 (urls, limit) {
    if (!Array.isArray(urls)) throw 'input mast array';
    const urlsTmp = [].concat(urls);
    const ret = []; // 所有的 promise列表
    const enqueueList = []; // limit 队列

    while(urlsTmp.length) {
        const url = urlsTmp.shift();
        const p = Promise.resolve().then(() => fetchUrl(url).catch(e => Promise.resolve(e)));
        ret.push(p); // 推入 ret
        
        // 关键：推入limit队列，当某个promise完成则移出队列，为下一个请求提供空间
        const e = p.then(() => enqueueList.splice(enqueueList.indexOf(e), 1));
        enqueueList.push(e);

        // 关键：判断队列是否有空间，没有则等待某个promise结束
        if (enqueueList.length >= limit) {
            await Promise.race(enqueueList);
        }
    }

    return Promise.all(ret);
}

function fetchUrl(url) {
    return new Promise((
        reslove, reject
    ) => {
        try {
            if (Math.random() > 0.5)  throw 'err' + url
            setTimeout(() => {
                reslove(url);
            }, url * 200);
        } catch (err) {
            reject(err)
        }
    });
}


throttleFetch1([1, 3, 5, 8, 6, 4, 2, 7]).then(log).catch(log);