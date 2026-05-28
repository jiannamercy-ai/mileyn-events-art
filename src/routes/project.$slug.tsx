import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/pages/ProjectDetail";

export const Route = createFileRoute("/project/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} — Mileyn Events` }],
  }),
  component: ProjectRoute,
});

function ProjectRoute() {
  const { slug } = Route.useParams();
  return <ProjectDetail slug={slug} />;
}
