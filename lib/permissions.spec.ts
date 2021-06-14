import { residentFactory } from '../factories/residents';
import { userFactory } from '../factories/users';

import {
  canUserEditPerson,
  canManageCases,
  canViewRelationships,
  canUserViewWarningNotes,
} from './permissions';

describe('permissions', () => {
  describe('#canUserEditPerson()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in CFS and the resident is a child', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in CFS, has unrestricted permissions, and the resident is a restricted child', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in CFS, does not have unrestricted permissions, and the resident is a restricted child', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ASC and the resident is an adult', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in ASC, has unrestricted permissions, and the resident is a restricted adult', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in ASC, does not have unrestricted permissions, and the resident is a restricted adult', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is an admin and the resident is not restricted', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is an admin, has unrestricted permissions, and the resident is restricted', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is an admin and the resident is restricted', () => {
      expect(
        canUserEditPerson(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });
  });

  describe('#canManageCases()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ACS and the person is an adult', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in ACS and the person is a restricted adult', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ACS, has unrestricted access, and the person is a restricted adult', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in CFS and the person is a child', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in CFS and the person is a restricted child', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in CFS, has unrestricted access, and the person is a restricted child', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is an admin and the person is not restricted', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is an admin and the person is restricted', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is an admin, has unrestricted access, and the person is restricted', () => {
      expect(
        canManageCases(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });
  });

  describe('#canViewRelationships()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is a dev', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: true,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user has children permissions and the resident is a child', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user has adult permissions and the resident is an adult', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });
    it('should return false when the user has adult permissions and the resident is a child', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: true,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });
    it('should return false when the user has children permissions and the resident is an adult', () => {
      expect(
        canViewRelationships(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          }),
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });
  });

  describe('#canUserViewWarningNotes()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canUserViewWarningNotes(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: false,
            hasAllocationsPermissions: false,
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is a dev', () => {
      expect(
        canUserViewWarningNotes(
          userFactory.build({
            hasAdminPermissions: false,
            hasAdultPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasDevPermissions: true,
            hasAllocationsPermissions: false,
          })
        )
      ).toEqual(true);
    });
    it('should return false when the user is not a dev', () => {
      expect(
        canUserViewWarningNotes(
          userFactory.build({
            hasAdminPermissions: true,
            hasAdultPermissions: true,
            hasChildrenPermissions: true,
            hasUnrestrictedPermissions: true,
            hasDevPermissions: false,
            hasAllocationsPermissions: true,
          })
        )
      ).toEqual(false);
    });
  });
});
