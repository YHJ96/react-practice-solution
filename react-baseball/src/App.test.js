import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';


describe("✅ input 테스트 케이스", () => {
    test("input의 입력값에 맞게 입력값이 변해야합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        fireEvent.change($input, { target: { value: "193" } });
        const inputValue = screen.getByDisplayValue("193");
        expect(inputValue.value).toEqual("193");
    });
    // test("잘못된 값을 입력하는 경우 alert 경고창으로 나타내야합니다.", () => {});
});

describe("⚾️ 아구 게임 테스트 케이스", () => {
    test("볼이 0이고 스트라이크가 0이면 화면에 낫싱이 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "456" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("낫싱");
    });

    test("볼이 0이고 스트라이크가 1이면 화면에 1스트라이크가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "429" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("1스트라이크");
    });

    test("볼이 1이고 스트라이크가 0이면 화면에 1볼이 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "981" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("1볼");
    });

    test("볼이 0이고 스트라이크가 3이면 화면에 승리가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
    });

    test("볼이 2이고 스트라이크가 1이면 화면에 2볼 1스트라이크가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "321" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("2볼 1스트라이크");
    });
});

describe("🎊 승리 테스트 케이스", () => {
    test("승리시 재시작 버튼이 나타나야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
        const $resetbutton = screen.getByText("재시작");
        expect($resetbutton).toBeInTheDocument();
    });
    // test("재시작 버튼을 눌렀을 경우 새로고침이 되어야 합니다.", () => {});
});