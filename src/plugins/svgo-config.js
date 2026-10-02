import presetDefault from "svgo/plugins/preset-default.js";

// Diagrams generated with a root class="rs-diagram" rely on their <style> block
// for dark mode and prefers-reduced-motion. SVGO's inlineStyles would move
// rules into style attributes that those overrides cannot beat.
function isRsDiagram(ast) {
  const root = ast.children.find(
    (node) => node.type === "element" && node.name === "svg",
  );
  return (root?.attributes.class ?? "").split(/\s+/).includes("rs-diagram");
}

export const svgoConfig = {
  plugins: [
    {
      name: "preset-default",
      fn: (ast, params, info) =>
        presetDefault.fn(
          ast,
          {
            overrides: {
              removeTitle: false,
              removeViewBox: false,
              ...(isRsDiagram(ast)
                ? { inlineStyles: false, cleanupIds: false }
                : {}),
            },
          },
          info,
        ),
    },
  ],
};
