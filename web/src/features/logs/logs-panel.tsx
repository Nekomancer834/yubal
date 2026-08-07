import type { Job } from "@/api/jobs";
import { EmptyState } from "@/components/common/empty-state";
import { Panel, PanelContent, PanelHeader } from "@/components/common/panel";
import { isActive } from "@/lib/job-status";
import { Chip, Spinner } from "@heroui/react";
import { CloudOffIcon, TerminalIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { LogLine } from "./log-line";
import { useLogs } from "./use-logs";

type Props = {
  jobs?: Job[];
};

export function LogsPanel({ jobs = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lines, isOffline } = useLogs();

  const hasActiveJobs = jobs.some((job) => isActive(job.status));

  // Auto-scroll to bottom when new lines arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Panel>
      <PanelHeader
        leadingIcon={<TerminalIcon size={18} />}
        badge={
          isOffline ? (
            <Chip size="sm" color="warning" variant="soft">
              <CloudOffIcon size={16} />
              <Chip.Label>offline</Chip.Label>
            </Chip>
          ) : hasActiveJobs ? (
            <span className="flex items-center">
              <Spinner size="sm" color="accent" className="align-middle" />
            </span>
          ) : null
        }
      >
        logs
      </PanelHeader>
      <PanelContent
        ref={containerRef}
        height="h-70"
        className="logs-container space-y-0.5 font-mono text-xs"
      >
        {lines.length === 0 ? (
          <EmptyState icon={TerminalIcon} title="No activity yet" mono />
        ) : (
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <LogLine entry={line.entry} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </PanelContent>
    </Panel>
  );
}
