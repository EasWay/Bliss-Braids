declare namespace NodeJS {
  interface ProcessEnv {
    // Resend API configuration
    RESEND_API_KEY: string;
    
    // Owner contact information
    OWNER_EMAIL: string;
    NEXT_PUBLIC_OWNER_WHATSAPP: string;
    
    // Next.js built-in environment variables
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_VERCEL_URL?: string;
  }
}