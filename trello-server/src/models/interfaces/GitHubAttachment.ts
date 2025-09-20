import BaseModel from "./BaseModel";

export type GitHubAttachmentType = "pull_request" | "commit" | "issue" | string;

export default interface IGitHubAttachment extends BaseModel {
  taskId: string;
  repositoryId?: string;
  type?: GitHubAttachmentType;
  number?: string;
  sha?: string;
  title?: string;
  attachedAt?: string;
}
