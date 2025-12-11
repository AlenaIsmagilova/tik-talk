import { Component } from '@angular/core';
import { AvatarUrlPipe } from '../../../pipes/avatar-url.pipe';
import { IProfile } from '../../../interfaces/profile.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ProfileService } from '../../../services/profile.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post-input',
  imports: [AvatarUrlPipe, ReactiveFormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  form!: FormGroup;
  me: IProfile | null;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private profileService: ProfileService
  ) {
    this.me = this.profileService.me();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: [''],
    });
  }

  onAddPostClick() {
    this.postService
      .addPost({
        content: this.form.value.content,
        authorId: this.profileService.me()!.id,
      })
      .pipe(switchMap(() => this.postService.getPosts(this.me!.id)))
      .subscribe(() => this.form.reset());
  }
}
