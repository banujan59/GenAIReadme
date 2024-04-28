import Form from "./form";
import ListGitHubProjects from "./GitHubProjectPaths"

export default async function Home() {
  const directories = await ListGitHubProjects();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='mainHeader'>Available repositories:</h1>
            <br/>
      <Form directories={directories}/>
    </main>
  );
}
