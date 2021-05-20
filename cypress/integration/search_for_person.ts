import { AuthRoles } from '../support/commands';

describe('Search for a person', () => {
  it('has no detectable accessibility problems', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  describe('As a user in the Childrens group', () => {
    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.ChildrensGroup);

      cy.contains('First name').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_FULL_NAME')
      );
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.ChildrensGroup);

      cy.contains('First name').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_FULL_NAME')
      );
    });
  });

  describe('As a user in the Adults group', () => {
    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdultsGroup);

      cy.contains('First name').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('CHILDREN_RECORD_FULL_NAME')
      );
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdultsGroup);

      cy.contains('First name').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_PERSON_ID')
      );

      cy.get('[data-testid="residents-table"]').contains(
        Cypress.env('ADULT_RECORD_FULL_NAME')
      );
    });
  });

  describe('As a user in the Admin Dev group', () => {
    it('show a list of records that match the Mosaic ID when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.get('[data-testid="mosaic_id"]').type(Cypress.env('MOSAIC_ID_TEST'));
      cy.get('[type="submit"]').click();
      cy.contains('View').click();
      cy.contains(Cypress.env('NAME_FOR_MOSAIC_ID_TEST')).should('be.visible');
    });

    it('should show a list that contains adult records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.contains('First name').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
      cy.get('form').submit();
      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
    });

    it('should show a list that contains children records when a search is completed', () => {
      cy.visitAs('/search', AuthRoles.AdminDevGroup);

      cy.contains('First name').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
      cy.contains('Last name').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
      cy.get('[type="submit"]').click();
      cy.contains('View').click();
      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
    });
  });
});
