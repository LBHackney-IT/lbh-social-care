/**
 * Example:
 *
 * <ConditionalFeature name="some-feature">
 *   <div>The feature is active!</div>
 * </ConditionalFeature>
 */
import { renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';

import {
  ConditionalFeature,
  FeatureFlagProvider,
  FeatureSet,
  isFeatureFlagActive,
  useFeatureFlags,
} from './feature-flags';

import { getFeatureFlags } from 'features';

jest.mock('features');
const mockedGetFeatureFlags = getFeatureFlags as jest.Mocked<
  typeof getFeatureFlags
>;

describe('feature flags', () => {
  describe('<ConditionalFeature />', () => {
    it('should render nothing if an unknown feature name is provided', () => {
      const features: FeatureSet = {};

      render(
        <FeatureFlagProvider features={features}>
          <ConditionalFeature name="some-unknown-feature-name">
            <div data-testid="expectedElement">This should not be visible!</div>
          </ConditionalFeature>
        </FeatureFlagProvider>
      );

      const children = screen.queryByTestId('expectedElement');

      expect(children).toBeNull();
    });

    it('should render nothing if a known feature name is provided and that feature is inactive', () => {
      const features: FeatureSet = {
        'some-known-inactive-feature-name': {
          isActive: false,
        },
      };

      render(
        <FeatureFlagProvider features={features}>
          <ConditionalFeature name="some-known-inactive-feature-name">
            <div data-testid="expectedElement">This should be visible!</div>
          </ConditionalFeature>
        </FeatureFlagProvider>
      );

      const children = screen.queryByTestId('expectedElement');

      expect(children).toBeNull();
    });

    it('should render the children if a known feature name is provided and that feature is active', () => {
      const features: FeatureSet = {
        'some-known-active-feature-name': {
          isActive: true,
        },
      };

      render(
        <FeatureFlagProvider features={features}>
          <ConditionalFeature name="some-known-active-feature-name">
            <div data-testid="expectedElement">This should be visible!</div>
          </ConditionalFeature>
        </FeatureFlagProvider>
      );

      screen.getByTestId('expectedElement');
    });

    it('should throw an exception if feature flag context is not provided', () => {
      expect(() => {
        render(<ConditionalFeature name="some-known-active-feature-name" />);
      }).toThrow(
        'A <FeatureFlagProvider /> must be provided as a parent of this component'
      );
    });
  });

  describe('useFeatureFlags() hook', () => {
    const getContextWrapper = (features: FeatureSet) => {
      const ContextWrapper: React.FC = ({ children }) => (
        <FeatureFlagProvider features={features}>
          {children}
        </FeatureFlagProvider>
      );

      return ContextWrapper;
    };

    it('should throw an exception if feature flag context is not provided', () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: undefined,
      });

      expect(result.error).toEqual(
        new Error(
          'A <FeatureFlagProvider /> must be provided as a parent of this component'
        )
      );
    });

    it('should return a method to check if a named hook is active and return true if it is', () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: getContextWrapper({
          'test-feature': {
            isActive: true,
          },
        }),
      });

      expect(result.current.isFeatureActive('test-feature')).toBe(true);
    });

    it("should return a method to check if a named hook is active and return false if it isn't", () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: getContextWrapper({
          'test-feature': {
            isActive: false,
          },
        }),
      });

      expect(result.current.isFeatureActive('test-feature')).toBe(false);
    });

    it('should return a method to check if a named hook is active and return false if it is not defined', () => {
      const { result } = renderHook(() => useFeatureFlags(), {
        wrapper: getContextWrapper({
          'test-feature': {
            isActive: true,
          },
        }),
      });

      expect(result.current.isFeatureActive('non-existant-feature')).toBe(
        false
      );
    });
  });

  describe('isFeatureFlagActive() helper function', () => {
    it('should return true if the feature is active', () => {
      const stubbedFeatures: FeatureSet = {
        'test-feature': {
          isActive: true,
        },
      };

      (mockedGetFeatureFlags as jest.Mock).mockReturnValueOnce(stubbedFeatures);

      const someFeatureIsActive = isFeatureFlagActive('test-feature');

      expect(someFeatureIsActive).toBe(true);
    });

    it('should return false if the feature is not active', () => {
      const stubbedFeatures: FeatureSet = {
        'test-feature': {
          isActive: false,
        },
      };

      (mockedGetFeatureFlags as jest.Mock).mockReturnValueOnce(stubbedFeatures);

      const someFeatureIsActive = isFeatureFlagActive('test-feature');

      expect(someFeatureIsActive).toBe(false);
    });

    it('should return false if the feature is not defined', () => {
      const stubbedFeatures: FeatureSet = {
        'test-feature': {
          isActive: false,
        },
      };

      (mockedGetFeatureFlags as jest.Mock).mockReturnValueOnce(stubbedFeatures);

      const someFeatureIsActive = isFeatureFlagActive('undefined-test-feature');

      expect(someFeatureIsActive).toBe(false);
    });
  });
});
