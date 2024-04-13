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

function ExecuteCommand(command : string) : string {
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
    // #DBQ# will be replace by double quotes later when reating the JSON
    const prettyFormatOutput = '{#DBQ#id#DBQ#: #DBQ#%h#DBQ#, #DBQ#title#DBQ# : #DBQ#%s#DBQ#, #DBQ#description#DBQ# : #DBQ#%b#DBQ#},';
    cmd = 'git log --pretty=format:"' + prettyFormatOutput + '" --since="' + data.startDate + '" --until="' + data.endDate + '"'
    let commandOutput = await ExecuteCommand(cmd);

    // replace all double quotes found in description or commit titles
    commandOutput = commandOutput.replace(/"/g, "'");
    commandOutput = commandOutput.replace(/\n|\t|\r|\*/g, '');
    commandOutput = commandOutput.substring(0, commandOutput.length - 1); // remove last comma from the pretty output

    // Prepare JSON string
    commandOutput = commandOutput.replace(/#DBQ#/g, '"');
    const jsonStr = '{"commits":  [' + commandOutput + ']}'

    revalidatePath("/");
    return { message: `${jsonStr}` };
  }