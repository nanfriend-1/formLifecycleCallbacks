import { OnFieldInit } from "../../type";

// 字段key为age的初始化联动
const onAgeInit: OnFieldInit = ({
  initialValue,
  field,
}) => {
  const { setHiddenState } = field;
  if (!initialValue?.name) {
    setHiddenState(true);
  }
};

export default onAgeInit;
