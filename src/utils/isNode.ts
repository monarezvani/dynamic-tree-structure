import { Leaf, Node } from "features/types";

export function isNode(node: Node | Leaf): node is Node {
    return (node as Node).children !== undefined;
}
