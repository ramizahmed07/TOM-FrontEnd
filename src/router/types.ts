interface INestedRoute extends IRoute {}

export interface IRoute {
  path: string;
  component: any;
  key: string;
  routes?: INestedRoute[];
  exact?: boolean;
}
