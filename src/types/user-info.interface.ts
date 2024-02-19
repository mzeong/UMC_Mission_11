import { Provider } from "./provider.enum";

export interface UserInfo {
    provider: Provider;
    providerId: string;
    nickname: string;
}
