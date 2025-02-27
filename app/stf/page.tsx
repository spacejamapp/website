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
type Status = "Completed" | "In Progress" | "Not Started";

type StatusStyles = {
  [key in Status]: {
    bg: string;
    text: string;
    border: string;
  };
};

interface Vector {
  name: string;
  status: Status;
  description: string;
}

interface Section {
  id: number | string;
  name: string;
  vectors: Vector[];
}

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

// STF vectors data
const stfVectors: Section[] = [
  {
    id: 6,
    name: "Block Production and Chain Growth",
    vectors: [
      {
        name: "Block Production and Chain Growth",
        status: "Completed",
        description:
          "Implementation of block production mechanisms and chain growth protocols",
      },
    ],
  },
  {
    id: 7,
    name: "Recent Blocks History",
    vectors: [
      {
        name: "Recent Blocks History",
        status: "Completed",
        description: "Tracking and managing recent block history",
      },
    ],
  },
  {
    id: 8,
    name: "Authorization",
    vectors: [
      {
        name: "Authorization",
        status: "Completed",
        description: "Implementation of authorization mechanisms",
      },
    ],
  },
  {
    id: 10,
    name: "Disputes, Verdicts and Judgements",
    vectors: [
      {
        name: "Disputes, Verdicts and Judgements",
        status: "Completed",
        description:
          "Handling of disputes, verdicts, and judgements in the network",
      },
    ],
  },
  {
    id: 11,
    name: "Reporting and Assurances",
    vectors: [
      {
        name: "Reporting",
        status: "Completed",
        description: "Implementation of reporting mechanisms",
      },
      {
        name: "Assurances",
        status: "Completed",
        description: "Implementation of assurance mechanisms",
      },
    ],
  },
  {
    id: 12,
    name: "Accumulation and Preimages",
    vectors: [
      {
        name: "Accumulation",
        status: "Not Started",
        description: "Implementation of accumulation mechanisms",
      },
      {
        name: "Preimages",
        status: "Completed",
        description: "Management of preimages in the system",
      },
    ],
  },
  {
    id: 13,
    name: "Activity Statistics",
    vectors: [
      {
        name: "Activity Statistics",
        status: "Completed",
        description: "Collection and analysis of activity statistics",
      },
    ],
  },
  {
    id: "Others",
    name: "Others",
    vectors: [
      {
        name: "PVM",
        status: "In Progress",
        description:
          "Need to update the instructions, need to implement the compiler version.",
      },
      {
        name: "Erasure coding",
        status: "In Progress",
        description: "Need to complete the implementation",
      },
      {
        name: "Fisher-Yates Shuffle",
        status: "Completed",
        description: "Mainly Eq 331 for calculating the entropy",
      },
    ],
  },
];

export default function Milestones() {
  return (
    <main className="flex h-page flex-col p-4 sm:p-6 md:p-8">
      <section className="mx-auto w-full max-w-[1200px]">
        <h1 className="mb-4 text-2xl font-bold tracking-tighter sm:text-3xl">
          Status of STF Test Vectors
        </h1>
        <p className="mb-6 text-sm text-muted-foreground sm:text-base">
          Current implementation progress of the State Transition Function
          vectors.
        </p>

        <div className="overflow-auto rounded-lg border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Section</TableHead>
                <TableHead className="whitespace-nowrap">
                  Test Vectors
                </TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stfVectors.map((section) =>
                section.vectors.map((vector, vectorIndex) => (
                  <TableRow key={`${section.id}-${vectorIndex}`}>
                    {vectorIndex === 0 ? (
                      <TableCell
                        className="whitespace-nowrap font-medium"
                        rowSpan={section.vectors.length}
                      >
                        {section.id === "Others"
                          ? "Others"
                          : `Section ${section.id}`}
                      </TableCell>
                    ) : null}
                    <TableCell className="whitespace-nowrap">
                      {vector.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusStyles[vector.status].bg} ${
                          statusStyles[vector.status].text
                        } ${statusStyles[vector.status].border}`}
                      >
                        {vector.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {vector.description}
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
