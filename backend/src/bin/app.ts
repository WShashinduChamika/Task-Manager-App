import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

export default app;
