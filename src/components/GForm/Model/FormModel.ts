import { FormInstance } from 'antd';
import { IConfigFormItem, IFieldLifecycleCallbacks } from '../type';
import { FieldModel } from './FieldModel';

export class FormModel {
  private fields: Record<string, FieldModel> = {}; // 私有属性，表单字段

  constructor(params: {
    fieldsConfig: IConfigFormItem[]; // 字段配置项
    formInstance: FormInstance; // 表单实例
    lifecycleCallbacks?: Record<string, IFieldLifecycleCallbacks>; // 表单特定生命周期阶段触发的回调函数集合
    initialValues?: Record<string, any>; // 表单默认值
  }) {
    const {
      fieldsConfig,
      lifecycleCallbacks,
      formInstance,
      initialValues,
    } = params;

    // 根据字段配置项获取每个字段的fieldModel
    fieldsConfig.forEach(fieldConfig => {
      const field = new FieldModel({
        key: fieldConfig.key,
        fieldConfig,
        changeSelfValue: (value:any) => {
          formInstance.setFieldsValue({
            [fieldConfig.key]: value,
          });
        },
        lifecycleCallbacks: lifecycleCallbacks?.[fieldConfig.key],
        initialValue: initialValues,
      });
      // 将fieldModel存入表单字段中
      this.fields[fieldConfig.key] = field;
    });
  }

  // 通过字段的key获取fieldModel
  getFieldModelByKey(key: string): FieldModel {
    return this.fields[key];
  }

  // 表单值更改的回调函数，遍历表单字段，挨个执行afterValueChange方法
  onFormValueChange(key: string, value: any): void {
    Object.values(this.fields).forEach(field => {
      field?.afterValueChange(key, value);
    });
  }
}
