import { timer } from "./callback";

test("타이머 실행 (callback 함수보다는 promise 로 처리하도록하자)", (done) => {
  // 비동기일때는 실제로 테스트를 처리했는지 알수없기때문에 횟수를 가지고 체크
  // 근데 잘만 실패가 뜸
  expect.assertions(1);

  // 실제 걸리는게 아니라 가짜 타이머를 사용함
  jest.useFakeTimers();
  timer((result) => {
    expect(result).toBe("success");
    done();
  });
  // 이건 그냥 일괄로 빨리 처리하겠다는 것
  //   jest.runAllTimers();
  // 실제로 10초가 걸리는 것이 아니라 가짜 타이머를 사용하므로 10초를 빨리감기함
  jest.advanceTimersByTime(10_000);
});
