import { getMetadata, setMetadata, getMetadataKeys } from "../../src";

test('getMetadata return undefined when not existing', async () => {
    const doesNotExistsValue = await getMetadata('does-not-exists');
    expect(doesNotExistsValue).toBeUndefined();
});

test('get and set metadata work', async () => {
    setMetadata('my-metadata', 'foo bar');
    const myMetadataValue = await getMetadata('my-metadata');
    expect(myMetadataValue).toEqual('foo bar');
});

test('getMetadataKeys to return a previously set value', async () => {
    setMetadata('my-metadata-2', 'foo bar');
    const keys = await getMetadataKeys();
    expect(keys).toContain('my-metadata-2');
});
