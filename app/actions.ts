"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import githubProjectPath from "./GitHubProjectPaths";
import { exec } from "child_process";
import path from 'path';

 function ValidateDates(startDate : string, endDate : string) 
 {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end > start) 
    return true;
    else 
    return false;
}

function ExecuteCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }

export async function createCommitList(
    prevState: {
      message: string;
    },
    formData: FormData,
  ) {
    const schema = z.object({
        startDate: z.string().min(1),
        endDate: z.string().min(1),
        project: z.string().min(1)
    });
    const parse = schema.safeParse({
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        project: formData.get("project"),
    });
  
    if (!parse.success || !ValidateDates(parse.data.startDate, parse.data.endDate)) 
    {
      return { message: "Make sure the dates ranges are valid !" };
    }
  
    const data = parse.data;

    // change directory to the GitHub repository
    const projectPath = path.join(githubProjectPath, data.project)
    let cmd = 'cd "' + projectPath + '"'
    await ExecuteCommand(cmd);

    // get information about the Git commits
    cmd = 'git log --pretty=format:"%h - %s - %b" --since="' + data.startDate + '" --until="' + data.endDate + '"'
    const commandOutput = await ExecuteCommand(cmd);
    console.log(commandOutput)

    revalidatePath("/");
    return { message: `${commandOutput}` };
  }