/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_BASE_URL: string;
    readonly VITE_APP_CLOUDINARY_URL:string;
    readonly VITE_APP_CLOUD_NAME:string
    readonly VITE_APP_UPLOAD_PRESET:string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  