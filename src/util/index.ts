export function promiseFormatter<T>(
  promise: Promise<T>
): Promise<[Error | undefined, T | undefined]> {
  return promise
    .then(res => [void 0, res])
    .catch((err: Error) => [err, void 0]) as any;
}
