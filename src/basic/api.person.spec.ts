import { getPerson, Person, Worker } from "./api.person";

test("person 객체 조회", () => {
  const person = { id: 1, name: "John" };

  expect(getPerson()).toStrictEqual(person);
});

test("person, worker 필드가 같으면 같게 객체로 처리한다.", () => {
  const person = new Person(1, "John");
  const worker = new Worker(1, "John");

  expect(person).toMatchObject(worker);
});

test("person.getRandom 랜덤값을 잘 받는다.", () => {
  const person = new Person(1, "John");
  expect(person.getRandom()).toStrictEqual(expect.any(Number));
});
