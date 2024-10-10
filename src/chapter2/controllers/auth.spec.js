const { join } = require("./auth");
const { User } = require("../models");

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
});
