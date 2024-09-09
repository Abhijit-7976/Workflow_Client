import { Handle, HandleProps } from "@xyflow/react";

const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      {...props}
      className="bg-primary size-2"
    />
  );
};

export default CustomHandle;
