import { CustomError, customError, error } from "./throw";

test("에러 잘 실행됨", () => {
  expect(() => error()).toThrow();
});

test("customError 잘 실행됨", () => {
  expect(() => customError()).toThrow(CustomError);
});
