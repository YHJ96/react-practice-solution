import { render, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const getById = queryByAttribute.bind(null, "id");

describe("✅ input 테스트 케이스", () => {
    test("계산기의 초기상태는 0 입니다.", () => {
        const { container } = render(<App/>);
        const $total = getById(container, "total");
        expect($total).toHaveTextContent(0);
    });

    test("숫자가 4자리 이상일 경우 경고창을 나타내야 합니다.", () => {
        const alertSpy = jest.spyOn(window, "alert");
        render(<App/>);
        const $button = screen.getByRole("button", { name: 9 });
        userEvent.click($button);
        userEvent.click($button);
        userEvent.click($button);
        userEvent.click($button);
        expect(alertSpy).toBeCalledTimes(1);
    });

    test("잘못된 연산은 경고창을 나타내야 합니다.", () => {
        const alertSpy = jest.spyOn(window, "alert");
        render(<App/>);
        const $numberButton = screen.getByRole("button", { name: 9 });
        const $operationButton = screen.getByRole("button", { name: 'x' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        userEvent.click($numberButton);
        userEvent.click($operationButton);
        userEvent.click($resultButton);
        expect(alertSpy).toBeCalledTimes(1);
    });
});

describe("🧮 계산기 테스트 케이스", () => {
    test("(AC) 버튼을 누르면 연산 결과가 초기화 되어야 합니다.", () => {
        const { container } = render(<App/>);
        const $numberButton = screen.getByRole("button", { name: 9 });
        const $acButton = screen.getByRole("button", { name: 'AC' });
        const $total = getById(container, "total");
        userEvent.click($numberButton);
        userEvent.click($acButton);
        expect($total).toHaveTextContent(0);
    });

    test("2개의 숫자에 대해 덧셈이 가능해야 합니다.", () => {
        const { container } = render(<App/>);
        const $numberButton = screen.getByRole("button", { name: 9 });
        const $operationButton = screen.getByRole("button", { name: '+' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        const $total = getById(container, "total");
        userEvent.click($numberButton);
        userEvent.click($operationButton);
        userEvent.click($numberButton);
        userEvent.click($resultButton);
        expect($total).toHaveTextContent(18);
    });

    test("2개의 숫자에 대해 뺄셈이 가능해야 합니다.", () => {
        const { container } = render(<App/>);
        const $numberButton = screen.getByRole("button", { name: 9 });
        const $operationButton = screen.getByRole("button", { name: '-' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        const $total = getById(container, "total");
        userEvent.click($numberButton);
        userEvent.click($operationButton);
        userEvent.click($numberButton);
        userEvent.click($resultButton);
        expect($total).toHaveTextContent(0);
    });

    test("2개의 숫자에 대해 곱셈이 가능해야 합니다.", () => {
        const { container } = render(<App/>);
        const $numberButton = screen.getByRole("button", { name: 9 });
        const $operationButton = screen.getByRole("button", { name: 'x' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        const $total = getById(container, "total");
        userEvent.click($numberButton);
        userEvent.click($operationButton);
        userEvent.click($numberButton);
        userEvent.click($resultButton);
        expect($total).toHaveTextContent(81);
    });

    test("2개의 숫자에 대해 나눗셈이 가능해야 하며 소수점 이하는 생략합니다.", () => {
        const { container } = render(<App/>);
        const $nineButton = screen.getByRole("button", { name: 9 });
        const $twoButton = screen.getByRole("button", { name: 2 });
        const $operationButton = screen.getByRole("button", { name: '/' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        const $total = getById(container, "total");
        userEvent.click($nineButton);
        userEvent.click($operationButton);
        userEvent.click($twoButton);
        userEvent.click($resultButton);
        expect($total).toHaveTextContent(4);
    });

    test("연산을 지속할 수 있어야 합니다.", () => {
        const { container } = render(<App/>);
        const $nineButton = screen.getByRole("button", { name: 9 });
        const $twoButton = screen.getByRole("button", { name: 2 });
        const $addButton = screen.getByRole("button", { name: '+' });
        const $minusButton = screen.getByRole("button", { name: '-' });
        const $divideButton = screen.getByRole("button", { name: '/' });
        const $resultButton = screen.getByRole("button", { name: '=' });
        const $total = getById(container, "total");
        userEvent.click($nineButton);
        userEvent.click($addButton);
        userEvent.click($twoButton);
        userEvent.click($resultButton);
        userEvent.click($divideButton);
        userEvent.click($twoButton);
        userEvent.click($resultButton);
        userEvent.click($minusButton);
        userEvent.click($nineButton);
        userEvent.click($resultButton);
        expect($total).toHaveTextContent(-4);
    });
});