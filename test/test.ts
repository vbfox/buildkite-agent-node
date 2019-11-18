import { annotate } from '../dist';

async function run() {
    await annotate('Hello **World**', {
        style: 'info',
        context: 'First annotation'
    });
    await annotate('Hello **World**', {
        style: 'success',
        context: 'Second annotation'
    });
}

run();