import path from 'node:path';
import { Router } from "express";
import multer from 'multer';
import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listOrders } from './app/useCases/orders/listOrders';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
     storage: multer.diskStorage({
          destination(req, file, callback) {
               callback(null, path.resolve(__dirname, '..', 'uploads'));
          },
          filename(req, file, callback) {
               callback(null, `${Date.now()}-${file.originalname}`);
          }
     })
});

// Rota para listar categorias
router.get('/categories', listCategories);

// Rota para criar categorias
router.post('/categories', createCategory);

// Rota para listar produtos
router.get('/products', listProducts);

// Rota para criar produtos
router.post('/products', upload.single('image'), createProduct);

// Rota para receber produtos por categoria
router.get('/categories/:categoryId/products', listProductsByCategories);

// Rota para listar pedidos
router.get('/orders', listOrders);

// Rota para criar pedidos
router.post('/orders', createOrder);

// Rota para mudar o status do pedido
router.patch('/orders/:orderId', changeOrderStatus);

// Rota para apagar/cancelar pedido
router.delete('/orders/:orderId', cancelOrder);