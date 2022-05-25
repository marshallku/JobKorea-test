import "./InterviewReviewItem.css";

export default function InterviewReviewItem({
    data,
}: InterviewReviewItemProps) {
    const {
        company,
        userName,
        date,
        view,
        comments,
        passed,
        responsible,
        interviewedAt,
        description,
    } = data;

    return (
        <article className="interview-review">
            <header className="interview-review__header">
                <div>
                    <h2 className="interview-review__title">{company}</h2>
                    <div>
                        {userName}
                        <span className="interview-review__line" />
                        {new Date(date).toLocaleDateString()}
                        <span className="interview-review__line" />
                        조회 {view}
                    </div>
                </div>
                <div className="interview-review__comments">{comments}</div>
            </header>
            <div className="interview-review__infos">
                <div className="interview-review__info">
                    <div className="interview-review__box">합격여부</div>
                    <div className="highlight">
                        {passed === 1 ? "합격" : "불합격"}
                    </div>
                </div>
                <div className="interview-review__info">
                    <div className="interview-review__box">담당업무</div>
                    <div>{responsible}</div>
                </div>
                <div className="interview-review__info">
                    <div className="interview-review__box">면접연도</div>
                    <div>{new Date(interviewedAt).getFullYear()}</div>
                </div>
            </div>
            <div className="interview-review__description">
                <h3>면접질문&답변</h3>
                <div>{description}</div>
            </div>
        </article>
    );
}
