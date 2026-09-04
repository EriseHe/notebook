const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const pluginPath = path.join(__dirname, 'main.js');
const source = fs.readFileSync(pluginPath, 'utf8').replace(
    'module.exports = NumberHeadingsPlugin;',
    'module.exports = { updateHeadingNumbering };'
);

class EmptyClass {}
const obsidianMock = {
    MarkdownView: EmptyClass,
    Modal: EmptyClass,
    PluginSettingTab: EmptyClass,
    Plugin: EmptyClass,
    Setting: EmptyClass,
    Notice: EmptyClass,
    parseFrontMatterEntry: () => undefined
};
const sandbox = {
    module: { exports: {} },
    exports: {},
    require: id => id === 'obsidian' ? obsidianMock : require(id),
    console,
    setTimeout,
    clearTimeout,
    window: { setInterval: () => 0 }
};
vm.runInNewContext(source, sandbox, { filename: pluginPath });
const { updateHeadingNumbering } = sandbox.module.exports;

const settings = {
    skipTopLevel: false,
    firstLevel: 1,
    maxLevel: 6,
    styleLevel1: '1',
    styleLevelOther: '1',
    separator: '',
    skipHeadings: '',
    startAt: '',
    normalizeHeadingLevels: true,
    inheritFilenameNumber: true
};

function numberDocument(basename, markdownLines) {
    const lines = markdownLines.slice();
    const headings = lines.flatMap((line, lineNumber) => {
        const match = line.match(/^\s{0,4}(#+)\s+(.*)$/);
        if (!match)
            return [];
        return [{
            heading: match[2],
            level: match[1].length,
            position: { start: { line: lineNumber } }
        }];
    });
    const editor = {
        getLine: line => lines[line],
        getRange: (from, to) => lines[from.line].slice(from.ch, to.ch),
        transaction: ({ changes }) => {
            for (const change of changes) {
                const line = lines[change.from.line];
                lines[change.from.line] = line.slice(0, change.from.ch)
                    + change.text
                    + line.slice(change.to.ch);
            }
        }
    };
    updateHeadingNumbering({
        activeView: { file: { basename } },
        data: { headings },
        editor
    }, settings);
    return lines;
}

assert.deepEqual(
    numberDocument('Heat Equation', [
        '## Overview',
        '### Characteristics',
        '## Examples'
    ]),
    [
        '## 1 Overview',
        '### 1.1 Characteristics',
        '## 2 Examples'
    ]
);

assert.deepEqual(
    numberDocument('3. Heat Equation', [
        '## Overview',
        '### Characteristics',
        '## Examples'
    ]),
    [
        '## 3.1 Overview',
        '### 3.1.1 Characteristics',
        '## 3.2 Examples'
    ]
);

assert.deepEqual(
    numberDocument('3.2. Heat Equation', [
        '# Overview',
        '## Characteristics'
    ]),
    [
        '# 3.2.1 Overview',
        '## 3.2.1.1 Characteristics'
    ]
);

assert.deepEqual(
    numberDocument('Heat Equation', [
        '## 0.1 Overview',
        '### 0.1.1 Characteristics'
    ]),
    [
        '## 1 Overview',
        '### 1.1 Characteristics'
    ]
);

assert.deepEqual(
    numberDocument('3. Heat Equation', [
        '### Orphaned introductory subheading',
        '## First top-level section'
    ]),
    [
        '### 3.1.1 Orphaned introductory subheading',
        '## 3.2 First top-level section'
    ]
);

const numberedOnce = numberDocument('3. Heat Equation', [
    '## Overview',
    '### Characteristics'
]);
assert.deepEqual(numberDocument('3. Heat Equation', numberedOnce), numberedOnce);

console.log('Number Headings local behavior: all tests passed.');
