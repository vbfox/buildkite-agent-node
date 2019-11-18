import { annotate } from '../dist';

async function run() {
    await annotate('Hello **World**', {
        style: 'info'
    });
    await annotate('Hello **World**', {
        style: 'success'
    });
}

run();