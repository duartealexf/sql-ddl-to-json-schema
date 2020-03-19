import { P_COLUMN_REFERENCE_ON, ColumnReferenceOnInterface } from '../../../../typings';

import { ColumnReferenceOnModelInterface } from './typings';

/**
 * Column reference's 'on' triggers of column actions.
 */
export class ColumnReferenceOn implements ColumnReferenceOnModelInterface {
  trigger!: string;

  action!: string;

  /**
   * Creates column reference "on" trigger from object.
   * Object must contain properties 'trigger' and 'action'.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromObject(json: P_COLUMN_REFERENCE_ON): ColumnReferenceOn {
    const onInstance = new ColumnReferenceOn();

    onInstance.action = json.action.toLowerCase();
    onInstance.trigger = json.trigger.toLowerCase();

    return onInstance;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): ColumnReferenceOnInterface {
    return {
      trigger: this.trigger,
      action: this.action,
    };
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): ColumnReferenceOn {
    return ColumnReferenceOn.fromObject(this);
  }
}
