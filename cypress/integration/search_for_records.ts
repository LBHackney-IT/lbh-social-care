import { AuthRoles } from '../support/commands';

describe('Search for records by person', () => {
  it('has no detectable accessibility problems', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  describe('As a user in the Admin Dev group', () => {
    it('Search of Adult group record', () => {
      cy.visitAs('/cases', AuthRoles.AdminDevGroup);

      cy.contains('First name').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
      cy.get('form').submit();
      cy.contains('View').click();
    });

    it('Search of Children group record', () => {
      cy.visitAs('/cases', AuthRoles.AdminDevGroup);

      cy.contains('First name').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();
      cy.contains('View').click();
    });
  });
});
