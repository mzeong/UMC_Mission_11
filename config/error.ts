import { Status } from "./response.status";

export class BaseError extends Error {
    public data: Status;

    constructor(data: Status, detail?: any) {
        super(data.message);
        this.data = detail ? { ...data, detail } : data;
    }
}
