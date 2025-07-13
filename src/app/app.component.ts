import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TreeNode } from './tree/interfaces';
import { TreeComponent } from './tree/tree.component';
import DATA from './data.json';

@Component({
  selector: 'app-root',
  imports: [TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly treeNodes = signal<TreeNode[]>(DATA);

  handleFirstTreeAction = (node: TreeNode): void => {
    console.log(`Нажали на узел ID ${node.id}`);
  }
}
