export type HookReturnType = [(...fnArgs: any[]) => (Promise<any>), string, () => void];
export function useWorker(fn: any): HookReturnType;
