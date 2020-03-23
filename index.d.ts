export type HookOptions = {
  timeout?: number;
  dependencies?: Array<String>;
}
export type HookReturnType<T extends Function> = [(...fnArgs: Parameters<T>) => (Promise<ReturnType<T>>), string, () => void];
export function useWorker<T extends Function>(fn: T, options?: HookOptions): HookReturnType<T>;
