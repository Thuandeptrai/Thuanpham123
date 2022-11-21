import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/product';

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    let size: number = Number(req.query.size);
    const orderList: any = String(req.query.dir).toUpperCase();

    let products: any[] = [];
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
    products = await Product.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['id', orderList || 'ACS'],
      ],
    });
    const message: string = '';
    res.render('pages/product/index', {
      message,
      products,
    });
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    const message: string = '';
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render('pages/product/error', {
      message: 'not implemented',
    });
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render('pages/product/error', {
      message: 'not implemented',
    });
  },

  edit: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render('pages/product/error', {
      message: 'not implemented',
    });
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render('pages/product/error', {
      message: 'not implemented',
    });
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render('pages/product/error', {
      message: 'not implemented',
    });
  },
};

export default productController;
