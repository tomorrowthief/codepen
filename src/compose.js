module.exports.redux = (...arg) => {
    if (arg.length <= 0) return arg => arg
    if (arg.length <= 1) return arg[0]
    return arg.reduce((acc, cur) => (...arg) => acc(cur(...arg)))
}

module.exports.koa = (middlewares) => {
    if (Array.isArray(middlewares)) throw new Error('middlewares must be array');
    if (middlewares.some(fn => typeof fn !== 'function')) throw new Error('middlewares must be functions');
    return (context, next) => {
        let index = -1;
        const dispatch = (i) => {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i

            let fn = middleware[i]
 
            if (i === middleware.length) fn = next

            if (!fn) return Promise.resolve()

            try {
                return Promise.resolve(fn(context, function next(){
                    return dispatch(i + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}
