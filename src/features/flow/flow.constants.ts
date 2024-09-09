import { type Edge, type Node } from "@xyflow/react";

export type NodeTypes = "customNode";

export enum TaskTypes {
  Start = "Start",
  End = "End",
  FilterData = "Filter Data",
  Wait = "Wait",
  ConvertFormat = "Convert Format",
  SendPOSTRequest = "Send POST Request",
}
// export type TaskTypes = "Start" | "End" | "Filter Data" | "Wait" | "Convert Format" | "Send POST Request";

export const TASKS: TaskTypes[] = [TaskTypes.Start, TaskTypes.End, TaskTypes.FilterData, TaskTypes.Wait, TaskTypes.ConvertFormat, TaskTypes.SendPOSTRequest];

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [];
