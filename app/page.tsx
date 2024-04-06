import DirectoryList from './DirectoryList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='mainHeader'>Available repositories:</h1>
            <br/>
      <DirectoryList />
    </main>
  );
}
