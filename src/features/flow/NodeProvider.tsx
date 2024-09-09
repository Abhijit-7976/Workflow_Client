import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AppDispatch } from "@/store";

import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { NodeTypes, TASKS, TaskTypes } from "./flow.constants";
import { addNode } from "./flowSlice";

const NodeProvider = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddNode = (taskType: TaskTypes, nodeType: NodeTypes) => {
    dispatch(addNode({ taskType, nodeType }));
  };

  return (
    <Popover>
      <PopoverTrigger
        className="absolute z-50 top-3.5 left-3.5 shadow-md"
        asChild>
        <Button
          variant="outline"
          size="default">
          <Plus className="mr-2" /> Add Node
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="absolute -left-16"
        asChild>
        <div className="flex flex-col w-fit p-2">
          {TASKS.map(task => (
            <Button
              key={task}
              variant="ghost"
              onClick={() => handleAddNode(task, "customNode")}>
              {task}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NodeProvider;
