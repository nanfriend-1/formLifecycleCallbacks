import { FieldTypeEnum } from "./constant";

// 字段配置项
export interface IConfigFormItem {
  // 字段类型
  type: FieldTypeEnum;
  // 字段唯一key
  key: string;
  // 字段默认值值
  value: any;
  // 单选字段的选项值
  options: any;
  // 字段描述
  description?: string;
  // 字段是否必填
  required: 0 | 1;
  // 字段对应的表单名称
  label: string;
  // 字段无值时的占位符
  placeholder?: string;
  // 字段的必填校验提示信息
  requiredMessage?: string;
  // 字段是否启用
  isEnabled: 0 | 1;
  // 子字段的配置信息
  children?: IConfigFormItem[];
}

export type BeforeFieldValueChange = (params: {
  value: any;
  field: IField;
  getFieldsValue: () => Record<string, any>;
}) => Promise<any>;

export interface IFormLifecycleCallbacks {
  beforeFieldValueChange?: BeforeFieldValueChange;
}

export type AfterFieldValueChange = (params: {
  changedKey: string;
  changedValue: any;
  field: IField;
}) => void;

export interface IField {
  fieldKey: string;
  setHiddenState: (hidden: boolean) => void;
  changeSelfValue: (value?: any) => void;
  setDisabledState: (disabled: boolean) => void;
  clearSelfValue: () => void;
}

export type OnFieldInit = (params: {
  initialValue?: Record<string, any>;
  field: IField;
}) => void;

export interface IFieldLifecycleCallbacks {
  onInit?: OnFieldInit;
  afterFieldValueChange?: AfterFieldValueChange;
}

export interface ILifecycleCallbacks {
  fields?: Record<string, IFieldLifecycleCallbacks>;
  form?: IFormLifecycleCallbacks;
}

export interface IFieldStore {
  hidden: boolean;
  disabled?: boolean;
}

export interface IParams<T = any> {
  key: string;
  fieldConfig: IConfigFormItem;
  changeSelfValue: (value?: T) => void;
  getSelfValue?: () => T;
  lifecycleCallbacks?: IFieldLifecycleCallbacks;
  initialValue?: Record<string, any>;
}