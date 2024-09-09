import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store";
import { Node, NodeProps, Position } from "@xyflow/react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import CustomHandle from "./CustomHandle";
import { TaskTypes } from "./flow.constants";
import { removeNode } from "./flowSlice";

const CustomNode = ({ data: { label }, id }: NodeProps<Node<{ label: TaskTypes }>>) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button>
      {label}{" "}
      <X
        className="size-4 p-0.5 ml-3 rounded-full hover:bg-destructive/60"
        onClick={() => dispatch(removeNode(id))}
      />
      <CustomHandle
        type="target"
        position={Position.Top}
      />
      <CustomHandle
        type="source"
        position={Position.Bottom}
      />
    </Button>
  );
};

export default CustomNode;
