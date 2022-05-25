import to from "./awaitTo";

export default function fetcher(
    { baseUrl = "", timeOut, commonHeader } = <InstanceProps>{}
): Instance {
    const dummyPromise: DummyPromise = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: false,
                    msg: "Took too long to fetch",
                });
            }, timeOut);
        });

    const errorBuilder: InstanceError = (
        msg = "데이터를 불러오는 데 실패했습니다"
    ) => ({
        success: false,
        msg,
    });

    const sendRequest: SendRequest = async (
        resource: string,
        init?: RequestInit
    ) => {
        const [responseError, response] = await to(
            timeOut
                ? Promise.race([
                      dummyPromise(),
                      fetch(`${baseUrl}${resource}`, init),
                  ])
                : fetch(`${baseUrl}${resource}`, init)
        );

        if (!response || responseError) {
            return errorBuilder(responseError?.message);
        }

        if (response instanceof Response) {
            if (response.status === 204) {
                return { isOk: true };
            }
            const [, json] = await to(response.json());

            if (!json) {
                return errorBuilder("JSON 파싱에 실패했습니다");
            }

            return json;
        }

        return response;
    };

    return {
        async get(resource: string, init: RequestInit = {}) {
            return sendRequest(resource, {
                ...init,
                headers: { ...init.headers, ...commonHeader },
                method: "GET",
            });
        },
        async post(resource: string, init: RequestInit = {}) {
            return sendRequest(resource, {
                ...init,
                headers: { ...init.headers, ...commonHeader },
                method: "POST",
            });
        },
        async delete(resource: string, init: RequestInit = {}) {
            return sendRequest(resource, {
                ...init,
                headers: { ...init.headers, ...commonHeader },
                method: "DELETE",
            });
        },
        async put(resource: string, init: RequestInit = {}) {
            return sendRequest(resource, {
                ...init,
                headers: { ...init.headers, ...commonHeader },
                method: "PUT",
            });
        },
        async patch(resource: string, init: RequestInit = {}) {
            return sendRequest(resource, {
                ...init,
                headers: { ...init.headers, ...commonHeader },
                method: "PATCH",
            });
        },
    };
}
