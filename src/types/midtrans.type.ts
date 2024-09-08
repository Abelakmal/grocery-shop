/* eslint-disable @typescript-eslint/no-explicit-any */


export interface Snap {
  embed: (token: string, options: SnapOptions) => void;
}

export interface SnapOptions {
  embedId: string;
  onSuccess: (result:any) => void
  onPending: (result:any) => void
  onError: (result:any) => void
  onClose: (result:any) => void
}
