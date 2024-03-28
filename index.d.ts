declare module 'denkovi' {
  export interface DenkoviOptions {
    ip: string;
    model: 'datnetip' | 'smartdenIO' | 'smartden';
    password?: string;
    user?: string;
    port?: number;
  }

  export class Denkovi {
    constructor(options: DenkoviOptions);
    getStates(): Promise<any>;
    getState(out: number): Promise<any>;
    setOut(out: number, value: 1 | 0, statusPrint?: boolean): Promise<any>;
  }
}
