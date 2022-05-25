import fetcher from "../utils/fetcher";

const instance = fetcher({ baseUrl: `${import.meta.env.BASE_URL}api/` });

export default instance;
