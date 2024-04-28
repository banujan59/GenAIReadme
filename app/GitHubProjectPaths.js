"use server"
import fs from 'fs';

export default async function ListGitHubProjects() {
    const source = process.env.GENAI_README_GIT_PROJECT_DIRECTORY;
    return fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
  };