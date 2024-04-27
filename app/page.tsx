import Form from "./form";
import fs from 'fs';
import githubProjectPath from "./GitHubProjectPaths"

const getDirectories = (source: string) => {
  return fs.readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
};
const directories = getDirectories(githubProjectPath);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='mainHeader'>Available repositories:</h1>
            <br/>
      <Form directories={directories}/>
    </main>
  );
}
