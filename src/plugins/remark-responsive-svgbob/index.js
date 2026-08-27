/**
 * @typedef {object} MarkdownNode
 * @property {string} type
 * @property {string | null} [name]
 * @property {Array<{type: string, name?: string, value?: unknown}>} [attributes]
 * @property {MarkdownNode[]} [children]
 */

module.exports = function remarkResponsiveSVGBob() {
  /** @param {MarkdownNode} tree */
  return (tree) => {
    /** @param {MarkdownNode} node */
    function visit(node) {
      if (
        node.type === "mdxJsxFlowElement" &&
        node.name === "svg" &&
        Array.isArray(node.attributes)
      ) {
        const attributes = node.attributes;
        const className = attributes.find(
          (attribute) =>
            attribute.type === "mdxJsxAttribute" &&
            attribute.name === "className",
        );

        if (
          typeof className?.value === "string" &&
          className.value.split(/\s+/).includes("svgbob")
        ) {
          const width = attributes.find(
            (attribute) =>
              attribute.type === "mdxJsxAttribute" &&
              attribute.name === "width",
          )?.value;
          const height = attributes.find(
            (attribute) =>
              attribute.type === "mdxJsxAttribute" &&
              attribute.name === "height",
          )?.value;
          const dimensionPattern = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

          if (
            typeof width === "string" &&
            typeof height === "string" &&
            dimensionPattern.test(width) &&
            dimensionPattern.test(height) &&
            Number(width) > 0 &&
            Number(height) > 0
          ) {
            if (!attributes.some((attribute) => attribute.name === "viewBox")) {
              attributes.push({
                type: "mdxJsxAttribute",
                name: "viewBox",
                value: `0 0 ${width} ${height}`,
              });
            }

            if (
              !attributes.some(
                (attribute) => attribute.name === "preserveAspectRatio",
              )
            ) {
              attributes.push({
                type: "mdxJsxAttribute",
                name: "preserveAspectRatio",
                value: "xMidYMid meet",
              });
            }
          }
        }
      }

      node.children?.forEach(visit);
    }

    visit(tree);
  };
};
