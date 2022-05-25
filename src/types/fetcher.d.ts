interface InstanceProps {
    baseUrl?: string;
    timeOut?: number;
    commonHeader?: {
        [key: string]: string;
    };
}

interface FailResponse {
    success: false;
    msg: string;
}

declare type InstanceError = (msg?: string) => FailResponse;

declare type DummyPromise = () => Promise<FailResponse>;

declare type SendRequest = (
    resource: string,
    init?: RequestInit
) => Promise<any | FailResponse>;

interface Instance {
    get(resource: string, init?: RequestInit): Promise<any | FailResponse>;
    post(resource: string, init?: RequestInit): Promise<any | FailResponse>;
    delete(resource: string, init?: RequestInit): Promise<any | FailResponse>;
    put(resource: string, init?: RequestInit): Promise<any | FailResponse>;
    patch(resource: string, init?: RequestInit): Promise<any | FailResponse>;
}
