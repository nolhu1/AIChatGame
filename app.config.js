import 'dotenv/config';


export default () => {
  const isDev = process.env.APP_ENV !== 'production';

  return {
    
    expo: {
      name: "AIChatGame",
      slug: "aichatgame",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "aichatgame",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true,
        package: "com.nolh1.AIChatGame"
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff"
          }
        ]
      ],
      experiments: {
        typedRoutes: true
      },
      extra: {
        router: {},
        eas: {
        "projectId": "fa242a18-b182-4f1b-81bb-731bf67ce39a"        },
        
        SERVER_URL: isDev
          ? 'ws://192.168.2.3:3000'
          : 'wss://ws-server-pk57.onrender.com'
      }
    }
  };
};
