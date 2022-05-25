import { rest } from "msw";

const BASE_URL = `${import.meta.env.BASE_URL}api/`;

const handlers = [
    rest.get(`${BASE_URL}interview-review`, (req, res, ctx) => {
        const getPassed = () => {
            const passed = req.url.searchParams.get("passed");

            if (typeof passed === "string") {
                return +passed === 1;
            }

            return Math.random() < 0.5;
        };

        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                data: {
                    count: 3512,
                    items: [...Array(20)].map(() => ({
                        company: "Company Name",
                        userName: "John Doe",
                        date: new Date(
                            2022,
                            Math.floor(Math.random() * 12),
                            Math.floor(Math.random() * 31)
                        ),
                        view: Math.floor(Math.random() * 300),
                        comments: Math.floor(Math.random() * 10),
                        passed: getPassed(),
                        responsible: "Developer",
                        interviewedAt: new Date(),
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis elementum nunc nec pretium. Maecenas quam purus, venenatis non mi vitae, euismod ultrices tellus. Morbi nec est eget turpis gravida rhoncus. Etiam vitae facilisis nisi, eget bibendum ipsum. Donec rutrum rhoncus nunc ac lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus risus lacus, posuere et aliquam in, vulputate tincidunt elit. Morbi eu dignissim quam, maximus eleifend erat.",
                    })),
                },
            })
        );
    }),
];

export default handlers;
