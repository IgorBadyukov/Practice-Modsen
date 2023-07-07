import { createAction, props } from '@ngrx/store';
import { EGeolocationActionSource } from '../../utils/enums';
import { IGeolocation } from '../../models/geolocation.model';

export const fetchGeolocation = createAction(EGeolocationActionSource.GetGeolocation);
export const fetchGeolocationSuccess = createAction(
  EGeolocationActionSource.GetGeolocationSuccess,
  props<{ geolocation: IGeolocation }>(),
);
export const fetchGeolocationError = createAction(EGeolocationActionSource.GetGeolocationError);
