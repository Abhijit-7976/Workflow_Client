import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges, type Connection, type EdgeChange, type NodeChange } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { initialEdges, initialNodes, NodeTypes, TaskTypes } from "./flow.constants";

interface AddNodePayloadType {
  taskType: TaskTypes;
  nodeType: NodeTypes;
}

const initialState = {
  nodes: initialNodes,
  edges: initialEdges,
};

const SCREEN_X = window.screen.availWidth;
const SCREEN_Y = window.screen.availHeight;

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<AddNodePayloadType>) => {
      const x = Math.random() * (SCREEN_X - 56) + 56;
      const y = Math.random() * (SCREEN_Y - 73) + 73;
      const id = uuidv4();

      const newNode = {
        id,
        data: { label: action.payload.taskType },
        position: { x, y },
        type: action.payload.nodeType,
      };
      state.nodes = [...state.nodes, newNode];
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(edge => edge.id !== action.payload);
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      const a = applyNodeChanges(action.payload, state.nodes);
      state.nodes = a;
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const edge = { ...action.payload, type: "customEdge", animated: true };
      state.edges = addEdge(edge, state.edges);
    },
  },
});

export const { addNode, removeNode, removeEdge, onNodesChange, onEdgesChange, onConnect } = flowSlice.actions;

export const selectNodes = (state: RootState) => state.flow.nodes;
export const selectEdges = (state: RootState) => state.flow.edges;

export default flowSlice.reducer;
