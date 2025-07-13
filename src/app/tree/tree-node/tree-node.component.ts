import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TreeNode } from '../interfaces';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tree-node',
  imports: [NgTemplateOutlet],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent {
  readonly node = input.required<TreeNode>();
  readonly nodeTemplate = input.required<TemplateRef<unknown>>();
  readonly onNodeAction = input<(node: TreeNode) => void>();

  readonly detailsElement =
    viewChild<ElementRef<HTMLDetailsElement>>('detailsElement');
  readonly childComponents = viewChildren(TreeNodeComponent);

  expandAll(): void {
    const details = this.detailsElement();
    if (details) {
      details.nativeElement.open = true;
    }

    setTimeout(() => {
      this.childComponents().forEach((child) => child.expandAll());
    });
  }
}
