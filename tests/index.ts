import { transform } from '@babel/core';
import plugin from '../src';

function run(source: string) {
  const { code } = transform(source, {
    filename: 'test.ts',
    plugins: [plugin]
  })!;
  return code;
}

test('handle "FC" type reference', () => {
  const source = `
const Hello: FC = () => null;
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello = () => null;

    Hello.displayName = \\"Hello\\";"
  `);
});

test('handle "FunctionComponent" type reference', () => {
  const source = `
const Hello: FunctionComponent = () => null;
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello = () => null;

    Hello.displayName = \\"Hello\\";"
  `);
});

test('handle "forwardRef" usage', () => {
  const source = `
const Hello = forwardRef(() => null);
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello = forwardRef(() => null);
    Hello.displayName = \\"Hello\\";"
  `);
});

test('handle "memo" usage', () => {
  const source = `
const Hello = memo(() => null);
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello = memo(() => null);
    Hello.displayName = \\"Hello\\";"
  `);
});
