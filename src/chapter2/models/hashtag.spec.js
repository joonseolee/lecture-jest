const Hashtag = require("./hashtag");

describe("Hashtag", () => {
  it("초기 생성한다.", () => {
    const fn = jest.spyOn(Hashtag, "init").mockImplementation();
    Hashtag.initiate({});
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("초기 생성할때 db객체 의존관계를 실행한다.", () => {
    const db = {
      Hashtag: {
        belongsToMany: jest.fn(),
      },
    };
    Hashtag.associate(db);
    expect(db.Hashtag.belongsToMany).toHaveBeenCalledTimes(1);
  });
});
