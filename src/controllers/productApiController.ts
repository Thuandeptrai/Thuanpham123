import { NextFunction, Request, Response } from 'express';
import logger from '../core/logger';
import { Product } from '../models/product';

const productApiController = {
  listing: (req: Request, res: Response, next: NextFunction): void => {
    logger.info('retrieving product listing');
    let size: number = Number(req.query.size);
    if (Number.isNaN(size)) {
      size = 10;
    }
    if (size <= 0) {
      size = 10;
    } else if (size > 100) {
      size = 100;
    }
    let page: number = Number(req.query.page);
    if (Number.isNaN(page)) {
      page = 1;
    }
    if (page <= 0) {
      page = 1;
    }
    Product.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['id', 'DESC'],
        ['id', 'ASC'],
      ],
    })
      .then((result) => {
        if (result.rows) {
          res.status(200).json(result.rows);
        } else {
          res.status(200).json([]);
        }
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        res.status(500).json({
          status: false,
          message: 'Some thing went wrong',
        });
      });
  },

  retrieveByCode: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    const code: number = Number(req.query.code);

    try {
      const FindProduct = Product.findOne({ where: { id: code } });
      if (FindProduct) {
        res.status(200).json(FindProduct);
      } else {
        res.status(500).json({
          status: false,
          message: 'Not Found',
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Some thing went wrong',
      });
    }
  },

  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const create = await Product.create(req.body);
      // logger.info('retrieving product listing');

      // logger.info(create);
      res.status(200).json(create);
    } catch (err) {
      logger.info(err);
      res.status(500).json({
        status: false,
        message: 'Some thing went wrong',
      });
    }

    // FIXME
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    const code: number = Number(req.params.code);
    try {
      const update = await Product.update(
        {
          code: req.body.code,
          name: req.body.name,
          category: req.body.category,
          brand: req.body.brand,
          type: req.body.type,
          description: req.body.description,
        },
        { where: { id: code } }
      );
      // logger.info('retrieving product listing');
      const findProduct = await Product.findByPk(code);
      // logger.info(create);
      res.status(200).json(findProduct);
    } catch (err) {
      logger.info(err);
      res.status(500).json({
        status: false,
        message: 'Some thing went wrong',
      });
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    const code: number = Number(req.params.code);

    try {
      const deleteProduct = await Product.destroy({
        where: {
          id: code,
        },
      });
      res.status(200).json('Success');
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Some thing went wrong',
      });
    }
  },
};

export default productApiController;
