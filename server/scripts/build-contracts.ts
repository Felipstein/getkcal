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

  console.info('All build progress are successfully finished.');
}

main();
