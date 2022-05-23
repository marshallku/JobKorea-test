import { useMemo, useState } from "react";
import fcls from "../utils/fcls";
import "./SignUp.css";

export default function SignUp() {
    const [userData, setUserData] = useState({
        id: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        verify: "",
        verified: false,
        expirationDate: "",
    });
    const [terms, setTerms] = useState([
        {
            essential: true,
            title: "만 15세 이상입니다",
            checked: false,
        },
        {
            essential: true,
            title: "서비스 이용약관 동의",
            checked: false,
        },
        {
            essential: true,
            title: "개인정보수집 및 이용 동의",
            checked: false,
        },
        {
            essential: false,
            title: "개인정보수집 및 이용 동의",
            checked: false,
        },
        {
            essential: false,
            title: "광고성 정보 이메일/SMS 수신 동의",
            checked: false,
        },
    ]);
    const expirationDates = useMemo(
        () => [
            { id: "1y", name: "1년" },
            { id: "3y", name: "3년" },
            { id: "withdraw", name: "회원탈퇴시" },
        ],
        []
    );

    return (
        <div className="sign-up">
            <form
                className="sign-form"
                onSubmit={(event) => {
                    event.preventDefault();

                    console.log(userData, terms);
                }}
            >
                {/*
                 * Since only one input element overrides the value,
                 * and there's no default value,
                 * I didn't bind values to input elements.
                 */}
                <input
                    type="text"
                    name="id"
                    placeholder="아이디"
                    onChange={({ target }) => {
                        setUserData((x) => ({ ...x, id: target.value }));
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    onChange={({ target }) => {
                        setUserData((x) => ({ ...x, password: target.value }));
                    }}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    onChange={({ target }) => {
                        setUserData((x) => ({ ...x, name: target.value }));
                    }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    onChange={({ target }) => {
                        setUserData((x) => ({ ...x, email: target.value }));
                    }}
                />
                <div>
                    <input
                        type="tel"
                        name="phone"
                        maxLength={11}
                        placeholder="휴대폰 번호('-' 없이 숫자만)"
                        onChange={({ target }) => {
                            const sanitized = target.value.replace(
                                /[^\d.]/g,
                                ""
                            );

                            target.value = sanitized;
                            setUserData((x) => ({ ...x, phone: sanitized }));
                        }}
                    />
                    <button>인증 번호 받기</button>
                </div>
                <div>
                    <input
                        type="text"
                        name="verify"
                        maxLength={6}
                        placeholder="인증번호"
                        onChange={({ target }) => {
                            setUserData((x) => ({
                                ...x,
                                verify: target.value,
                            }));
                        }}
                    />
                    <button>확인</button>
                </div>
                <section className="terms">
                    <h2>약관 동의</h2>
                    <label className="terms-item">
                        <input
                            type="checkbox"
                            name="agree-all"
                            checked={terms.every((x) => x.checked)}
                            onChange={({ target }) => {
                                setTerms((x) =>
                                    x.map((item) => ({
                                        ...item,
                                        checked: target.checked,
                                    }))
                                );
                            }}
                        />
                        <span>
                            필수동의 항목 및 개인정보수집 및 이용 동의(선택),
                            광고성 정보 수신 동의(선택)에 전체 동의합니다.
                        </span>
                    </label>
                    {terms.map(({ essential, title, checked }, index) => (
                        <label key={`${title}-${index}`}>
                            <input
                                type="checkbox"
                                name="agree-all"
                                checked={checked}
                                onChange={({ target }) => {
                                    setTerms((x) =>
                                        x.map((item, i) => {
                                            if (i !== index) {
                                                return item;
                                            }

                                            return {
                                                ...item,
                                                checked: target.checked,
                                            };
                                        })
                                    );
                                }}
                            />
                            <span>
                                <span
                                    className={fcls(
                                        "terms-item__type",
                                        essential &&
                                            "terms-item__type--essential"
                                    )}
                                >
                                    [{essential ? "필수" : "선택"}]
                                </span>
                                <span>{title}</span>
                            </span>
                        </label>
                    ))}
                </section>
                <section>
                    <h2>개인정보 유효기간</h2>
                    <div>
                        {expirationDates.map(({ id, name }) => (
                            <span key={id}>
                                <input
                                    type="radio"
                                    name="expire"
                                    id={`expire-${id}`}
                                    onChange={() => {
                                        setUserData((x) => ({
                                            ...x,
                                            expirationDate: name,
                                        }));
                                    }}
                                />
                                <label htmlFor={`expire-${id}`}>{name}</label>
                            </span>
                        ))}
                    </div>
                </section>
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
}
