import { Schedule } from "./schedule.model";

export class Restaurant {
    constructor(name?: string, schedules?: Schedule[]) {
        if(name) this.name = name;
        if(schedules) this.schedules = schedules;
    }

    id: number;
    name: string;
    schedules: Schedule[];
}