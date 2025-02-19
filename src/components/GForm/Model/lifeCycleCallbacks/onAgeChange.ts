import { AfterFieldValueChange } from "../../type";

// 字段key为age的更改联动
const onAgeChange: AfterFieldValueChange = ({
  changedKey,
  changedValue: value,
  field: { setHiddenState, clearSelfValue, changeSelfValue },
}) => {
  if (changedKey === 'name') {
    if (!value) {
      clearSelfValue();
      setHiddenState(true);
    } else {
      setHiddenState(false);
      if(value === '酸酸'){
        changeSelfValue(6);
      }else if(value === '臭臭'){
        changeSelfValue(5);
      }
    }
  }
};

export default onAgeChange;
