type jobType = number | undefined;

interface InterviewReviewProps {
    page?: number;
    jobType?: [jobType, jobType];
    passed?: 0 | 1;
    orderBy?: "date" | "view";
}

interface ApiSuccessResponse {
    success: true;
}

interface InterviewReviewItem {
    id: number;
    company: string;
    userName: string;
    date: `${Date}`;
    view: number;
    comments: number;
    passed: 0 | 1;
    responsible: string;
    interviewedAt: `${Date}`;
    description: string;
}

interface InterviewReviewResponse extends ApiSuccessResponse {
    data: {
        count: number;
        items: InterviewReviewItem[];
    };
}
