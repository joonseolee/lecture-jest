import { obj } from "./module";

beforeEach(() => {
  // mocking 캐시때문에 처리
  jest.resetModules();
});

test("모듈을 전부 목킹한다 (무식하게)", () => {
  jest.spyOn(obj, "method1");
  jest.spyOn(obj, "method2");
  jest.spyOn(obj, "method3");
  jest.spyOn(obj, "method4");
  jest.spyOn(obj, "method5");
});

// 아래 파일에 선언된 모든 메소드를 목으로 설정, 변수 X
// 특정 객체로 변경도 가능
// jest.mock("./module", () => ({ prop: "hello" }));
jest.mock("./module");
test("모듈을 전부 목킹한다 (멋지게)", () => {
  console.log(obj);
});

// 모든 메소드를 목킹하진않고, 특정 메소드만 목킹하고싶을때
// jest.mock("./module", () => { ...jest.requireActual('./module'), method1() { return "mocked"; } });

// jest mock 은 호이스팅되기때문에 아무리 내부 메소드에 만들어도 import 구문처럼 바로 동작함.
// 그렇기때문에 import 구문 아래에 바로 jest.mock 을 선언.

test("모듈의 필드를 목킹", () => {
  jest.replaceProperty(obj, "prop", "바뀌었지용");

  expect(obj.prop).toBe("바뀌었지용");
});

test("first import", async () => {
  const { obj } = await import("./module");
  obj.prop = "sleeping";
  expect(obj.prop).toBe("sleeping");
});

test("second import", async () => {
  const { obj } = await import("./module");
  expect(obj.prop).toBe("hello, world");
});
