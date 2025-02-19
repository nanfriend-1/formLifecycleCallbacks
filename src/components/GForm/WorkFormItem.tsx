import { FC, useMemo } from "react";
import { useFormModel } from "./context";
import { IConfigFormItem } from "./type";
import { Form, FormInstance, Input } from "antd";
import { useStore } from "zustand";

export const WorkFormItem: FC<{
  item: IConfigFormItem;
  formContext: FormInstance;
}> = (props) => {
  const { item } = props;

  const formModel = useFormModel();
  const fieldModel = formModel?.getFieldModelByKey(item.key);

  const store = useMemo(() => fieldModel!.store, [fieldModel]);

  const { hidden, disabled } = useStore(store);

  const { key, label, required, requiredMessage, placeholder } = item;

  const rules = useMemo(
    () => [
      {
        required: required === 1,
        message: requiredMessage ?? "请填写必填项",
      },
    ],
    [required, requiredMessage]
  );

  return (
    <Form.Item label={label} rules={rules} hidden={hidden} name={key}>
      <Input disabled={disabled} placeholder={placeholder ?? "请输入"} />
    </Form.Item>
  );
};
