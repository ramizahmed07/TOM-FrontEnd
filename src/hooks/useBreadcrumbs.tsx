import React, { createElement } from "react";
import { matchPath, useLocation } from "react-router";

type Location = ReturnType<typeof useLocation>;

export interface Options {
  disableDefaults?: boolean;
  excludePaths?: string[];
}

export interface MatchOptions {
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

export interface BreadcrumbsRoute {
  path: string;
  breadcrumb?: React.ComponentType | React.ElementType | string | null;
  matchOptions?: MatchOptions;
  routes?: BreadcrumbsRoute[];
  props?: { [x: string]: unknown };
}

export interface BreadcrumbData {
  match: { url: string };
  location: Location;
  key: string;
  breadcrumb: React.ReactNode;
}

const DEFAULT_MATCH_OPTIONS = { exact: true };
const NO_BREADCRUMB = "NO_BREADCRUMB";

const humanize = (str: string): string =>
  str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, m => m.toUpperCase());

const render = ({
  breadcrumb: Breadcrumb,
  match,
  location,
  props,
}: {
  breadcrumb: React.ComponentType | string;
  match: { url: string };
  location: Location;
  props?: { [x: string]: unknown };
}): BreadcrumbData => {
  const componentProps = {
    match,
    location,
    key: match.url,
    ...(props || {}),
  };
  return {
    ...componentProps,
    breadcrumb:
      typeof Breadcrumb === "string" ? (
        createElement("span", { key: componentProps.key }, Breadcrumb)
      ) : (
        <Breadcrumb {...componentProps} />
      ),
  };
};

const getDefaultBreadcrumb = ({
  currentSection,
  location,
  pathSection,
}: {
  currentSection: string;
  location: Location;
  pathSection: string;
}): BreadcrumbData => {
  const match = matchPath(pathSection, {
    ...DEFAULT_MATCH_OPTIONS,
    path: pathSection,
  }) || {
    url: "not-found",
  };

  return render({
    breadcrumb: humanize(currentSection),
    match,
    location,
  });
};

const getBreadcrumbMatch = ({
  currentSection,
  disableDefaults,
  excludePaths,
  location,
  pathSection,
  routes,
}: {
  currentSection: string;
  disableDefaults?: boolean;
  excludePaths?: string[];
  location: Location;
  pathSection: string;
  routes: BreadcrumbsRoute[];
}): typeof NO_BREADCRUMB | BreadcrumbData => {
  let breadcrumb: BreadcrumbData | typeof NO_BREADCRUMB | undefined;

  const getIsPathExcluded = (path: string): boolean =>
    matchPath(pathSection, {
      path,
      exact: true,
      strict: false,
    }) != null;

  if (excludePaths && excludePaths.some(getIsPathExcluded)) {
    return NO_BREADCRUMB;
  }

  routes.some(
    ({ breadcrumb: userProvidedBreadcrumb, matchOptions, path, ...rest }) => {
      if (!path) {
        throw new Error(
          "useBreadcrumbs: `path` must be provided in every route object"
        );
      }

      const match = matchPath(pathSection, {
        ...(matchOptions || DEFAULT_MATCH_OPTIONS),
        path,
      });

      if (
        (match && userProvidedBreadcrumb === null) ||
        (!match && matchOptions)
      ) {
        breadcrumb = NO_BREADCRUMB;
        return true;
      }

      if (match) {
        if (!userProvidedBreadcrumb && disableDefaults) {
          breadcrumb = NO_BREADCRUMB;
          return true;
        }

        breadcrumb = render({
          breadcrumb: userProvidedBreadcrumb || humanize(currentSection),
          match,
          location,
          ...rest,
        });
        return true;
      }
      return false;
    }
  );

  if (breadcrumb) {
    return breadcrumb;
  }

  if (disableDefaults) {
    return NO_BREADCRUMB;
  }

  return getDefaultBreadcrumb({
    pathSection,
    currentSection: pathSection === "/" ? "Home" : currentSection,
    location,
  });
};

export const getBreadcrumbs = ({
  routes,
  location,
  options = {},
}: {
  routes: BreadcrumbsRoute[];
  location: Location;
  options?: Options;
}): BreadcrumbData[] => {
  const matches: BreadcrumbData[] = [];
  const { pathname } = location;

  pathname
    .split("?")[0]
    .split("/")
    .reduce(
      (previousSection: string, currentSection: string, index: number) => {
        const pathSection = !currentSection
          ? "/"
          : `${previousSection}/${currentSection}`;

        if (pathSection === "/" && index !== 0) {
          return "";
        }

        const breadcrumb = getBreadcrumbMatch({
          currentSection,
          location,
          pathSection,
          routes,
          ...options,
        });

        if (breadcrumb !== NO_BREADCRUMB) {
          matches.push(breadcrumb);
        }

        return pathSection === "/" ? "" : pathSection;
      },
      ""
    );

  return matches;
};

const flattenRoutes = (routes: BreadcrumbsRoute[]): BreadcrumbsRoute[] =>
  routes.reduce((arr, route: BreadcrumbsRoute): BreadcrumbsRoute[] => {
    if (route.routes) {
      return arr.concat([route, ...flattenRoutes(route.routes)]);
    }
    return arr.concat(route);
  }, [] as BreadcrumbsRoute[]);

export const useBreadcrumbs = (
  routes?: BreadcrumbsRoute[],
  options?: Options
): BreadcrumbData[] =>
  getBreadcrumbs({
    routes: flattenRoutes(routes || []),
    location: useLocation(),
    options,
  });
