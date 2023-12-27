import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IEnrollments } from '../models/IEnrollments';
import { ICourse } from '../../courses/models/courses';
import { IEnrollmentPayload } from '../models/IEnrollmentPayload';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: IEnrollments[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),

    'Load Enrollments Dialog options':  emptyProps(),
    'Load Enrollments Dialog options Success': props<{ data: ICourse[] }>(),
    'Load Enrollments Dialog options Failure': props<{ error: unknown }>(),

    'Create Enrollment': props<{ payload: IEnrollmentPayload }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
  }
});
