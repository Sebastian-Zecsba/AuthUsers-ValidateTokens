import express, { response, Router } from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
    port: number;
    routes: Router;
    public_path?: string; 
}

export class Server{ 

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options){

        const { port, public_path = 'public', routes} = options

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(){ 

        // Middleware
        this.app.use( express.json()) // raw
        this.app.use( express.urlencoded({extended: true})) // x-www-urlencoded

        // Public Folder
        this.app.use(express.static(this.public_path));

        // routes
        this.app.use(this.routes)
        

        // /*splat 
        this.app.get('/*splat', (req, res) => {
           const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
           res.sendFile(indexPath);
           
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}