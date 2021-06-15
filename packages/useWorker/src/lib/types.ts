export type DepList = () => unknown[];

export enum WORKER_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  RUNNING = "RUNNING",
  ERROR = "ERROR",
  TIMEOUT_EXPIRED = "TIMEOUT_EXPIRED",
}

export type WorkerController = {
  status: WORKER_STATUS;
  kill: Function;
};

export enum TRANSFERABLE_TYPE {
  AUTO = "auto",
  NONE = "none",
}

export interface UseWorkerOptions {
  timeout?: number;
  remoteDependencies?: string[];
  autoTerminate?: boolean;
  transferable?: TRANSFERABLE_TYPE;
  localDependencies?: DepList;
}

export interface JOB_RUNNER_OPTIONS {
  fn: Function;
  transferable: TRANSFERABLE_TYPE;
}
