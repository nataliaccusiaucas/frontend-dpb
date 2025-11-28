export {};

declare global {
  interface CulqiToken {
    id: string;
  }

  interface CulqiCheckout {
    publicKey: string;
    options(opts: any): void;
    settings(opts: any): void;
    open(): void;
    token?: (token: CulqiToken) => void;
  }

  interface Window {
    Culqi?: CulqiCheckout;
  }
}
