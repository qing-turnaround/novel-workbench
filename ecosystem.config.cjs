module.exports = {
  apps: [
    {
      name: "novel-workbench",
      script: "node_modules/.bin/next",
      args: "start -p 18888",
      cwd: "/home/qing/project/apps/novel-workbench",
      env: {
        NODE_ENV: "production",
        NOVEL_DB_PATH: "/home/qing/project/novels/novels.db",
        AUTH_PASSWORD: "euNATVhjprilRQ64DGMY",
      },
    },
  ],
};
