export class Schedule {

    constructor(dayname:string[], open:string, closed:string) {
        this.dayname = dayname;
        this.open = open;
        this.closed = closed;
    }

    id: number;
    dayname: string[];
    open: string;
    closed: string;
    restaurantId?: number;
}