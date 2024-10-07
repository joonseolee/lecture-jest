import { id } from "../../jest.config";

export function getPerson(): object {
  return {
    id: 1,
    name: "John",
  };
}

export class Person {
  constructor(public id: number, public name: string) {}

  getRandom(): number {
    return Math.random();
  }
}

export class Worker {
  constructor(public id: number, public name: string) {}
}
