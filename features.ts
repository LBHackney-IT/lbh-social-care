import { FeatureSet } from 'lib/feature-flags/feature-flags';
import { Router } from 'next/router';

type FeatureFlagOptions = {
  environmentName: string;
  query: Router['query'];
};

export const getFeatureFlags = ({
  environmentName,
  query,
}: FeatureFlagOptions): FeatureSet => {
  const featureFlags: FeatureSet = {
    // FEATURE-FLAG-EXPIRES [3000-12-31]: feature-flags-implementation-proof
    'feature-flags-implementation-proof': {
      isActive: environmentName === 'development',
    },

    /*
      The feature-flags-implementation-proof has been setup to have an expiry date in the far future.
      The FEATURE-FLAG-EXPIRES comment above will cause ESLint errors once the date in the square brackets has passed.
      Add feature flags below following the format in the example shown.
     */

    // FEATURE-FLAG-EXPIRES [2021-08-31]: new-search
    'new-search': {
      isActive: Boolean(query.newSearchActive),
    },
  };

  return featureFlags;
};
