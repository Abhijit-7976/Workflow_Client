import { AppDispatch } from "@/store";

import { X } from "lucide-react";
import { useDispatch } from "react-redux";

import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "@xyflow/react";
import { removeEdge } from "./flowSlice";

// `-translate-x-1/2 -translate-y-1/2  translate-x-[${labelX}] translate-y-[${labelY}]`

export default function CustomEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        {...props}
      />
      <EdgeLabelRenderer>
        <X
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="size-4 p-0.5 cursor-pointer rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={() => {
            dispatch(removeEdge(id));
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
