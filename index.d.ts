export type HookOptions = {
  timeout?: number;
  dependencies?: Array<String>;
}
export type HookReturnType = [(...fnArgs: any[]) => (Promise<any>), string, () => void];
export function useWorker(fn: any, options: HookOptions): HookReturnType;
