/* tslint:disable */
/* eslint-disable */
/**
 * traP knoQ
 * This is a sample knoQ server.
 *
 * The version of the OpenAPI document: 2.1.5
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface RequestSchedule
 */
export interface RequestSchedule {
  /**
   * pending or absent or attendance
   * @type {string}
   * @memberof RequestSchedule
   */
  schedule: RequestScheduleScheduleEnum;
}

export const RequestScheduleScheduleEnum = {
  Pending: "pending",
  Absent: "absent",
  Attendance: "attendance",
} as const;

export type RequestScheduleScheduleEnum =
  (typeof RequestScheduleScheduleEnum)[keyof typeof RequestScheduleScheduleEnum];
