import { createClient, type SanityClient } from "@sanity/client";

export function createSanityReadClient(): SanityClient {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
  const apiVersion =
    import.meta.env.PUBLIC_SANITY_API_VERSION || "2024-01-01";
  const token = import.meta.env.SANITY_API_TOKEN;

  if (!projectId || !dataset) {
    throw new Error(
      "Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET (see .env.example)"
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,
  });
}
