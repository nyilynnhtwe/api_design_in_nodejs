import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { responseTemplate } from "./utils/responser";

const app: any = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Custom middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("Before");
//   console.log(req.body);
//   req.body = null;
//   console.log("After");
//   console.log(req.body);
//   next();
// });

app.get("/", (req: Request, res: Response) => {
  const incomingIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  responseTemplate({
    res,
    statusCode: 200,
    message: "Welcome to the API",
    data: { ip: incomingIP },
  });
});

app.use("/api", protect, router);
// Routes for User
app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

export default app;
