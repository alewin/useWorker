// Type definitions for @koale/useWorker
// Project: https://github.com/alewin/useWorker
// TypeScript Version: 2.8

export type HookReturnType = [(...fnArgs: any[]) => (Promise<any>), string, () => void];

export function useWorker(fn: any[]): HookReturnType;
