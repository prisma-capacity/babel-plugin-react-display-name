import babel, { PluginObj, types } from '@babel/core';

function isFunctionComponent(t: typeof types, node: types.Identifier) {
  return (
    t.isTSTypeAnnotation(node.typeAnnotation) &&
    t.isTSTypeReference(node.typeAnnotation.typeAnnotation) &&
    t.isIdentifier(node.typeAnnotation.typeAnnotation.typeName) &&
    (node.typeAnnotation.typeAnnotation.typeName.name === 'FC' ||
      node.typeAnnotation.typeAnnotation.typeName.name === 'FunctionComponent')
  );
}

function isComponentFactory(t: typeof types, node: types.VariableDeclarator) {
  return (
    t.isCallExpression(node.init) &&
    t.isIdentifier(node.init.callee) &&
    (node.init.callee.name === 'forwardRef' || node.init.callee.name === 'memo')
  );
}

export default function({ types: t }: typeof babel): PluginObj {
  return {
    visitor: {
      VariableDeclarator(path) {
        if (!t.isIdentifier(path.node.id)) return;

        if (
          !isFunctionComponent(t, path.node.id) &&
          !isComponentFactory(t, path.node)
        )
          return;

        // add displayName member to the component
        path.parentPath.insertAfter(
          t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.identifier(path.node.id.name),
                t.identifier('displayName')
              ),
              t.stringLiteral(path.node.id.name)
            )
          )
        );
      }
    }
  };
}
