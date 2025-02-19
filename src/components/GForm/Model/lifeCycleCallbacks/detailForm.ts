import { LinkedFieldKey } from '../../constant';
import { IFieldLifecycleCallbacks } from '../../type';
import onAgeChange from './onAgeChange';
import onAgeInit from './onAgeInit';

export const detailFormFieldsLifecycleCallbacks: Partial<
  Record<LinkedFieldKey, IFieldLifecycleCallbacks>
> = {
  age: {
    onInit: onAgeInit,
    afterFieldValueChange: onAgeChange,
  },
};
