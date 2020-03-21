module.exports = function() {
    this.list = [];
    this.task = (wait, handle) => {
        this.list.push({
            wait,
            handle
        })
        return this;
    }
    this.start = () => {
        // example1
        // for (let i = 0; i < this.list.length; i++) {
        //     await new Promise((reslove) => {
        //         setTimeout(() => { this.list[i].handle(); reslove()}, this.list[i].wait)
        //     })
        // }
        // example2
        this.list.reduce((promise, next) => promise.then(() => (
            new Promise((reslove) => {
                setTimeout(() => {
                    next.handle();
                    reslove()
                }, next.wait)
            })
        )), Promise.resolve())
    }
}