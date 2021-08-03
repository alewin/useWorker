import WORKER_STATUS from './lib/status'

export enum TRANSFERABLE_TYPE {
  AUTO = 'auto',
  NONE = 'none',
}

export type WorkerController = {
  status: WORKER_STATUS;
  kill: Function;
}

export type Options = {
  timeout?: number;
  remoteDependencies?: string[];
  autoTerminate?: boolean;
  transferable?: TRANSFERABLE_TYPE;
  // localDependencies?: () => unknown[];
}
