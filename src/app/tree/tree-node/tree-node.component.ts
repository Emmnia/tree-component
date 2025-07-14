import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  TemplateRef,
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

  readonly childComponents = viewChildren(TreeNodeComponent);

  readonly isExpanded = signal(false);
  private readonly expandRecursively = signal(false);

  readonly areAllChildrenExpanded = computed<boolean>((): boolean => {
    if (!this.isExpanded()) {
      return false;
    }

    return this.childComponents().every((child) =>
      child.areAllChildrenExpanded(),
    );
  });

  constructor() {
    effect(() => {
      if (this.isExpanded() && this.expandRecursively()) {
        this.childComponents().forEach((child) => child.expandAll());

        this.expandRecursively.set(false);
      }
    });
  }

  expandAll(): void {
    this.expandRecursively.set(true);
    this.isExpanded.set(true);
  }

  onToggle(event: Event): void {
    const detailsElement = event.target as HTMLDetailsElement;

    if (this.isExpanded() !== detailsElement.open) {
      this.isExpanded.set(detailsElement.open);
    }
  }
}
