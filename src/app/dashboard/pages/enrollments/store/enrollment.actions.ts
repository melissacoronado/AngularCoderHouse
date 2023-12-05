import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IEnrollments } from '../models/IEnrollments';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: IEnrollments[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
  }
});
