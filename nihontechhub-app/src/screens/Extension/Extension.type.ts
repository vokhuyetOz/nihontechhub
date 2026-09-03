export type TExtensionFormValues = {
  status:
    | 'init'
    | 'loading_url'
    | 'creating_pdf'
    | 'scrolling'
    | 'done'
    | 'error';
  url: string;
  file?: {
    name: string;
    page: number;
    url: string;
    androidTmpFilePath?: string;
  };
};

export type TExtensionHandleRef = {
  loaded: Record<string, boolean>;
  fileName: Record<string, string>;
  retryCount: number;
  lastUrl: string;
  injectedJSTimeout: number | undefined;
};
