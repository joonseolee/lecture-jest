const Post = require("./post");

describe("Post", () => {
  it("초기 생성이 정상 작동.", () => {
    const fn = jest.spyOn(Post, "init").mockImplementation();
    Post.initiate({});
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("초기생성할때 db 객체에서 의존관계를 실행한다.", () => {
    const db = {
      Post: {
        belongsTo: jest.fn(),
        belongsToMany: jest.fn(),
      },
    };
    Post.associate(db);
    expect(db.Post.belongsTo).toHaveBeenCalledTimes(1);
    expect(db.Post.belongsToMany).toHaveBeenCalledTimes(1);
  });
});
