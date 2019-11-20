import { annotate, } from '../dist';

const testMsg = `# Build report

## Test of formatting

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

\`\`\`term
\x1b[31mFailure/Error:\x1b[0m \x1b[32mexpect\x1b[0m(new_item.created_at).to eql(now)

\x1b[31m  expected: 2018-06-20 19:42:26.290538462 +0000\x1b[0m
\x1b[31m       got: 2018-06-20 19:42:26.290538000 +0000\x1b[0m

\x1b[31m  (compared using eql?)\x1b[0m
\`\`\`
`;

async function run() {
    await annotate('Hello **World**', {
        style: 'info',
        context: 'First annotation'
    });
    await annotate(testMsg, {
        style: 'success',
        context: 'Second annotation'
    });
}

run();