import chalk from 'chalk';

export const log = (...args: any[]) => console.log(chalk.green(...args));
export const warn = (...args: any[]) => console.warn(chalk.yellow(...args));
export const error = (...args: any[]) => console.error(chalk.red(...args));
