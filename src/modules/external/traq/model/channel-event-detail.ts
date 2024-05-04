/* tslint:disable */
/* eslint-disable */
/**
 * traQ v3
 * traQ v3 API
 *
 * The version of the OpenAPI document: 3.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import { ChildCreatedEvent } from "./child-created-event";
// May contain unused imports in some cases
// @ts-ignore
import { ForcedNotificationChangedEvent } from "./forced-notification-changed-event";
// May contain unused imports in some cases
// @ts-ignore
import { NameChangedEvent } from "./name-changed-event";
// May contain unused imports in some cases
// @ts-ignore
import { ParentChangedEvent } from "./parent-changed-event";
// May contain unused imports in some cases
// @ts-ignore
import { PinAddedEvent } from "./pin-added-event";
// May contain unused imports in some cases
// @ts-ignore
import { PinRemovedEvent } from "./pin-removed-event";
// May contain unused imports in some cases
// @ts-ignore
import { SubscribersChangedEvent } from "./subscribers-changed-event";
// May contain unused imports in some cases
// @ts-ignore
import { TopicChangedEvent } from "./topic-changed-event";
// May contain unused imports in some cases
// @ts-ignore
import { VisibilityChangedEvent } from "./visibility-changed-event";

/**
 * @type ChannelEventDetail
 * イベント内容
 * @export
 */
export type ChannelEventDetail =
  | ChildCreatedEvent
  | ForcedNotificationChangedEvent
  | NameChangedEvent
  | ParentChangedEvent
  | PinAddedEvent
  | PinRemovedEvent
  | SubscribersChangedEvent
  | TopicChangedEvent
  | VisibilityChangedEvent;