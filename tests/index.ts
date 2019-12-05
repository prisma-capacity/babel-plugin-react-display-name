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
const Hello1: FC = () => null;
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello1 = () => null;

    Hello1.displayName = \\"Hello1\\";"
  `);
});

test('handle "FunctionComponent" type reference', () => {
  const source = `
const Hello2: FunctionComponent = () => null;
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello2 = () => null;

    Hello2.displayName = \\"Hello2\\";"
  `);
});

test('handle "forwardRef" usage', () => {
  const source = `
const Hello3 = forwardRef(() => null);
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello3 = forwardRef(() => null);
    Hello3.displayName = \\"Hello3\\";"
  `);
});

test('handle "memo" usage', () => {
  const source = `
const Hello4 = memo(() => null);
`;

  expect(run(source)).toMatchInlineSnapshot(`
    "\\"use strict\\";

    const Hello4 = memo(() => null);
    Hello4.displayName = \\"Hello4\\";"
  `);
});
