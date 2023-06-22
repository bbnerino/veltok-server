import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CafeResolver {
  @Query(() => String)
  whatCafe() {
    return 'there is twosomeplace2';
  }
  @Query(() => String)
  whatCafe2() {
    return 'there is twosomeplace3';
  }
}
