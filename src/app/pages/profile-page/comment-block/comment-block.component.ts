import { Component, Input } from '@angular/core';
import { IComment } from '../../../interfaces/post.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comment-block',
  imports: [NgFor],
  templateUrl: './comment-block.component.html',
  styleUrl: './comment-block.component.scss',
})
export class CommentBlockComponent {
  @Input() comments!: IComment[];
}
