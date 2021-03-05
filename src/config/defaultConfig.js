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
  },
};

module.exports = config;
