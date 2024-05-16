import { Workshop } from "@/modules/domain/Workshop/Entity";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import Dagre from "@dagrejs/dagre";
import { Node as RFNode, Edge as RFEdge } from "reactflow";

export type Node = RFNode<Workshop>;
export type Edge = RFEdge;

const graphOptions = {
  nodesep: 250,
  ranksep: 200,
};

const nodeOptions = {
  width: 320,
};

export function useGraph(initialWorkshops: Workshop[]) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    (async () => {
      setIsPending(true);
      const graph = await buildGraph(initialWorkshops);
      setNodes(graph.nodes);
      setEdges(graph.edges);
      setWorkshops(graph.workshops);
      setIsPending(false);
    })();
  }, [initialWorkshops]);

  return {
    isPending,
    nodes,
    edges,
    workshops,
  };
}

function Graph() {
  return new Dagre.graphlib.Graph()
    .setDefaultEdgeLabel(() => ({}))
    .setDefaultNodeLabel(() => nodeOptions)
    .setGraph(graphOptions);
}

async function buildGraph(initialWorkshops: Workshop[]) {
  const workshops = await fetchWorkshops(initialWorkshops);
  const g = Graph();
  for (const workshop of workshops) {
    g.setNode(workshop.id.toString(), {});
    for (const dependentId of workshop.workshopsDependentOn) {
      g.setEdge(dependentId.toString(), workshop.id.toString());
    }
  }

  const g2 = transitiveReduction(g);
  Dagre.layout(g2);

  return {
    nodes: workshops.map((workshop) => {
      const node = g2.node(workshop.id.toString());
      return {
        id: workshop.id.toString(),
        type: "workshop",
        position: {
          x: node.x,
          y: node.y,
        },
        width: node.width,
        height: node.height,
        data: workshop,
      };
    }),
    edges: g2.edges().map((x, idx) => ({
      id: idx.toString(),
      type: "simplebezier",
      source: x.v,
      target: x.w,
    })),
    workshops,
  };
}

function transitiveReduction(g: Dagre.graphlib.Graph) {
  const T = Dagre.graphlib.alg.topsort(g);
  const vertex2t = new Map<string, number>(T.map((x, idx) => [x, idx]));

  const g2 = Graph();
  for (const id of g.nodes()) {
    g2.setNode(id, g.node(id));
  }
  const mark = new Map<number, boolean>();
  for (let i = 1; i < T.length; i++) {
    for (let j = 0; j < i; j++) {
      mark.set(j, false);
    }

    for (let j = i - 1; j >= 0; j--) {
      if (g.hasEdge(T[j], T[i]) && !mark.get(j)) {
        g2.setEdge(T[j], T[i]);
        mark.set(j, true);
      }

      if (mark.get(j)) {
        for (const edge of g2.inEdges(T[j]) ?? []) {
          const u = edge.v;
          mark.set(vertex2t.get(u)!, true);
        }
      }
    }
  }

  return g2;
}

async function fetchWorkshops(initialWorkshops: Workshop[]) {
  const workshops = [...initialWorkshops];
  const idMap = new Map<string, boolean>();
  const queue: WorkshopId[] = [];
  for (const workshop of workshops) {
    idMap.set(workshop.id.toString(), true);
    for (const dependentId of workshop.workshopsDependentOn) {
      queue.push(dependentId);
    }
  }
  while (queue.length > 0) {
    const id = queue.shift() as WorkshopId;
    if (idMap.get(id.toString())) {
      continue;
    }
    const workshop = await api.v.workshop.findById.query({
      id: id.toString(),
    });
    if (workshop == null) {
      throw new Error("Workshop not found");
    }
    workshops.push(workshop);
    idMap.set(id.toString(), true);
    for (const dependentId of workshop.workshopsDependentOn) {
      queue.push(dependentId);
    }
  }
  return workshops;
}
