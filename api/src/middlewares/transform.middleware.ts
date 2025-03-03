import { Request, Response, NextFunction } from 'express';
import { transformObject } from '../utils/transform';

export function transformLocalizedFields(localizedFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers['accept-language'] || 'en'; // Default language

    res.locals.transformLanguage = (
      responseData: object | { results: object[]; total: number },
    ) => {
      if (!responseData || typeof responseData !== 'object')
        return responseData;

      let newObject: object | { total: number; results: object[] } = {};
      // Handle different response structures
      if ('results' in responseData && Array.isArray(responseData.results)) {
        newObject = {
          results: responseData.results.map((item) =>
            transformObject(item, lang, localizedFields),
          ),
          total: responseData.total,
        };
      } else {
        newObject = transformObject(responseData, lang, localizedFields);
      }

      return newObject;
    };

    next();
  };
}
