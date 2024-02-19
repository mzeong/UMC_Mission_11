import { Decoded } from "./decoded.interface";

export interface Verified {
    isExpired: boolean;
    decoded: Decoded;
}
