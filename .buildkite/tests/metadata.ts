import { getMetadata, setMetadata, getMetadataKeys } from "../../dist";

function assert(value: boolean, msg: string) {
    if (!value) {
        throw new Error(`Assertion failed: ${msg}`);
    }
}

async function run() {
    const doesNotExistsValue = await getMetadata('does-not-exists');
    assert(doesNotExistsValue === undefined, 'unknown metadata is undefined');
    
    setMetadata('my-metadata', 'foo bar');
    const myMetadataValue = await getMetadata('my-metadata');
    assert(myMetadataValue === 'foo bar', 'set+get should return the correct value');
    
    const keys = await getMetadataKeys();
    console.log('keys', keys);
    const myMetadata = keys.indexOf('my-metadata')
    assert(myMetadata !== undefined, 'my-metadata should be in the keys');
}

run();
