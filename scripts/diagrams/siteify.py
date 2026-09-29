import re, sys
def siteify(svg):
    style = re.search(r"<style>(.*?)</style>", svg, re.S).group(1)
    classes = set(re.findall(r"\.([a-zA-Z][\w-]*)", style)) | {c for m in re.findall(r'class="([^"]+)"', svg) for c in m.split()}
    def pre(m): return "rs-" + m
    # rename classes in style
    new_style = re.sub(r"\.([a-zA-Z][\w-]*)", lambda m: "." + pre(m.group(1)) if m.group(1) in classes else m.group(0), style)
    new_style = new_style.replace("@keyframes flow", "@keyframes rs-flow").replace("flow 1.6s", "rs-flow 1.6s")
    # dark mode: follow the site toggle instead of the OS
    new_style = re.sub(r"@media \(prefers-color-scheme: dark\)\{:root\{([^}]*)\}\}", r"[data-theme='dark']{\1}", new_style)
    assert "prefers-color-scheme" not in new_style
    new_style = new_style.replace(":root{", ":root{", 1)
    new_style = re.sub(r"(?<![\w-])text\{", ":where(.rs-diagram) text{", new_style)
    new_style = new_style.replace("--rs-accent:#CDB8E6", "--rs-accent:#BFA6DC", 1)
    new_style = new_style.replace("@keyframes rs-flow{", "[data-theme='dark'] .rs-pill{fill:#CDB8E6}\n[data-theme='dark'] .rs-pill+.rs-pt{fill:#2B0548}\n@keyframes rs-flow{", 1)
    assert style in svg
    svg = svg.replace(style, new_style)
    svg = re.sub(r"--([a-z][\w-]*)", r"--rs-\1", svg)
    svg = re.sub(r'class="([^"]+)"', lambda m: 'class="' + " ".join(pre(c) for c in m.group(1).split()) + '"', svg)
    svg = svg.replace('<svg xmlns="http://www.w3.org/2000/svg"', '<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram"', 1)
    return svg
for src, dst in [("variant-16-backbone-single-halo.svg", "site/architecture-backbone.svg"), ("reduct-bridge.svg", "site/reduct-bridge.svg")]:
    open(dst, "w").write(siteify(open(src).read()))
print("ok")
