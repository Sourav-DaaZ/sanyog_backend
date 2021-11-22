const config = {
  env: "dev",
  dev: {
    port: 5000,
    mongoUri:
      // 'mongodb://aman:amanadmin@project-shard-00-00.6espu.mongodb.net:27017,project-shard-00-01.6espu.mongodb.net:27017,project-shard-00-02.6espu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9br7mj-shard-0&authSource=admin&retryWrites=true&w=majority',
      'mongodb://localhost:27017/sanyog',
    gmailId: "userconnect.care@gmail.com",
    gmailPassword: "saaezovtncpdnsho",
    optTime: "2m",
    saltRound: 10,
    accessTokenSecret: '43bbdb701e3e9d343ace43ff9df842451109039c3b75df25d9b883ded0512d336bdcaeae5b68ccf763279d9ea0aa739db668d7ef2adc9c92b3ceb19de9621ce7',
    accessTokenTime: '15000d',
    refressTokenSecret: '6ad5e0898ed3fff0b0c48a2b9231ba60d0a55b2b5d4bfda8a173b9616cfc686ccd3009306c8425d981fcbebd1e4dade2ea0a2b95bd3104161ad0b998f7f9703c',
    refreshTokenTime: '180d',
    adminPassword: 'admin@admin'
  },
};

module.exports = config;
