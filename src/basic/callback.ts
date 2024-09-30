export function timer(callback: (result: string) => void) {
  setTimeout(() => {
    callback("success");
  }, 10_000);
}
