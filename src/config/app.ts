/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from '../app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from '../app/middleware/globalErrorHandler';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route

app.use('/api/v1', routes);

// global error handler
// eslint-disable-next-line no-undef
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    sucess: 'False',
    message: 'Not Found !',
    erroMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
});
export default app;
