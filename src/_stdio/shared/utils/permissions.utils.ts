import { SimplePermissions } from 'services/simple-permission';

export const NoPermissionMessage = 'User have no permission to access this page';

export function IsAllowToAccessRiskAssessment(permission: SimplePermissions) {
  return permission.HasAnyPermission(
    { name: 'RISK_ASSESSMENT', access: '*' },
    { name: 'RISK_ASSESSMENT_DESIGN_ONLY', access: '*' }
  );
}

export function IsAllowToAccessVerification(permission: SimplePermissions) {
  return permission.HasAnyPermission({ name: 'VERIFICATION_MODULE', access: '*' });
}

export function IsAllowToAccessMonitoring(permission: SimplePermissions) {
  return permission.HasAnyPermission({ name: 'MONITORING_MODULE', access: '*' });
}

export function IsRequiredCostCenter(permission: SimplePermissions) {
  return permission.HasAnyPermission({ name: 'COST_CENTER', access: '*' });
}

export function IsAllowToAccessDailyOverview(permission: SimplePermissions) {
  return permission.HasAnyPermission({ name: 'DAILY_OVERVIEW', access: '*' });
}

export function IsAllowToAccessObservation(permission: SimplePermissions) {
  return permission.HasPermission('OBSERVATION_MODULE', '*');
}
