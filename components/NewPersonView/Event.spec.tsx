import { render, screen } from '@testing-library/react';
import { mockedCaseNote, mockedWarningNoteCase } from 'factories/cases';
import Event from './Event';

describe('Event', () => {
  it('renders the right info for a form wizard case note', () => {
    render(<Event event={mockedCaseNote} />);

    expect(screen.getAllByRole('heading').length).toBe(1);
    expect(screen.getAllByRole('link').length).toBe(1);

    expect(screen.getByText('foorm'));
    expect(screen.getByText('25 Oct 2020 1.49 pm', { exact: false }));
    expect(screen.getByText('Fname.Lname@hackney.gov.uk', { exact: false }));
  });

  it('renders the right info for a warning note', () => {
    render(<Event event={mockedWarningNoteCase} />);

    expect(screen.getAllByRole('heading').length).toBe(1);
    expect(screen.getAllByRole('link').length).toBe(1);

    expect(screen.getByText('Warning Note'));
    expect(screen.getByText('25 Oct 2020 1.49 pm', { exact: false }));
    expect(screen.getByText('Fname.Lname@hackney.gov.uk', { exact: false }));
  });
});
