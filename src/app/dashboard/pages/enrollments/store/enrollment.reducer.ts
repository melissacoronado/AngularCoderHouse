import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { IEnrollments } from '../models/IEnrollments';
import { ICourse } from '../../courses/models/courses';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  isLoading: boolean;
  isLoadingDialogOptions: boolean;
  enrollments: IEnrollments[];
  courseOptions: ICourse[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingDialogOptions: false,
  enrollments: [],
  courseOptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => ({ ...state, isLoading: true})),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, {data}) => ({ ...state, isLoading: false, enrollments: data})),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => ({ ...state, isLoading: false, error: action.error})),



  //loadEnrollmentDialogOptions
  on(EnrollmentActions.loadEnrollmentsDialogOptions, (state) => {
    return {
      ...state,
      isLoadingDialogOptions: true,
    };
  }),
  //loadEnrollmentDialogOptionsSuccess
  on(EnrollmentActions.loadEnrollmentsDialogOptionsSuccess, (state, action) => ({
    ...state,
    courseOptions: action.data,
    isLoadingDialogOptions: false,
  })),

  //loadEnrollmentDialogOptionsFailure
  on(EnrollmentActions.loadEnrollmentsDialogOptionsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoadingDialogOptions: false,
  }))

);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});



