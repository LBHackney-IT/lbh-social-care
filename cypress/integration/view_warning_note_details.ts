import { AuthRoles } from '../support/commands';

describe('Viewing a created warning note', () => {
  it('has no detectable accessibility problems', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  describe('As a user in the Adults group', () => {
    it('should show the details of the warning note if the records are not restricted', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('td', 'Warning Note Created')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
      cy.contains('Expand view').click();
      cy.contains('Collapse view').should('be.visible');
      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');

      cy.contains('a', 'Back').click();
      cy.contains('RECORDS HISTORY').should('be.visible');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });
  });

  describe('As a user in the Children group', () => {
    it('should show the details of the warning note if the records are not restricted', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('td', 'Warning Note Created')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Expand view').click();
      cy.contains('Collapse view').should('be.visible');
      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');

      cy.contains('a', 'Back').click();
      cy.contains('RECORDS HISTORY').should('be.visible');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });
  });
});
