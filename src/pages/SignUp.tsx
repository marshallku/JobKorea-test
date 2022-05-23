import { useMemo, useState } from "react";
import useForm from "../hooks/useForm";
import fcls from "../utils/fcls";
import "./SignUp.css";

export default function SignUp() {
    const { data, setData, validate, getAttributes } = useForm({
        id: {
            name: "아이디",
            type: "text",
            value: "",
            required: true,
            minLength: 6,
            maxLength: 16,
            pattern: /^[a-z0-9]+$/,
        },
        password: {
            name: "비밀번호",
            type: "password",
            value: "",
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern: /^[a-zA-Z0-9`~!@#$%^&*()-_+=\\|}{\]\["';:\/?.,>]+$/,
        },
        name: {
            name: "이름",
            type: "text",
            value: "",
            required: true,
            minLength: 2,
            maxLength: 12,
            pattern: /^[가-힣a-zA-Z ]+$/,
        },
        email: {
            name: "이메일",
            type: "email",
            value: "",
            required: true,
            pattern: /^\S+@\S+\.+\S{2,4}$/,
        },
        phone: {
            name: "휴대폰 번호('-' 없이 숫자만)",
            type: "tel",
            value: "",
            minLength: 10,
            maxLength: 11,
            pattern: /^[0-9]{10,11}$/,
        },
        verify: {
            name: "인증번호",
            type: "number",
            value: "",
            required: true,
            minLength: 6,
            maxLength: 6,
        },
        verified: {
            name: "인증됨",
            type: "hidden",
            value: false,
            expected: true,
        },
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
    const [expirationDate, setExpirationDate] = useState("");
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

                    // FIXME: Should validate on input to set disabled attribute at submit button
                    if (!validate()) {
                        return;
                    }

                    console.log(data, terms, expirationDate);
                }}
            >
                {/*
                 * Since only one input element overrides the value,
                 * and there's no default value,
                 * I didn't bind values to input elements.
                 */}
                <input
                    {...getAttributes("id")}
                    onChange={({ target }) => {
                        setData("id", target.value);
                    }}
                />
                <input
                    {...getAttributes("password")}
                    onChange={({ target }) => {
                        setData("password", target.value);
                    }}
                />
                <input
                    {...getAttributes("name")}
                    onChange={({ target }) => {
                        setData("name", target.value);
                    }}
                />
                <input
                    {...getAttributes("email")}
                    onChange={({ target }) => {
                        setData("email", target.value);
                    }}
                />
                <div>
                    <input
                        {...getAttributes("phone")}
                        onChange={({ target }) => {
                            const sanitized = target.value.replace(
                                /[^\d.]/g,
                                ""
                            );

                            target.value = sanitized;
                            setData("phone", sanitized);
                        }}
                    />
                    <button>인증 번호 받기</button>
                </div>
                <div>
                    <input
                        {...getAttributes("verify")}
                        onChange={({ target }) => {
                            setData("verify", target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            setData("verified", true);
                        }}
                    >
                        확인
                    </button>
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
                                        setExpirationDate(name);
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
