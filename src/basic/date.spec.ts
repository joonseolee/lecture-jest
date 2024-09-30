import { after3Days } from "./date";

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date("2021-07-01").getTime());
});

afterEach(() => {
  jest.useRealTimers();
});

test("3일후를 리턴한다", () => {
  const now = new Date();
  now.setDate(now.getDate() + 3);
  expect(after3Days()).toEqual(now);
});
