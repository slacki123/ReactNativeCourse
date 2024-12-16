import 'dotenv/config';

export default {
  expo: {
    plugins: [
      [
        "expo-sqlite",
        {
          enableFTS: true, // Ensures FTS (Full Text Search) is enabled
          useSQLCipher: false
        },
      ],
    ],
    extra: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
    newArchEnabled: true
  },
};
