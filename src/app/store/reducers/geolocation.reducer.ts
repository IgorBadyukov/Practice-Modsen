import { createReducer, on } from "@ngrx/store";
import { initialSateGeolocation } from "../state.model";
import {
  fetchGeolocation,
  fetchGeolocationError,
  fetchGeolocationSuccess,
} from "../actions/geolocation.action";

export const geolocationReducer = createReducer(
  initialSateGeolocation,
  on(fetchGeolocation, (state) => ({ ...state, fetchedGeolocation: true })),
  on(fetchGeolocationSuccess, (state, { geolocation }) => ({
    ...state,
    fetchedGeolocation: false,
    geolocation: geolocation,
  })),
  on(fetchGeolocationError, (state) => ({
    ...state,
    fetchedGeolocation: false,
  }))
);
