import { UseBoundStore, StoreApi, create } from 'zustand';
import { FieldTypeEnum } from "../constant";
import { IConfigFormItem, IField, IFieldLifecycleCallbacks, IFieldStore, IParams } from "../type";

export class FieldModel<T = any> {
  key: string; // 字段key值，唯一性

  public store: UseBoundStore<StoreApi<IFieldStore>>; // 字段的store状态存储

  private lifecycleCallbacks: IFieldLifecycleCallbacks = {}; // 字段特定生命周期阶段触发的回调函数集合

  private readonly DEFAULT_STORE: IFieldStore = { // store的默认值
    hidden: false,
    disabled: false,
  };

  private fieldConfig: IConfigFormItem; // 字段的配置项

  private changeSelfValue: (value?: T) => void; // 修改字段本身的值

  private get field(): IField { // 获取字段所有数据
    return {
      fieldKey: this.key,
      setHiddenState: this.setHiddenState,
      changeSelfValue: this.changeSelfValue,
      clearSelfValue: this.clearSelfValue,
      setDisabledState: this.setDisabledState,
    };
  }

  public constructor({
    key,
    fieldConfig,
    changeSelfValue,
    lifecycleCallbacks,
    initialValue,
  }: IParams<T>) {
    this.key = key;
    this.fieldConfig = fieldConfig;
    this.store = create<IFieldStore>(() => this.DEFAULT_STORE);
    this.changeSelfValue = changeSelfValue;
    this.registerLifeCycle(lifecycleCallbacks);
    lifecycleCallbacks?.onInit?.({
      initialValue,
      field: this.field,
    });
  }

  public setHiddenState = (hidden: boolean) => {
    this.store.setState({ hidden });
  };

  public setDisabledState = (disabled: boolean) => {
    this.store.setState({ disabled });
  };

  // 获取当前字段type
  public getFieldType = (): FieldTypeEnum => {
    return this.fieldConfig.type;
  };

  // 更新字段特定生命周期阶段触发的回调函数集合
  public registerLifeCycle = (callbacks?: IFieldLifecycleCallbacks): void => {
    this.lifecycleCallbacks = callbacks || {};
  };

  // 清空当前字段值
  private clearSelfValue = (): void => {
    this.changeSelfValue(undefined);
  };

  // 字段值更改后的回调
  afterValueChange = (key: string, value: any) => {
    if (this.lifecycleCallbacks.afterFieldValueChange) {
      this.lifecycleCallbacks.afterFieldValueChange({
        changedKey: key,
        changedValue: value,
        field: this.field,
      });
    }
  };
}
