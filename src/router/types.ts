interface INestedRoute extends IRoute {}

export interface IRoute {
  path: string;
  component: any;
  isPrivate: boolean;
  key: string;
  routes?: INestedRoute[];
  exact?: boolean;
  breadcrumb?: string;
  permission?: string;
}
