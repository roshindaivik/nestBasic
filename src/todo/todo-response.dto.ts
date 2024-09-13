import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from 'src/user/user.entity';

export class TodoResponseDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  statue: string;

  @Exclude()
  user: User;

  @Expose()
  @Transform(({ obj }) => obj.userId || (obj.user && obj.user.id) || null)
  userId: number;
}
