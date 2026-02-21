import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hbs.kababcornerpos',
  appName: 'H.B.S. Kabab Corner POS',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
