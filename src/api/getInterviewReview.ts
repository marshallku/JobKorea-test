import { composeQuery } from "../utils/url";
import instance from "./instance";

export default function getInterviewReview({
    page = 1,
    jobType,
    passed,
    orderBy = "date",
}: InterviewReviewProps) {
    const [jobType1, jobType2] = jobType || [];
    const query = composeQuery({
        page,
        jobType1,
        jobType2,
        passed,
        orderBy,
    });

    return instance.get(`/interview-review${query}`);
}
