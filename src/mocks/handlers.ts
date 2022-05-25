import { rest } from "msw";

const BASE_URL = `${import.meta.env.BASE_URL}api/`;

const handlers = [
    rest.get(`${BASE_URL}user`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                username: "admin",
            })
        );
    }),
];

export default handlers;
