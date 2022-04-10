export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  routeDisabled?: boolean;
  children?: NavItem[];
  isDashboard?: boolean;
}
