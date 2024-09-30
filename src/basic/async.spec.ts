import { noPromise, okPromise } from "./async";

test("okPromise 함수 실행 (return 꼭 붙어야함)", () => {
  const okSpy = jest.fn(okPromise);
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 함수 실행 (동일하게 return + then 사용)", () => {
  const okSpy = jest.fn(okPromise);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("noPromise 함수 실행 (reject 사용)", () => {
  const noSpy = jest.fn(noPromise);
  return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 함수 실행", () => {
  const noSpy = jest.fn(noPromise);
  return noSpy().catch((error) => {
    expect(error).toBe("no");
  });
});

test("okPromise async 함수 실행", async () => {
  const result = await okPromise();

  expect(result).toBe("ok");
});

test("noPromise async 함수 실행", async () => {
  try {
    await noPromise();
  } catch (error) {
    expect(error).toBe("no");
  }
});
