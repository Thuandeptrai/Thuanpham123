import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/product';

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    let size: number = Number(req.query.size);
    let orderList: any = String(req.query.dir).toUpperCase();
    let userList: any = String(req.query.sort);
    const mode = ['DESC', 'ASC'];
    const listOrder = ['id', 'code', 'name', 'brand', 'category', 'type'];
    const validate = mode.indexOf(orderList);
    const validateSort = listOrder.indexOf(userList);
    if (validate !== -1) {
      orderList = mode[validate];
    } else {
      orderList = mode[1];
    }

    if (validateSort !== -1) {
      userList = listOrder[validateSort];
    } else {
      userList = listOrder[0];
    }
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
      order: [[userList, orderList]],
    });
    const message: string = '';
    const TotalProduct: number = await Product.count();
    res.render('pages/product/index', {
      message,
      TotalProduct,
      products,
    });
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    const message: string = '';
    res.render('pages/product/create', {
      message,
    });
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
    const code = req.params.code;
    const FindProduct = await Product.findOne({ where: { code } });

    // FIXME

    res.render('pages/product/edit', {
      FindProduct,
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
