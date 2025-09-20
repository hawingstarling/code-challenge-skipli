import { GitHubBranch } from "./GitHubBranchModel";
import { GitHubCommit } from "./GitHubCommitModel";
import { GitHubIssue } from "./GitHubIssueModel";
import { GitHubPull } from "./GitHubPullModel";

export interface RepositoryGitHubInfo {
  repositoryId: string;
  branches: GitHubBranch[];
  pulls: GitHubPull[];
  issues: GitHubIssue[];
  commits: GitHubCommit[];
}