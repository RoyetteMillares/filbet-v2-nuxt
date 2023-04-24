import * as VueRouter from "vue-router"

declare module "vue-router" {
  interface RouteLocationNamedRaw
    extends Omit<VueRouter.RouteLocationNamedRaw, "name"> {
    name: RouteName
  }
  interface MatcherLocation extends Omit<VueRouter.MatcherLocation, "name"> {
    name: RouteName
  }
  interface RouteLocationNormalizedLoaded
    extends Omit<VueRouter.MatcherLocation, "name"> {
    name: RouteName
  }
}
