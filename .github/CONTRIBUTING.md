# Contributing guidelines

## How to implement a feature flag

This application has a mechanism for hiding features behind flags. This is useful for a number of reasons:

- conditionally serving features to users during the development process – this allows us to test new features with stakeholders without putting a feature live for everyone
- the ability to better practice continuous delivery, by delivering in-progress work to production in an inert or inactive way

In order to add a feature flag for your new feature, look for the `<FeatureFlagProvider>` component in `./pages/_app.tsx`. You'll find an object which looks similar to the following:

```tsx
const features = {
  'feature-name': {
    isActive: someConditionThatReturnsABoolean,
  },
};
```

You can add a new feature to it following this structure:

```tsx
[featureName: string]: {
  isActive: Boolean;
}
```

To then use your feature flag in your React code, a component – `<ConditionalFeature />` is available. This component will render its children if the feature is active, otherwise it will return nothing. Use it as follows:

```tsx
<div>
  <h1>This is my heading</h1>
  <ConditionalFeature name="some-awesome-feature">
    <AwesomeFeature />
  </ConditionalFeature>
</div>
```

In the above scenario, if the feature `some-awesome-feature` is active, the child component (`<AwesomeFeature />`) will be rendered below the heading. Otherwise, it'll be hidden.