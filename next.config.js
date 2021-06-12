module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    AUTHKEY: process.env.AUTHKEY,
    SERVER_AUTHKEY: process.env.SERVER_AUTHKEY,
    DB_APIKEY: process.env.DB_APIKEY,
    DB_AUTHDOMAIN: process.env.DB_AUTHDOMAIN,
    DB_PROJECTID: process.env.DB_PROJECTID,
    DB_STROAGE_BUCKET: process.env.DB_STROAGE_BUCKET,
    DB_MESSAGINGSENDER_ID: process.env.DB_MESSAGINGSENDER_ID,
    DB_APPID: process.env.DB_APPID,
  },
};
