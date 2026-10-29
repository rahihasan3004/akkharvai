import Nirdeshika16 from './Nirdeshika16.astro';
import Boyon from './Boyon.astro';
import Shimu from './Shimu.astro';
import Sdk from './Sdk.astro';
import AkkharHex from './AkkharHex.astro';
import Zrcp from './Zrcp.astro';
import HashedContext from './HashedContext.astro';
import type { ProjectSlug } from '../data/lab';

export const projectPages: Record<ProjectSlug, typeof Nirdeshika16> = {
  'nirdeshika-16': Nirdeshika16,
  boyon: Boyon,
  shimu: Shimu,
  'nirdeshika-sdk': Sdk,
  'akkhar-hex': AkkharHex,
  zrcp: Zrcp,
  hashedcontext: HashedContext,
};
