import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('🔴', err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
      details: err.details || null,
    },
  });
};

export default errorHandler;