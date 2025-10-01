#!/usr/bin/env node

import { Command } from "commander";
import simpleGit from "simple-git";
import { format } from "date-fns";
import path from "path"; // 追加

const program = new Command();

program
  .name("reportgen")
  .description("Generate daily/weekly reports from git logs")
  .option("-r, --repos <paths...>", "Target repositories")
  .option("-p, --period <type>", "daily or weekly", "daily")
  .parse(process.argv);

const options = program.opts();

async function main() {
  if (!options.repos) {
    console.error("Please specify at least one repository with -r");
    process.exit(1);
  }

  const now = new Date();
  const since =
    options.period === "weekly"
      ? format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
      : format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");

  let report = `# 日報 (${options.period})\n\n`;

  for (const repo of options.repos) {
    const git = simpleGit(repo);
    const logs = await git.log({ '--since': since });

    const repoName = path.basename(repo); // ディレクトリ名だけ取得

    report += `## ${repoName}\n`;
    report += `【今日の業務内容(gitログ)】\n`;
    if (logs.all.length === 0) {
      report += `- コミットはありませんでした。\n`;
    } else {
      logs.all.forEach((c) => {
        report += `- ${format(new Date(c.date), "yyyy-MM-dd HH:mm")} | ${c.message}\n  （${c.author_name} | ${c.hash}）\n`;
      });
    }
    report += "\n";
  }

  report += "【明日の予定】\n- \n\n【所感・課題】\n- \n";

  console.log(report);
}

main();
