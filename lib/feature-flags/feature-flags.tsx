import { getFeatureFlags } from 'features';
import React from 'react';
import { useContext } from 'react';

export type FeatureSet = {
  [featureName: string]: {
    isActive: boolean;
  };
};

const FeatureFlagContext = React.createContext<FeatureSet | undefined>(
  undefined
);

export const FeatureFlagProvider: React.FC<{
  features: FeatureSet;
}> = ({ features, children }) => {
  return (
    <FeatureFlagContext.Provider value={features}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
const isFeatureActive = (features: FeatureSet) => (featureName: string) => {
  if (features[featureName] === undefined) {
    return false;
  }

  if (features[featureName].isActive === false) {
    return false;
  }

  return true;
};

/**
 * React hook for accessing feature flags
 */
export const useFeatureFlags: () => {
  isFeatureActive: (featureName: string) => boolean;
} = () => {
  const features = useContext(FeatureFlagContext);

  if (features === undefined) {
    throw new Error(
      'A <FeatureFlagProvider /> must be provided as a parent of this component'
    );
  }

  return {
    isFeatureActive: isFeatureActive(features),
  };
};

/**
 * React component for conditional rendering based on the active state of a feature flag
 */
export const ConditionalFeature: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  const { isFeatureActive } = useFeatureFlags();

  if (!isFeatureActive(name)) {
    return null;
  }

  return <>{children}</>;
};

/**
 * Typescript helper function for checking whether a given feature is active or inactive
 */
export const isFeatureFlagActive = (featureName: string) => {
  const environmentName = [
    'social-care-service-staging.hackney.gov.uk',
    'dev.hackney.gov.uk:3000',
  ].includes(process.env.REDIRECT_URL || '')
    ? 'development'
    : 'production';

  const features = getFeatureFlags({
    environmentName,
    query: {
      // @TODO this should actual have some value...
    },
  });

  return isFeatureActive(features)(featureName);
};
