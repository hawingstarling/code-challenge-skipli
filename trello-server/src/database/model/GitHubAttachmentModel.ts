import { Collection, IEntity } from "fireorm";


export const GitHubAttachmentModelName = "gitHubattachment";

export type GitHubAttachmentType = "pull_request" | "commit" | "issue" | string;

@Collection(GitHubAttachmentModelName)
export default class GitHubAttachment implements IEntity {
  id!: string;
  taskId!: string;
  repositoryId?: string;
  type?: GitHubAttachmentType;
  number?: string;
  sha?: string; 
  title?: string;
  attachedAt?: string;
}