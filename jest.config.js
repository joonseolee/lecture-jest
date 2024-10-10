/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 * nodule_modules 도 목킹을 하고싶다면 rootDir 을 . 로 설정해야한다.
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  collectCoverage: true,
};
