import React from 'react';
import fs from 'fs';

export default function DirectoryList()
{
    const directoryPath = "INSERT_DIR_HERE"

    const getDirectories = (source) => {
        return fs.readdirSync(source, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
    };
    const directories = getDirectories(directoryPath);

    return (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {directories.map((dirName) => (
            <span
            className="directoryBox group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {dirName}
            </h2>
            </span>
        ))}
      </div>
    );
}
