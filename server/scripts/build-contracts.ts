import { execSync } from 'node:child_process';
import path from 'node:path';

import fs from 'fs-extra';

async function main() {
  const source = path.resolve(__dirname, '..', '..', 'contracts');
  const dest = path.resolve(
    __dirname,
    '..',
    'node_modules',
    '@getkcal',
    'contracts',
  );

  await fs.ensureDir(path.dirname(dest));

  console.info(`Copying ${source} to ${dest}...`);
  await fs.copy(source, dest);
  console.info('Successfully pasted.');

  console.info('Running build for contracts...');
  try {
    execSync('yarn', {
      cwd: dest,
      stdio: 'inherit',
    });

    execSync('yarn build', {
      cwd: dest,
      stdio: 'inherit',
    });

    console.info('Successfully builded.');
  } catch (error) {
    console.error('Fail to compile the contracts:', error);
    process.exit(1);
  }

  console.info('Removing `src` from contracts...');
  const srcPath = path.join(dest, 'src');
  await fs.remove(srcPath);

  console.info(
    'Updating package.json (replacing src/index.ts with dist/src/index.js)',
  );

  const packagePath = path.join(dest, 'package.json');
  const packageJSON = JSON.parse(await fs.readFile(packagePath, 'utf-8'));

  packageJSON.main = 'dist/src/index.js';

  await fs.writeFile(
    packagePath,
    JSON.stringify(packageJSON, null, 2),
    'utf-8',
  );

  console.info('All build progress are successfully finished.');
}

main();
