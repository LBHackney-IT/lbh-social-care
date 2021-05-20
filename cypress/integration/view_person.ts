import { AuthRoles } from '../support/commands';

describe('Viewing a resident', () => {
  it('has no detectable accessibility problems', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  describe('As a user in the Childrens group', () => {
    it('should show the records as restricted when the current user does not have access to them because they are in the wrong user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains(
        'Some details for this person are restricted due to your permissions.'
      );
    });

    it('should show a list of records when the current user has access to them because they are in the correct user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Date created');
      cy.contains('Record type');
    });

    it('should allow allocation of workers against child residents', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Allocate worker');
    });
  });

  describe('As a user in the Childrens Unrestricted group', () => {
    it('should show records of a restricted child resident', () => {
      cy.intercept({
        method: 'GET',
        url: `/api/residents/${Cypress.env(
          'CHILDREN_RESTRICTED_RECORD_PERSON_ID'
        )}`,
      }).as('apiGetResident');

      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RESTRICTED_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensUnrestrictedGroup
      );

      cy.wait('@apiGetResident');

      cy.contains('Records not found');
    });
  });

  describe('As a user in the Adults group', () => {
    it('should show the records as restricted when the current user does not have access to them because they are in the wrong user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains(
        'Some details for this person are restricted due to your permissions.'
      );
    });

    it('should show a list of records when the current user has access to them because they are in the correct user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Date created');
      cy.contains('Record type');
    });

    it('should hide records of a restricted adult resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RESTRICTED_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsAllocatorGroup
      );

      cy.contains(
        'Some details for this person are restricted due to your permissions.'
      );
    });
  });

  describe('As a user in the Adults Allocators group', () => {
    it('should allow allocation of workers against adult residents', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsAllocatorGroup
      );

      cy.contains('Allocate worker');
    });
  });

  describe('As a user in the Adults Unrestricted group', () => {
    it('should show records of a restricted adult resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RESTRICTED_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsUnrestrictedGroup
      );

      cy.contains('Date created');
      cy.contains('Record type');
    });
  });

  describe('As a user in the Admin group', () => {
    it('should hide records of a restricted resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RESTRICTED_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsAllocatorGroup
      );

      cy.contains(
        'Some details for this person are restricted due to your permissions.'
      );
    });
  });
});
