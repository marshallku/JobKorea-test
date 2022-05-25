import { useCallback, useEffect, useState } from "react";
import { getInterviewReview } from "../api";
import InterviewReviewItem from "../components/InterviewReviewItem";
import Loader from "../components/Loader";

export default function List() {
    const [data, setData] = useState<{
        count: number;
        items: InterviewReviewItem[];
    }>();
    const [filterOption, setFilterOption] = useState<InterviewReviewProps>({});
    const fetchList = useCallback(async () => {
        const { data, success } = await getInterviewReview(filterOption);

        if (!success) {
            return;
        }

        setData(data);
    }, [filterOption]);

    useEffect(() => {
        fetchList();
    }, [filterOption]);

    if (!data) {
        return <Loader />;
    }

    return (
        <div className="list">
            {data.items.map((x) => (
                <InterviewReviewItem key={`${x.id}`} data={x} />
            ))}
        </div>
    );
}
