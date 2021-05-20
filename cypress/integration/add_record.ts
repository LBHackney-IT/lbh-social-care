import { AuthRoles } from '../support/commands';

describe('Adding records', () => {
  it('has no detectable accessibility problems', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  describe('As a user in the Adults group', () => {
    it('should go to the add case note form when "Case Note Recording" is selected', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('ASC');
      cy.contains('Add a new record').click();
      cy.contains('Add a new record for').should('be.visible');
      cy.contains('Expand view').click();
      cy.contains('Collapse view').should('be.visible');
      cy.get('[data-testid="formList"]').click();
      cy.contains('Blue Badge').should('be.visible');
      cy.contains('Case Note Recording').should('be.visible');
      cy.get('[data-testid="formList"]').type('Case Note Recording');
      cy.contains('Case Note Recording').should('be.visible');
      cy.contains('Appointeeship').should('not.exist');
      cy.contains('Case Note Recording').click();
      cy.get('[data-module="govuk-button"]').click();
      cy.url().should(
        'include',
        `/people/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/records/case-notes-recording`
      );
      cy.contains('Case note for').should('be.visible');
    });
  });

  describe('As a user in the Childrens group', () => {
    it('should go to the add case note form when "Case Note Recording" is selected', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('CFS');
      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Add a new record').click();
      cy.contains('Add a new record for').should('be.visible');
      cy.contains('Expand view').click();
      cy.contains('Collapse view').should('be.visible');
      cy.get('[data-testid="formList"]').click();
      cy.contains('CFS Case Note').should('be.visible');
      cy.contains('CFS Visit').should('be.visible');
      cy.get('[data-testid="formList"]').type('CFS Visit');
      cy.contains('CFS Visit').should('be.visible');
      cy.contains('CFS Case Note').should('not.exist');
    });
  });
});
