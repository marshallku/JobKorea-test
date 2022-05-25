import { useCallback, useEffect, useState } from "react";
import { getInterviewReview } from "../api";
import InterviewReviewItem from "../components/InterviewReviewItem";
import Loader from "../components/Loader";

export default function List() {
    const [data, setData] = useState<{
        count: number;
        items: InterviewReviewItem[];
    }>();
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
            <div className="list__option">
                <div>
                    총 <span className="highlight">{data.count}</span>건
                </div>
            </div>
            <div className="list__items">
                {data.items.map((x) => (
                    <InterviewReviewItem key={`${x.id}`} data={x} />
                ))}
            </div>
            <div className="list__drawer drawer">
                <h2>합격 여부</h2>
                <div className="drawer__buttons">
                    <button
                        type="button"
                        onClick={() => {
                            setPassed(undefined);
                        }}
                    >
                        전체
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setPassed(1);
                        }}
                    >
                        합격
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setPassed(0);
                        }}
                    >
                        불합격
                    </button>
                </div>
                <div className="drawer__center">
                    <button
                        type="button"
                        className="drawer__submit"
                        onClick={() => {
                            setFilterOption({ ...tmpFilterOption });
                        }}
                    >
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
}
