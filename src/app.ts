import { env } from 'node:process';
import { envs }  from './config/envs.js';
import { MongoDatabase } from './data/index.js';
import { AppRoutes } from './presentation/routes.js';
import { Server } from './presentation/server.js';


(async()=> {
  main();
})();


async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}