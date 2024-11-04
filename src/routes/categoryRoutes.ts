import express from 'express';
import { getCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } from '../controllers/categoryController';
import { uploadIconCategoryMiddleware } from '../middlewares/uploadFileMiddleware';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', [uploadIconCategoryMiddleware], createCategory);
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;