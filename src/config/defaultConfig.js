const config = {
  env: "dev",
  dev: {
    port: 5000,
    mongoUri:
      "mongodb://root:DaaZiscool@cluster0-shard-00-00.qmd2u.mongodb.net:27017,cluster0-shard-00-01.qmd2u.mongodb.net:27017,cluster0-shard-00-02.qmd2u.mongodb.net:27017/sanyog?authSource=admin&replicaSet=atlas-mrqknk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    gmailId: "userconnect.care@gmail.com",
    gmailPassword: "saaezovtncpdnsho",
    optTime: "2m",
    saltRound: 10,
    accessTokenSecret: '43bbdb701e3e9d343ace43ff9df842451109039c3b75df25d9b883ded0512d336bdcaeae5b68ccf763279d9ea0aa739db668d7ef2adc9c92b3ceb19de9621ce7',
    accessTokenTime: '15m',
    refressTokenSecret: '6ad5e0898ed3fff0b0c48a2b9231ba60d0a55b2b5d4bfda8a173b9616cfc686ccd3009306c8425d981fcbebd1e4dade2ea0a2b95bd3104161ad0b998f7f9703c',
    refreshTokenTime: '180d',
  },
};

module.exports = config;
