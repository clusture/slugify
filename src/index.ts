import readline from 'readline';
import chalk from 'chalk';

import getSlug from './common/get-slug';
import { warn } from './common/logger';

const getTitle = async () => {
      // Ref: https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // rl.on('close', () => {});
    const ans = await new Promise<string>(resolve => {
      const msg = chalk.green(`title: `);
      rl.question(msg, (inp: string) => {
        resolve(inp);
        rl.close();
      });
    });
    return ans;
};

(async () => {
  // const title = process.argv[2];
  const title = await getTitle();
  const slug = getSlug(title);
  warn(' slug:', slug);
  console.log();
})();
