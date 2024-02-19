import { Payload } from "./payload.interface";

export interface Decoded extends Payload {
    iat: number;
    exp: number;
}
