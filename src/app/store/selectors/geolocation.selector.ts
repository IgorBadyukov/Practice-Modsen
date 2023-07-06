import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateGeolocation } from '../state.model';

export const getGetGeolocationStore = createFeatureSelector('geolocation');
export const getCoordinates = createSelector(
  getGetGeolocationStore as any,
  (state: AppStateGeolocation) => state.geolocation,
);
export const getIsFetchedGeolocation = createSelector(
  getGetGeolocationStore as any,
  (state: AppStateGeolocation) => state.fetchedGeolocation,
);
export const getLatitude = createSelector(
  getCoordinates,
  (geolocaton) => geolocaton?.lat,
);
export const getLongitude = createSelector(
  getCoordinates,
  (geolocaton) => geolocaton?.lon,
);
