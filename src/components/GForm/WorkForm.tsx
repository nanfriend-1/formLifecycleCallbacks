import { Form, FormInstance, FormProps } from "antd";
import { IConfigFormItem, ILifecycleCallbacks } from "./type";
import { useCallback, useMemo, useRef } from "react";
import { FormModel } from "./Model/FormModel";
import { formModelContext } from "./context";

type IProps = {
  children: React.ReactNode; // 表单字段组
  formInstance: FormInstance; // 表单实例
  itemsConfig: IConfigFormItem[]; // 表单字段配置项
  lifecycleCallbacks: ILifecycleCallbacks; // 不同生命周期的回调函数
  initialValues?: Record<string, any>; // 表单初始值
} & Pick<
  FormProps,
  'onValuesChange' // 表单值更新方法
>;

// 基于formModel封装的自定义的表单组件
export default function WorkForm(props: IProps) {
  const {
    children,
    onValuesChange,
    formInstance,
    lifecycleCallbacks,
    initialValues,
  } = props;

  const formModelRef = useRef<FormModel | null>(null);

  // 初始化formModel的实例并保存到变量中
  useMemo(() => {
    formModelRef.current = new FormModel({
      fieldsConfig: props.itemsConfig,
      formInstance,
      lifecycleCallbacks: lifecycleCallbacks.fields,
      initialValues,
    });
  }, [
    lifecycleCallbacks,
    formInstance,
    initialValues,
    props.itemsConfig,
  ]);

  const handleValuesChange: FormProps['onValuesChange'] = useCallback(
    (changedValues: Record<string, any>, values: Record<string, any>) => {
      Object.entries(changedValues).forEach(([key, value]) => {
        // 遍历所有字段，执行每个字段的afterValueChange方法
        formModelRef.current?.onFormValueChange(key, value);
      });
      onValuesChange?.(changedValues, values);
    },
    [onValuesChange],
  );

  return (
    <formModelContext.Provider value={formModelRef.current}>
      <Form
        onValuesChange={handleValuesChange}
        form={formInstance}
        initialValues={initialValues}
      >
        {children}
      </Form>
    </formModelContext.Provider>
  );
}