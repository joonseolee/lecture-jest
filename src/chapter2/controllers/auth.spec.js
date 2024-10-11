const { join, login, logout, localCallback } = require("./auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

describe("join", () => {
  it.each([
    { body: { email: "", password: "x", nick: "z" } },
    { body: { email: "c", password: "", nick: "z" } },
    { body: { email: "c", password: "x", nick: "" } },
  ])(
    `$body.email, $body.password, $body.nick 중에 한개라도 비어있으면 가입불가로 에러를 던짐`,
    async (req) => {
      const res = {
        redirect: jest.fn(),
      };
      const next = () => {};

      await join(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith("/join?error=empty");
    }
  );

  it("이미 가입한 이메일이면 에러발생", async () => {
    const req = {
      body: {
        email: "c",
        password: "x",
        nick: "z",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {};
    jest.spyOn(User, "findOne").mockResolvedValue({ id: 1 });
    jest.spyOn(User, "create").mockImplementation();

    await join(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith("/join?error=exist");
    expect(User.create).not.toHaveBeenCalled();
  });

  it("이미 가입한 이메일이 아니면 회원가입을 진행한다(암호화 후 디비 저장)", async () => {
    const req = {
      body: {
        email: "honggil@naver.com",
        password: "1234",
        nick: "홍길동",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "create").mockImplementation();
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed");

    await join(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/");
    expect(User.create).toHaveBeenCalledWith({
      email: "honggil@naver.com",
      password: "hashed",
      nick: "홍길동",
    });
  });
});

describe("logout", () => {
  it("로그이웃후 req.logout을 호출하고 / 로 리다이렉트", () => {
    const req = {
      logout: jest.fn((cb) => {
        cb();
      }),
    };
    const res = {
      redirect: jest.fn(),
    };

    logout(req, res);

    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});

describe("login", () => {
  it("로그인함수는 passport.authenticate 함수를 실행한다", () => {
    jest.spyOn(passport, "authenticate").mockImplementation(() => () => {});
    const req = {};
    const res = {};
    const next = () => {};

    login(req, res, next);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
  });

  it("로컬 로그인 시 에러가 있으면 에러처리함수로 에러를 넘긴다", () => {
    const authError = new Error();
    const req = {};
    const res = {};
    const next = jest.fn();
    localCallback(req, res, next)(authError);
    expect(next).toHaveBeenCalledWith(authError);
  });

  it("로컬 로그인시 에러있을경우 에러처리함수로 에러를 던짐", () => {
    const authError = new Error();
    jest
      .spyOn(passport, "authenticate")
      .mockImplementation((strategy, cb) => (req, res, next) => {
        cb(authError, null, null);
      });

    const req = {};
    const res = {};
    const next = jest.fn();
    login(req, res, next);

    expect(next).toHaveBeenCalledWith(authError);
  });
});
