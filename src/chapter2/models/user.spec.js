const User = require("./user");

describe("User", () => {
  it("초기 생성이 정상 동작한다.", () => {
    const fn = jest.spyOn(User, "init").mockImplementation();

    User.initiate({});

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("초기 생성이 정상 동작하여 db 객체 실행된다.", () => {
    const db = {
      User: {
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
      },
    };

    User.associate(db);

    expect(db.User.hasMany).toHaveBeenCalledTimes(1);
    expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
  });
});
