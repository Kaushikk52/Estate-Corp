/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_BASE_URL: string;
    readonly VITE_APP_CLOUDINARY_URL:string;
    readonly VITE_APP_CLOUD_NAME:string
    readonly VITE_APP_UPLOAD_PRESET:string
    readonly VITE_APP_DEFAULT_IMG:string
    readonly VITE_APP_IMG_PREFIX:string

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  