import express from 'express';
import * as toolController from '../controllers/toolController';

const router = express.Router();

router.get('/tools', toolController.getTools);
router.get('/tools/total', toolController.getToolCount);
router.get('/tools/search', toolController.searchTools);
router.get('/tools/category/:category', toolController.getToolsByCategory);
router.get('/tools/:id', toolController.getToolById);
router.post('/tools', toolController.createTool);
router.put('/tools/:id', toolController.updateToolById);
router.delete('/tools/:id', toolController.deleteToolById);

export default router;