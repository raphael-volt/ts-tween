import { Observer, Observable, Subscription, Subject } from "rxjs";

export class Tween {

    events: Subject<any> = new Subject<any>()

    start() {
        let i: number = 0
        this.events.next("start")
        let t = setInterval(() => {
            this.events.next("change")
            i ++
            if(i == 10) {
                clearInterval(t)
                this.events.next("finish")
            }
        }, 100);
    }

}