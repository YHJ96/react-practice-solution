import "@testing-library/jest-dom";

const pickNumberInRange = jest.fn();

beforeEach(() => {
    window.confirm = jest.fn();
    global.alert = jest.fn();
    global.MissionUtils = {
        Random: {
            pickNumberInRange
        }
    }
    pickNumberInRange
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(2)
    .mockReturnValueOnce(3)
    .mockReturnValue(4);
});