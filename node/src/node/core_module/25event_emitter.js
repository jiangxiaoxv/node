
const EventEmitter = require('events')

const ev = new EventEmitter()
let cb = () => {
    console.log('我彩票中奖了')
}
ev.on('wof', cb)

ev.on('wofs', function() {
    console.log('我彩票中奖了-第三次啦')
})

ev.on('wof', function() {
    console.log('我彩票中奖了-第二次啦')
    console.log(this)

})
ev.emit('wof', 1, 2, 3)
ev.emit('wofs', 1, 2, 3)

// ev.off('wof', cb)
// ev.emit('wof')





