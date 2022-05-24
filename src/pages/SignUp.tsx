import { useMemo, useState } from "react";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
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
            required: true,
            pattern: /^[0-9]{10,11}$/,
        },
        verify: {
            name: "인증번호",
            type: "number",
            value: "",
            required: true,
            pattern: /^[0-9]{6}$/,
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
    const submittable = useMemo(
        () =>
            validate() &&
            terms
                .filter(({ essential }) => essential)
                .every((x) => x.checked) &&
            expirationDate !== "",
        [data, terms, expirationDate]
    );

    return (
        <div className="sign-up">
            <form
                className="sign-form"
                onSubmit={(event) => {
                    event.preventDefault();

                    const { id, password, name, email, phone } = data;

                    console.log({
                        id: id.value,
                        password: password.value,
                        name: name.value,
                        email: email.value,
                        phone: phone.value,
                        terms,
                        expirationDate,
                    });
                }}
            >
                {/*
                 * Since only one input element overrides the value,
                 * and there's no default value,
                 * I didn't bind values to input elements.
                 */}
                <Input
                    {...getAttributes("id")}
                    onChange={({ target }) => {
                        setData("id", target.value);
                    }}
                    errorText="6~16자의 영소문자, 숫자만 사용 가능합니다."
                />
                <Input
                    {...getAttributes("password")}
                    onChange={({ target }) => {
                        setData("password", target.value);
                    }}
                    errorText="8~16자의 영문, 숫자, 특수문자만 사용 가능합니다."
                />
                <Input
                    {...getAttributes("name")}
                    onChange={({ target }) => {
                        setData("name", target.value);
                    }}
                    errorText="2~12자의 한글, 영문만 사용 가능합니다."
                />
                <Input
                    {...getAttributes("email")}
                    onChange={({ target }) => {
                        setData("email", target.value);
                    }}
                    errorText="이메일을 올바르게 입력해주세요."
                />
                <Input
                    {...getAttributes("phone")}
                    onChange={({ target }) => {
                        const sanitized = target.value.replace(/[^\d.]/g, "");

                        target.value = sanitized;
                        setData("phone", sanitized);
                    }}
                    errorText="휴대폰 번호를 올바르게 입력해주세요."
                    button={{
                        text: "인증 번호 받기",
                    }}
                />
                <Input
                    {...getAttributes("verify")}
                    onChange={({ target }) => {
                        const sanitized = target.value.replace(/[^\d.]/g, "");

                        target.value = sanitized;
                        setData("verify", sanitized);
                    }}
                    errorText="휴대폰 번호를 올바르게 입력해주세요."
                    button={{
                        text: "확인",
                        onClick: () => {
                            setData("verified", true);
                        },
                    }}
                />
                <section className="terms">
                    <h2>약관 동의</h2>
                    <CheckBox
                        className="terms-item"
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
                        label="필수동의 항목 및 개인정보수집 및 이용 동의(선택), 광고성 정보 수신 동의(선택)에 전체 동의합니다."
                    />
                    {terms.map(({ essential, title, checked }, index) => (
                        <CheckBox
                            key={`${title}-${index}`}
                            name={`agree-${index}`}
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
                        >
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
                        </CheckBox>
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
                <button disabled={!submittable} type="submit">
                    가입하기
                </button>
            </form>
        </div>
    );
}
