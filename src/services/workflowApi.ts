import { axiosInstance as axios } from "@/lib/utils";
import { type Edge, type Node } from "@xyflow/react";
import { AxiosError } from "axios";

export interface SaveWorkflowParams {
  nodes: Node[];
  edges: Edge[];
}

export interface RunWorkflowParams {
  csvFile: File;
  flowId: string;
}

export const saveWorkflow = async (data: SaveWorkflowParams) => {
  try {
    await axios.post("/api/v1/workflow/save", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to save workflow. Please try again later.");
    }
  }
};

export const startWorkflow = async ({ csvFile, flowId }: RunWorkflowParams) => {
  try {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("flowId", flowId);

    await axios.post("/api/v1/workflow/start", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to run workflow. Please try again later.");
    }
  }
};

export const getAllWorkflow = async () => {
  try {
    const response = await axios.get("/api/v1/workflow/");
    return response.data.data.workflows as string[];
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to save workflow. Please try again later.");
    }
  }
};
