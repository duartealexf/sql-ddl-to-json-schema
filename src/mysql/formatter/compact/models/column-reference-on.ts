import { P_COLUMN_REFERENCE_ON } from "@mysql/compiled/typings";
import { ColumnReferenceOnInterface, SerializableInterface, ClonableInterface } from "./typings";

/**
 * Column reference's 'on' triggers of column actions.
 */
export class ColumnReferenceOn implements ColumnReferenceOnInterface, ClonableInterface, SerializableInterface {
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
  toJSON() {
    return {
      trigger: this.trigger,
      action: this.action
    };
  }

  /**
   * Create a deep clone of this model.
   */
  clone() {
    return ColumnReferenceOn.fromObject(this);
  }
}
