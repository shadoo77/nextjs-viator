import { Product } from '@/types/products';
import { Tag } from '@/types/tags';

const repeated_likely_to_sell_out = 20757;

export type TreeViewData = {
  tagId: Tag['tagId'];
  allNamesByLocale: Tag['allNamesByLocale'];
  children?: TreeViewData[];
};

// merge trees with the same tagId
// function mergeTrees(trees: TreeViewData[]): TreeViewData[] {
//   const map = new Map<string, TreeViewData>();

//   function addNode(node: TreeViewData) {
//     const existingNode = map.get(node.tagId.toString());
//     if (existingNode) {
//       existingNode.children = mergeTrees((existingNode.children || []).concat(node.children || []));
//     } else {
//       map.set(node.tagId.toString(), {
//         ...node,
//         children: node.children ? mergeTrees(node.children) : undefined
//       });
//     }
//   }

//   trees.forEach(addNode);

//   return Array.from(map.values());
// }

// build list of trees from a tagId
function buildTreeList(tagId: Tag['tagId'], tags: Tag[]): TreeViewData | undefined {
  const tag = tags.find((tag) => tag.tagId === tagId) as Tag;
  if (!tag) return undefined;

  const topChildren = tags.filter(
    (tag) => tag.parentTagIds?.includes(tagId) && tag.parentTagIds?.[0] === tagId
  );

  if (topChildren.length === 0) {
    return {
      tagId: tag.tagId,
      allNamesByLocale: tag.allNamesByLocale
    };
  }

  return {
    tagId,
    allNamesByLocale: tag.allNamesByLocale,
    children: topChildren
      .map((child) => buildTreeList(child.tagId, tags))
      .filter(Boolean) as TreeViewData[]
  };
}

// get top tag from a tag
const getTopTag = (tag: Tag, tags: Tag[]): Tag => {
  if (!tag.parentTagIds) {
    return tag;
  }
  const parentTagId = tag.parentTagIds[tag.parentTagIds.length - 1];
  const parentTag = tags.find((tag) => tag.tagId === parentTagId);
  if (!parentTag) {
    return tag;
  }
  return getTopTag(parentTag, tags);
};

// get list of trees from products
export const getTagsListTrees = (products: Product[], tags: Tag[]) => {
  const productsTagIds = [...new Set(products.flatMap((product) => product.tags))];
  const productTags = productsTagIds
    .map((tagId) => tags.find((tag) => tag.tagId === tagId))
    .filter((tag) => tag) as Tag[];
  const mainTags = [...new Set(productTags.map((tag) => getTopTag(tag, tags).tagId))];
  return (
    mainTags
      // remove likely to sell out tag because it's repeated
      .filter((tagId) => tagId !== repeated_likely_to_sell_out)
      .map((tagId) => buildTreeList(tagId, tags))
      .filter(Boolean) as TreeViewData[]
  );
};
// get path from a tree
export const findPath = (tree: TreeViewData[], targetId: number): string[] => {
  for (const node of tree) {
    if (node.tagId === targetId) {
      return [node.tagId.toString()];
    }
    const path = findPath(node.children || [], targetId);
    if (path.length > 0) {
      return [node.tagId.toString(), ...path];
    }
  }
  return [];
};
