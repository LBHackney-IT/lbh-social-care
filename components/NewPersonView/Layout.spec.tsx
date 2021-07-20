import { render, screen } from '@testing-library/react';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedResident } from 'factories/residents';
import { mockedOnlyChildUser, mockedUser } from 'factories/users';
import * as relationshipsAPI from 'utils/api/relationships';
import Layout from './Layout';
import 'next/router';

import {
  mockedRelationshipData,
  mockedExistingRelationship,
} from 'factories/relationships';

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe('Layout', () => {
  it('renders children, navigation and a primary action', () => {
    render(
      <AuthProvider user={mockedUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.getByText('Foo'));
    expect(screen.getByText('Add something new'));
    expect(screen.getByRole('navigation'));
    expect(screen.getByText('Timeline'));
  });

  it("renders the user's name and caption", () => {
    render(
      <AuthProvider user={mockedUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.getByText('Foo Bar'));
    expect(screen.getByText('#1 · Born 13 Nov 2020'));
  });

  it('displays correctly the number of relationships', () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: mockedResident.id,
        personalRelationships: [
          mockedRelationshipData.build({
            type: 'parent',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Neil',
                lastName: 'Muciaccia',
              }),
              mockedExistingRelationship.build({
                firstName: 'Giovanni',
                lastName: 'Muciaccia',
              }),
            ],
          }),
          mockedRelationshipData.build({
            type: 'child',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Oppo',
                lastName: 'Muciaccia',
              }),
            ],
          }),
        ],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );

    const parentsRow = screen.queryByText('Relationships (3)');
    expect(parentsRow).not.toBeNull();
  });

  it('displays no relationship count where the received object is empty', () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: mockedResident.id,
        personalRelationships: [],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );

    const parentsRow = screen.queryByText('Relationships');
    expect(parentsRow).not.toBeNull();
  });

  it("hides the timeline link if the user isn't authorised", () => {
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(screen.queryByText('Timeline')).toBe(null);
  });

  it('shows the correct case note link for a child resident', () => {
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout
          person={{
            ...mockedResident,
            contextFlag: 'C',
          }}
        >
          Foo
        </Layout>
      </AuthProvider>
    );
    expect(
      (screen.queryByText('Add case note') as HTMLLinkElement).href
    ).toContain(`/people/${mockedResident.id}/case-note`);
  });

  it('shows the correct case note link for an adult resident', () => {
    render(
      <AuthProvider user={mockedOnlyChildUser}>
        <Layout person={mockedResident}>Foo</Layout>
      </AuthProvider>
    );
    expect(
      (screen.queryByText('Add case note') as HTMLLinkElement).href
    ).toContain(`/people/${mockedResident.id}/records/case-note-recording`);
  });
});
