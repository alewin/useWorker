export type HookOptions = {
  timeout?: number;
  dependencies?: Array<String>;
}
export type HookReturnType<T> = [(...fnArgs: Parameters<T>) => (Promise<ReturnType<T>>), string, () => void];
export function useWorker<T>(fn: T, options?: HookOptions): HookReturnType<T>;
