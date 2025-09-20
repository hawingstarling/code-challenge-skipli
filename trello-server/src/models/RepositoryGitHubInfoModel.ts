import { GitHubBranch } from "./interfaces/GitHubBranch";
import { GitHubCommit } from "./interfaces/GitHubCommit";
import { GitHubIssue } from "./interfaces/GitHubIssue";
import { GitHubPull } from "./interfaces/GitHubPull";

export interface RepositoryGitHubInfo {
  repositoryId: string;
  branches: GitHubBranch[];
  pulls: GitHubPull[];
  issues: GitHubIssue[];
  commits: GitHubCommit[];
}