import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Type definitions for table data
type StreamType = "UP" | "CE";
type Status = "Completed" | "In Progress" | "Not Started";

type StreamTypeStyles = {
  [key in StreamType]: {
    bg: string;
    text: string;
    border: string;
  };
};

type StatusStyles = {
  [key in Status]: {
    bg: string;
    text: string;
    border: string;
  };
};

interface Stream {
  id: string;
  name: string;
  type: StreamType;
  description: string;
  status: Status;
}

interface StreamGroup {
  id: string;
  name: string;
  streams: Stream[];
}

// Stream type styling
const streamTypeStyles: StreamTypeStyles = {
  UP: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  CE: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
  },
};

// Status styling
const statusStyles: StatusStyles = {
  Completed: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/20",
  },
  "In Progress": {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    border: "border-yellow-500/20",
  },
  "Not Started": {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/20",
  },
};

// JAMNP streams data
const jamnpStreams: StreamGroup[] = [
  {
    id: "unique-persistent",
    name: "Unique Persistent Streams",
    streams: [
      {
        id: "0",
        name: "Block Announcement",
        type: "UP",
        description:
          "Opened between nodes when either both are validators (and neighbors in the grid) or at least one is not a validator. Used for announcing new blocks between nodes.",
        status: "Completed",
      },
    ],
  },
  {
    id: "common-ephemeral",
    name: "Common Ephemeral Streams",
    streams: [
      {
        id: "128",
        name: "Block Request",
        type: "CE",
        description: "Used for requesting blocks from other nodes.",
        status: "Completed",
      },
      {
        id: "129",
        name: "State Request",
        type: "CE",
        description:
          "Used to request state data for specific blocks or state components.",
        status: "Completed",
      },
      {
        id: "131",
        name: "Safrole ticket distribution (first step)",
        type: "CE",
        description:
          "Used to request safrole ticket distribution from other nodes.",
        status: "Completed",
      },
      {
        id: "132",
        name: "Safrole ticket distribution (second step)",
        type: "CE",
        description:
          "Used to request safrole ticket distribution from other nodes.",
        status: "Completed",
      },
      {
        id: "133",
        name: "Work-Package Submission",
        type: "CE",
        description:
          "Used by builders to submit work packages to guarantors. Should be accepted on all connections regardless of how they were opened.",
        status: "In Progress",
      },
      {
        id: "134",
        name: "Work package sharing",
        type: "CE",
        description: "Used to share work packages with other nodes.",
        status: "Not Started",
      },
      {
        id: "135",
        name: "Work report distribution",
        type: "CE",
        description: "Used to distribute work reports to other nodes.",
        status: "Not Started",
      },
      {
        id: "136",
        name: "Work report request",
        type: "CE",
        description: "Used to request work reports from other nodes.",
        status: "Completed",
      },
      {
        id: "137",
        name: "Shard distribution",
        type: "CE",
        description: "Used to distribute shards to other nodes.",
        status: "Not Started",
      },
      {
        id: "138",
        name: "Audit shard request",
        type: "CE",
        description: "Used to request audit shards from other nodes.",
        status: "Not Started",
      },
      {
        id: "139",
        name: "Segment shard request",
        type: "CE",
        description: "Used to request segment shards from other nodes.",
        status: "Not Started",
      },
      {
        id: "140",
        name: "Segment shard request (with justification)",
        type: "CE",
        description:
          "Used to request segment shards from other nodes with justification.",
        status: "Not Started",
      },
      {
        id: "141",
        name: "Shard Distribution",
        type: "CE",
        description: "Used to distribute shards to other nodes.",
        status: "Completed",
      },
      {
        id: "142",
        name: "Preimage Announcement",
        type: "CE",
        description: "Used to announce preimages to other nodes.",
        status: "Completed",
      },
      {
        id: "143",
        name: "Preimage Request",
        type: "CE",
        description: "Used to request preimages from other nodes.",
        status: "Completed",
      },
      {
        id: "144",
        name: "Audit Announcement",
        type: "CE",
        description: "Used to announce audit data to other nodes.",
        status: "Not Started",
      },
      {
        id: "145",
        name: "Judgement Publication",
        type: "CE",
        description: "Used to publish judgements to other nodes.",
        status: "Not Started",
      },
    ],
  },
];

export default function JamnpStreams() {
  return (
    <main className="flex flex-col p-4 sm:p-6 md:p-8">
      <section className="mx-auto w-full max-w-[1200px]">
        <h1 className="mb-4 text-2xl font-bold tracking-tighter sm:text-3xl">
          Status of JAM Network Protocol Streams
        </h1>
        <p className="mb-6 text-sm text-muted-foreground sm:text-base">
          Current implementation progress of the JAM Network Protocol.
        </p>

        <div className="overflow-auto rounded-lg border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Stream Group
                </TableHead>
                <TableHead className="whitespace-nowrap">Stream ID</TableHead>
                <TableHead className="whitespace-nowrap">Stream Name</TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jamnpStreams.map((group) =>
                group.streams.map((stream, streamIndex) => (
                  <TableRow key={`${group.id}-${streamIndex}`}>
                    {streamIndex === 0 ? (
                      <TableCell
                        className="whitespace-nowrap font-medium"
                        rowSpan={group.streams.length}
                      >
                        {group.name}
                      </TableCell>
                    ) : null}
                    <TableCell className="whitespace-nowrap">
                      {stream.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {stream.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${streamTypeStyles[stream.type].bg} ${
                          streamTypeStyles[stream.type].text
                        } ${streamTypeStyles[stream.type].border}`}
                      >
                        {stream.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusStyles[stream.status].bg} ${
                          statusStyles[stream.status].text
                        } ${statusStyles[stream.status].border}`}
                      >
                        {stream.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {stream.description}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
