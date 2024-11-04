import { Request, Response } from "express";
import toolService from "../services/toolService";
import { ResponseAPI } from "../models/responseAPI";
import ToolModel from "../models/toolModel";
import takeScreenshot from "../services/screenshotService";
import { ObjectId } from "mongodb";
import { CreateToolFormData } from "../types/createToolFormData";

export async function createTool(req: Request, res: Response) {
  const body: CreateToolFormData = req.body;
  try {
    const newToolId = new ObjectId();
    const screenshotPath = await takeScreenshot(body.url, `${newToolId.toString()}.png`);
    const data = await toolService.create({
      _id: newToolId,
      summary: body.summary,
      title: body.title,
      url: body.url,
      description: body.description,
      isFavorite: false,
      cover: screenshotPath,
      categories: body.categories,
      tags: body.tags.toLocaleLowerCase().split(','),
      created_at: new Date()
    });

    const response: ResponseAPI<ToolModel> = {
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

export async function getTools(_req: Request, res: Response): Promise<void> {
  try {
    const data = await toolService.findMany();
    const response: ResponseAPI<ToolModel[]> = {
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

export async function getToolsByCategory(req: Request, res: Response): Promise<void> {
  const { category } = req.params;
  try {
    const data = await toolService.findMany({ category: category });
    const response: ResponseAPI<ToolModel[]> = {
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

export async function getToolById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await toolService.findOne(id);
    if (data) {
      const response: ResponseAPI<ToolModel> = {
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

export async function updateToolById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await toolService.updateOne(id, body);
    if (data) {
      const response: ResponseAPI<ToolModel> = {
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

export async function deleteToolById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await toolService.deleteOne(id);
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

export async function searchTools(req: Request, res: Response): Promise<void> {
  const { q } = req.query;
  try {
    if (typeof (q) == 'string') {
      const data = await toolService.searchDeep(q);
      const response: ResponseAPI<ToolModel[]> = {
        success: true,
        data: data,
        message: 'The resources were successfully fetched.',
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

export async function getToolCount(_req: Request, res: Response): Promise<void> {
  try {
    const data = await toolService.countDocuments();
    const response: ResponseAPI<number> = {
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