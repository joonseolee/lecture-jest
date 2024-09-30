import { Calculator, sum } from "./something";

afterAll(() => {
  jest.clearAllMocks(); // 모든 mock 함수 초기화
});

describe("sum 함수 그룹", () => {
  beforeAll(() => {
    console.log("sum 함수 그룹 시작");
  });

  afterAll(() => {
    console.log("sum 함수 그룹 종료");
  });

  test("sum 함수 실행", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test.skip("sum 함수 실패해도 스킵 (1, 2) => 1", () => {
    expect(sum(1, 2)).toBe(1);
  });

  test.todo("나중에 뭔가 만들꺼임. 주석 쓰는거랑 같음");
});

test("sum 함수 호출됨 (toHaveBeenCalled 사용 지양)", () => {
  const spy = jest.fn(sum);
  spy(1, 2);

  expect(spy).toHaveBeenCalled();

  spy.mockClear(); // Times, With 초기화
  spy.mockReset(); // mockClear + mockImplementation(() => {})
  spy.mockRestore(); // 아예 전부 삭제
});

test("sum 함수 1번 호출됨", () => {
  const spy = jest.fn(sum);
  spy(1, 2);

  expect(spy).toHaveBeenCalledTimes(1);
});

test("sum 함수 1,2 인자로 호출됨", () => {
  const spy = jest.fn(sum);
  spy(1, 2);

  expect(spy).toHaveBeenLastCalledWith(1, 2);
});

test("calculator minus 함수 1번 호출됨 (spy 함수 생성)", () => {
  const calculator = new Calculator();
  const spy = jest.fn(calculator.minus);
  spy(2, 1);

  expect(spy).toHaveBeenCalledTimes(1);
});

test("calculator minus 함수 1번 호출됨 (spy 함수 삽입)", () => {
  const calculator = new Calculator();
  jest.spyOn(calculator, "minus");
  calculator.minus(2, 1);

  expect(calculator.minus).toHaveBeenCalledTimes(1);
});

test("0.1 + 0.2 = 0.3", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
