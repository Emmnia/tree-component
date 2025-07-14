import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';
import { TreeNode } from './interfaces';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'app-tree',
  imports: [TreeNodeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  readonly nodes = input.required<TreeNode[]>();
  readonly nodeTemplate = input.required<TemplateRef<unknown>>();
  readonly onNodeAction = input<(node: TreeNode) => void>();
}
