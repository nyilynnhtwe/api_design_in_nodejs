import { Response } from "express";

export const responseTemplate = ({ res, statusCode, message, data }) => {
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message,
    data: data,
  });
};
