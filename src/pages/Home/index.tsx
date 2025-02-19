import React, { useMemo } from "react";
import { useForm } from "antd/es/form/Form";

import "./index.css";
import {
  IConfigFormItem,
  ILifecycleCallbacks,
} from "../../components/GForm/type";
import WorkForm from "../../components/GForm/WorkForm";
import { detailFormFieldsLifecycleCallbacks } from "../../components/GForm/Model/lifeCycleCallbacks/detailForm";
import { WorkFormItem } from "../../components/GForm/WorkFormItem";
const Home: React.FC = () => {
  const [form] = useForm();

  const itemsConfig = useMemo(() => {
    const configs = [
      {
        type: "INPUT",
        key: "name",
        value: null,
        options: null,
        required: 1,
        label: "名称",
        isEnabled: 1,
      },
      {
        type: "INPUT",
        key: "age",
        value: null,
        options: null,
        required: 1,
        label: "年龄",
        isEnabled: 1,
      },
    ] as IConfigFormItem[];
    return configs;
  }, []);

  const lifecycleCallbacks: ILifecycleCallbacks = useMemo(
    () => ({
      fields: detailFormFieldsLifecycleCallbacks,
    }),
    []
  );

  return (
    <div>
      <div style={{ width: "400px", height: "200px", padding: '20px' }}>
        <WorkForm
          formInstance={form}
          itemsConfig={itemsConfig}
          initialValues={{
            name: "史努比",
            age: 12,
          }}
          lifecycleCallbacks={lifecycleCallbacks}
        >
          {itemsConfig.map((item) => (
            <WorkFormItem
              key={item.key}
              item={item}
              formContext={form}
            />
          ))}
        </WorkForm>
      </div>
    </div>
  );
};

export default Home;
