import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAllWorkflow, startWorkflow } from "@/services/workflowApi";
import { AppDispatch } from "@/store";
import { Loader2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const WorkflowRun = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [workflows, setWorkflows] = useState<string[]>([]);
  const [progressDescription, setProgressDescription] = useState("No workflow started yet");
  const [flowId, setFlowId] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const csvFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const workflows = await getAllWorkflow();
      if (!workflows || workflows.length < 0) return;
      setWorkflows(workflows);
    })();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isStarted) return;

      const file = csvFileRef.current?.files?.[0];
      if (!file) {
        toast({
          variant: "destructive",
          title: "File not selected",
          description: "Please select a csv file",
        });
        return;
      }

      try {
        setIsStarted(true);
        await startWorkflow({ csvFile: file, flowId });

        console.log("Saving workflow...");
        const eventSource = new EventSource(`/api/v1/workflow/run/${flowId}`);

        eventSource.onmessage = event => {
          const data = JSON.parse(event.data).data;

          setProgressDescription(`Step ${data.count} of ${data.total} completed`);

          if (data?.completed || data?.failed) {
            console.log("Workflow completed");
            eventSource.close();
            toast({
              title: "Workflow Progress",
              description: `All steps completed`,
            });

            setProgressDescription("No workflow started yet");
            setIsStarted(false);
          }
        };
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (error as Error).message,
        });
        setIsStarted(false);
      }
    },
    [flowId, isStarted, toast]
  );

  return (
    <div className="size-full flex flex-col gap-4 justify-center items-center">
      <Card className="mx-auto w-4/6 max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Workflow Run Progress</CardTitle>
          <CardDescription className="text-md text-foreground">{progressDescription}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="mx-auto w-4/6 max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Run Workflow</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2 items-end"
            onSubmit={handleSubmit}>
            <div className="w-full space-y-2">
              <Label>CSV File</Label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                accept=".csv"
                ref={csvFileRef}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Workflow Id</Label>
              <Select
                value={flowId}
                onValueChange={setFlowId}>
                <SelectTrigger>
                  <SelectValue placeholder="Flow Id" />
                </SelectTrigger>
                <SelectContent>
                  {workflows.map(workflow => (
                    <SelectItem
                      key={workflow}
                      value={workflow}>
                      {workflow}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-24 mt-2"
              type="submit">
              {isStarted ? (
                <>
                  <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowRun;
