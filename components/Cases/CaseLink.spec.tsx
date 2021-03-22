import { render } from '@testing-library/react';
import { mockedDeallocationNote } from 'fixtures/cases.fixtures';

import CaseLink from './CaseLink';

describe('CaseLink component', () => {
  it('should render properly - with externalUrl', () => {
    const props = {
      recordId: '123',
      externalUrl: 'https://foo.bar',
      caseFormData: mockedDeallocationNote.caseFormData,
    };
    const { asFragment } = render(<CaseLink {...props} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <a
          class="govuk-link"
          href="https://foo.bar"
          rel="noreferrer noopener"
          target="_blank"
        >
          View
        </a>
      </DocumentFragment>
    `);
  });

  it('should render properly - with handled link', () => {
    const props = {
      recordId: '123',
      caseFormData: mockedDeallocationNote.caseFormData,
    };
    const { asFragment } = render(<CaseLink {...props} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <a
          href="/people/123/allocations/321?recordId=123"
        >
          View
        </a>
      </DocumentFragment>
    `);
  });

  it('should render properly - without a link', () => {
    const props = {
      recordId: '123',
      caseFormData: {
        ...mockedDeallocationNote.caseFormData,
        form_name_overall: '',
      },
    };
    const { asFragment } = render(<CaseLink {...props} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });
});