const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

describe("isLoggedIn", () => {
  test("로그인되어 있으면 next를 호출해야 함", () => {
    const req = {
      isAuthenticated() {
        return true;
      },
    };

    const res = {};
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("로그인되어 있지않다면 403 메시지를 떨굼", () => {
    const req = {
      isAuthenticated() {
        return false;
      },
    };

    // 그냥 function 과 화살표 함수 둘다 사용해봄
    const res = {
      status: jest.fn(function (status) {
        return this;
      }),

      send: jest.fn(() => res),
    };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("로그인 필요");
  });
});

describe("isNotLoggedIn", () => {
  test("로그인되어 있지않다면 next를 호출해야 함", () => {
    const req = {
      isAuthenticated() {
        return false;
      },
    };

    const res = {};
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("로그인되어 있다면 redirect를 호출해야 함", () => {
    const req = {
      isAuthenticated() {
        return true;
      },
    };

    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledTimes(1);
  });
});
