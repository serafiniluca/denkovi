declare module 'Denkovi' {
  interface Pin {
    name: string;
    value: number;
    id: number;
  }

  interface DenkoviOptions {
    ip: string;
    port?: number;
    password?: string;
    user?: string;
    model: 'datnetip' | 'smartden';
    timeout?: number;
  }

  export class Denkovi {
    constructor(options: DenkoviOptions);
    getStates(): Promise<Pin[]>;
    getState(out: number): Promise<Pin>;
    setState(out: number, port: string, value: 1 | 0, statusPrint?: boolean): Promise<any>;
  }
}
