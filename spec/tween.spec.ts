import { Tween } from '../index'

let tween: Tween
describe('Tween', () => {

    it('should create instance', () => {
        tween = new Tween()
        expect(tween).toBeTruthy()
    })
    
    it('should handle tween', done => {
        let start = false
        let numChanges: number = 0
        tween.events.subscribe(
            e => {
                console.log("tween event", e)
                if(e == "start") {
                    expect(start).toBeFalsy()
                    start = true
                }
                if(e == "change") {
                    numChanges++
                }

                if(e == "finish") {
                    expect(start).toBeTruthy()
                    expect(numChanges).toBeGreaterThan(0)
                    done()
                }
            },
            done
        )
        tween.start()
    })

})