import { Request, Response } from "express";
import categoryService from "../services/categoryService";
import { ResponseAPI } from "../models/responseAPI";
import CategoryModel from "../models/categoryModel";
import { CreateCategoryFormData } from "../types/createCategoryFormData";
import * as Utils from '../utils/utils';
import FileModel from "../models/fileModel";

interface CreateCategoryUploaded extends CreateCategoryFormData {
  fileUploaded: FileModel;
}

export async function createCategory(req: Request, res: Response) {
  const body: CreateCategoryUploaded = req.body;
  try {
    const new_category = {
      displayName: body.displayName,
      index: -1,
      value: Utils.toKebabCase(body.displayName),
      iconUrl: body.fileUploaded.url
    };
    if (req.file) {
      new_category.iconUrl = body.fileUploaded.url;
    }
    const data = await categoryService.create(new_category);
    const response: ResponseAPI<CategoryModel> = {
      success: true,
      data: data,
      message: 'The resource was successfully created.',
    }
    res.status(200).send(response);
  } catch (err) {
    const response: ResponseAPI = {
      success: false,
      error: `${err}`,
      message: 'An unexpected error occurred. Please try again later.',
    }
    res.status(500).send(response);
  }
}

export async function getCategories(_req: Request, res: Response): Promise<void> {
  try {
    const data = await categoryService.findMany();
    const response: ResponseAPI<CategoryModel[]> = {
      success: true,
      data: data,
      message: 'The resources were successfully fetched.',
    }
    res.status(200).send(response);
  } catch (err) {
    const response: ResponseAPI = {
      success: false,
      error: `${err}`,
      message: 'An unexpected error occurred. Please try again later.',
    }
    res.status(500).send(response);
  }
}

export async function getCategoryById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await categoryService.findOne(id);
    if (data) {
      const response: ResponseAPI<CategoryModel> = {
        success: true,
        data: data,
        message: 'The recource was successfully fetched.',
      }
      res.status(200).send(response);
    } else {
      const response: ResponseAPI = {
        success: false,
        message: 'Bad request, Please try again.',
      }
      res.status(400).send(response);
    }
  } catch (err) {
    const response: ResponseAPI = {
      success: false,
      error: `${err}`,
      message: 'An unexpected error occurred. Please try again later.',
    }
    res.status(500).send(response);
  }
}

export async function updateCategoryById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await categoryService.updateOne(id, body);
    if (data) {
      const response: ResponseAPI<CategoryModel> = {
        success: true,
        data: data,
        message: 'The resource was successfully updated.',
      }
      res.status(200).send(response);
    } else {
      const response: ResponseAPI = {
        success: false,
        message: 'Bad request, Please try again.',
      }
      res.status(400).send(response);
    }
  } catch (err) {
    const response: ResponseAPI = {
      success: false,
      error: `${err}`,
      message: 'An unexpected error occurred. Please try again later.',
    }
    res.status(500).send(response);
  }
}

export async function deleteCategoryById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await categoryService.deleteOne(id);
    if (data) {
      const response: ResponseAPI<boolean> = {
        success: true,
        data: data,
        message: 'The resource was successfully deleted.',
      }
      res.status(200).send(response);
    } else {
      const response: ResponseAPI = {
        success: false,
        message: 'Bad request, Please try again.',
      }
      res.status(400).send(response);
    }
  } catch (err) {
    const response: ResponseAPI = {
      success: false,
      error: `${err}`,
      message: 'An unexpected error occurred. Please try again later.',
    }
    res.status(500).send(response);
  }
}