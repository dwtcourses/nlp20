import express, { Express } from "express";
import { ComplexEndpoint } from "./endpoints/ComplexEndpoint";

export class HttpServer {

  private initialized = {
    setup: false,
    endpoints: false,
    listen: false,
  };
  private defaultPort = 3001;
  app: Express;

  constructor() {
  }

  init() {
    this.setup();

    this.setEndpoints();

    this.listen();
  }

  setup(): this {
    if (this.initialized.setup) {
      return this;
    }
    this.initialized.setup = true;

    const app = this.app = express();

    app.use(express.json());
    app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Request methods you wish to allow
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

      // Request headers you wish to allow
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Pass to next layer of middleware
      next();
    });
    return this;
  }

  setEndpoints(): this {
    if (this.initialized.endpoints) {
      return this;
    }
    this.initialized.endpoints = true;

    new ComplexEndpoint(this.app);

    return this;
  }

  listen(): this {
    if (this.initialized.listen) {
      return this;
    }
    this.initialized.listen = true;

    const port = process.env.PORT || this.defaultPort;
    this.app.listen(port, () => {
      console.log(`REST API server is running on port ${this.defaultPort}...`);
    });

    return this;
  }
}
