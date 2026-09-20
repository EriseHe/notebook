import path from 'node:path';
import { watch } from 'node:fs';
import { parseArgs } from 'node:util';
import { build, repoRoot } from './build.mjs';
import { startServer } from './server.mjs';

async function main() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      'content-root': { type: 'string' },
      'base-path': { type: 'string' },
      port: { type: 'string', default: '4173' },
      'no-watch': { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
    },
  });
  const command = positionals[0] || 'build';
  if (values.help) {
    console.log(
      'npm run build | npm run preview -- [--content-root PATH] [--base-path /notebook/] [--port 4173] [--no-watch]\nOutput: .quiet-reader/dist. Content is read-only. No deployment is performed.',
    );
    return;
  }
  if (!['build', 'preview'].includes(command) || positionals.length > 1)
    throw new Error('Use build or preview.');
  const options = {
    contentRoot: values['content-root'],
    basePath: values['base-path'],
    onProgress: console.log,
  };
  const result = await build(options);
  if (command === 'build') return;
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error('Port must be between 0 and 65535.');
  const preview = await startServer({ ...result, port });
  console.log(`Preview: ${preview.url}`);
  if (values['no-watch']) return;
  console.log(
    `Watching ${result.context.contentRoot} (read-only). Save a note, then refresh the page after rebuild.`,
  );
  let running = false,
    pending = false,
    timer;
  async function rebuild() {
    if (running) {
      pending = true;
      return;
    }
    running = true;
    do {
      pending = false;
      try {
        await build(options);
      } catch (error) {
        console.error(error.message);
      }
    } while (pending);
    running = false;
  }
  const roots = [result.context.contentRoot, path.join(repoRoot, 'site'), path.join(repoRoot, 'filters')];
  const watchers = roots.map((root) =>
    watch(root, { recursive: true }, (_, filename) => {
      if (
        !filename ||
        String(filename)
          .split(/[\\/]/)
          .some((part) => part.startsWith('.'))
      )
        return;
      clearTimeout(timer);
      timer = setTimeout(rebuild, 500);
    }),
  );
  const close = () => {
    clearTimeout(timer);
    for (const watcher of watchers) watcher.close();
    preview.server.close();
  };
  process.once('SIGINT', close);
  process.once('SIGTERM', close);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
