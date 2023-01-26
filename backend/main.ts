import * as express from "express";
import * as path from "path";
import * as Http from "http";
import { isLoggedIn } from "./authentication-utils";
import { renderView, Views } from "./react-view-utils";
import { config } from "./config";
import apiRoutes from "./routes/api";

process.on("uncaughtException", (err) => console.error(err));
process.on("SIGTERM", () => {
  console.warn("Caught SIGTERM, exiting...");
  setTimeout(() => process.exit(128 + 15), 1000);
});

const app = express();
const http = Http.createServer(app);
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.enable("case sensitive routing");

app.get("/js/check-authentication.js", (_req, res) => {
  // This file includes appVersion, and caching it messes up the login in check-client-version.ts
  res.set("Cache-Control", "no-cache, no-store");
  res.sendFile(
    path.join(__dirname, "..", "public", "js", "check-authentication.js")
  );
});
app.use(express.static(path.join(__dirname, "..", "public"), { maxAge: "1d" }));
app.use(express.json({ limit: "1000kb" }));
app.get("/js/app.js", isLoggedIn, (_, res) => {
  res.sendFile(path.join(__dirname, "..", "app.js"));
});

app.use("/api", apiRoutes);

app.get("/js/app.js.map", isLoggedIn, (_, res) => {
  res.sendFile(path.join(__dirname, "..", "app.js.map"));
});

app.get(["/", "/*"], (_req, res) => {
  res.send(renderView({ view: Views.Index }));
});

const port = process.env.port || 3000;

http.listen(port, () => {
  const msg = `React App listening on port ${port} (Node.js version ${process.versions.node}, ${config.environment} environment)`;
  // eslint-disable-next-line no-console
  console.log(msg);
});
