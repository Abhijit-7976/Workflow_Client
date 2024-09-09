import { Button } from "@/components/ui/button";
import CustomEdge from "@/features/flow/CustomEdge";
import CustomNode from "@/features/flow/CustomNode";
import { onConnect, onEdgesChange, onNodesChange, selectEdges, selectNodes } from "@/features/flow/flowSlice";
import NodeProvider from "@/features/flow/NodeProvider";
import { useToast } from "@/hooks/use-toast";
import { saveWorkflow } from "@/services/workflowApi";
import { AppDispatch } from "@/store";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const WorkflowBuilder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  async function handleSaveWorkflow() {
    try {
      setIsLoading(true);
      await saveWorkflow({ nodes, edges });
      toast({
        title: "Success",
        description: "Workflow saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={connection => dispatch(onConnect(connection))}
        onNodesChange={changes => dispatch(onNodesChange(changes))}
        onEdgesChange={changes => dispatch(onEdgesChange(changes))}
        fitView>
        <NodeProvider />
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
      <Button
        className="fixed z-50 top-[5.5rem] right-3.5 shadow-md"
        onClick={handleSaveWorkflow}>
        {isLoading ? (
          <>
            <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Workflow"
        )}
      </Button>
    </>
  );
};

export default WorkflowBuilder;
