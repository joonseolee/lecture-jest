it.each([
  [1, 1, 2],
  [2, 3, 5],
  [3, 4, 7],
])("%i + %i = %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

it.each([
  { a: 1, b: 1, expected: 2 },
  { a: 2, b: 3, expected: 5 },
  { a: 3, b: 4, expected: 7 },
])(`$a + $b = $expected`, ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});
