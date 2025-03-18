import { formatDate } from '@/utils'
import { dataMap } from '@/conf/filters'
export default {
    convertDate: (val, propName) => {
        return formatDate(val);
    },
    common: (val, propName) => {
        if (!propName) throw new Error('common过滤器，必须传递参数:' + Object.keys(dataMap).join(','))
        return dataMap[propName][val];
    }
}