export type TreeNode = {
    id: number;
    title: string;
    is_deleted: boolean;
    children: TreeNode[];
}