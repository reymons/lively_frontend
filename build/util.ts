import path from "node:path";
import genericNames from "generic-names";

export function getCssClass(name: string, filepath: string, isDev: boolean) {
    const parsed = path.parse(filepath);
    let filename: string;

    if (parsed.name.startsWith("index.")) {
        filename = path.basename(parsed.dir);
    } else if (parsed.name.includes(".module")) {
        filename = parsed.name.slice(0, parsed.name.indexOf(".module"));
    } else {
        filename = parsed.name;
    }

    return genericNames(isDev ? `${filename}__${name}_[hash:base64:5]` : "[hash:base64:5]")(
        name,
        filepath
    );
}
