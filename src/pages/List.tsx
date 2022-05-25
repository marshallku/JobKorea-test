import { useCallback, useEffect, useState } from "react";
import { getInterviewReview } from "../api";
import InterviewReviewItem from "../components/InterviewReviewItem";
import Loader from "../components/Loader";
import fcls from "../utils/fcls";
import "./List.css";

export default function List() {
    const [data, setData] = useState<{
        count: number;
        items: InterviewReviewItem[];
    }>();
    const [drawerRevealed, setDrawerRevealed] = useState(false);
    const [tmpFilterOption, setTmpFilterOption] =
        useState<InterviewReviewProps>({});
    const [filterOption, setFilterOption] = useState<InterviewReviewProps>({});
    const fetchList = useCallback(async () => {
        const { data, success } = await getInterviewReview(filterOption);

        if (!success) {
            return;
        }

        setData(data);
    }, [filterOption]);
    const setPassed = useCallback(
        (passed?: 0 | 1) => {
            setTmpFilterOption((x) => ({ ...x, passed }));
        },
        [setTmpFilterOption]
    );

    useEffect(() => {
        fetchList();
    }, [filterOption]);

    if (!data) {
        return <Loader />;
    }

    return (
        <div className="list">
            <div className="list__options">
                <div>
                    총 <span className="highlight">{data.count}</span>건
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setDrawerRevealed((x) => !x);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="1rem"
                        style={{
                            fill:
                                typeof filterOption.passed === "number"
                                    ? "var(--main)"
                                    : "inherit",
                        }}
                    >
                        <path d="M28 26V38Q28 38.85 27.425 39.425Q26.85 40 26 40H22Q21.15 40 20.575 39.425Q20 38.85 20 38V26L8.4 11.2Q7.65 10.2 8.175 9.1Q8.7 8 10 8H38Q39.3 8 39.825 9.1Q40.35 10.2 39.6 11.2ZM24 26.2 36 11H12ZM24 26.2Z" />
                    </svg>
                    상세검색
                </button>
            </div>
            <div className="list__items">
                {data.items.map((x) => (
                    <InterviewReviewItem key={`${x.id}`} data={x} />
                ))}
            </div>
            <button
                type="button"
                className={fcls(
                    "list__drawer-closer",
                    drawerRevealed && "list__drawer-closer--revealed"
                )}
                onClick={() => {
                    setDrawerRevealed(false);
                }}
            />
            <div
                className={fcls(
                    "list__drawer",
                    "drawer",
                    drawerRevealed && "list__drawer--revealed"
                )}
            >
                <h2 className="drawer__title">합격 여부</h2>
                <div className="drawer__buttons">
                    {(
                        [
                            { name: "전체", value: undefined },
                            { name: "합격", value: 1 },
                            { name: "불합격", value: 0 },
                        ] as const
                    ).map(({ name, value }) => (
                        <button
                            key={name}
                            type="button"
                            className={fcls(
                                "drawer__button",
                                tmpFilterOption.passed === value &&
                                    "drawer__button--highlight"
                            )}
                            onClick={() => {
                                setPassed(value);
                            }}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <div className="drawer__center">
                    <button
                        type="button"
                        className="drawer__submit"
                        onClick={() => {
                            setFilterOption({ ...tmpFilterOption });
                            setDrawerRevealed(false);
                        }}
                    >
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
}
