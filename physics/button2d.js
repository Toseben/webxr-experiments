import {POINTER_CLICK, POINTER_ENTER, POINTER_EXIT, POINTER_PRESS, POINTER_MOVE, Pointer} from '../boilerplate/pointer.js'

export default class Button2D {
    constructor() {
        this.type = 'button'
        this.text = 'foo'
        this.x = 0
        this.y = 0
        this.fsize = 20
        this.w = this.text.length*this.fsize
        this.h = 20
        this.listeners = {}
        this.bg = 'white'

        this.on(POINTER_ENTER,()=>{
            this.bg = 'red'
            this.fire('changed',{type:'changed',target:this})
        })
        this.on(POINTER_EXIT,()=>{
            this.bg = 'white'
            this.fire('changed',{type:'changed',target:this})
        })
    }
    draw(ctx) {
        this.w = this.text.length * this.fsize
        this.h = 5 + this.fsize + 5
        ctx.font = `${this.fsize}px sans-serif`
        ctx.fillStyle = this.bg
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.fillStyle = 'black'
        ctx.fillText(this.text,this.x+3,this.y+this.fsize)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x,this.y,this.w,this.h)
    }
    addEventListener(type,cb) {
        if(!this.listeners[type]) this.listeners[type] = []
        this.listeners[type].push(cb)
    }
    contains(pt) {
        if(pt.x < this.x) return false
        if(pt.x > this.x + this.w) return false
        if(pt.y < this.y) return false
        if(pt.y > this.y + this.h) return false
        return true
    }
    findAt(pt) {
        if(pt.x < 0) return null
        if(pt.x > 0 + this.w) return null
        if(pt.y < 0) return null
        if(pt.y > 0 + this.h) return null
        return this
    }
    fire(type) {
        if(!this.listeners[type]) this.listeners[type] = []
        this.listeners[type].forEach(cb => cb())
    }
    set(key,value) {
        this[key] = value
        this.fire('changed',{type:'changed',target:this})
        return this
    }
    on(type,cb) {
        this.addEventListener(type,cb)
        return this
    }
}