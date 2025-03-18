
import Vue from 'vue';
function reactiveAddValue(arr, k, v) {

    arr.forEach(row => {
        row.forEach(item => {
            if (item.key === k) {
                Vue.set(item, 'value', v);
            }
        })
    })
}
export const addDefaultValueByData = (row, conf) => {
    const { fields, cards } = conf;
    for (let key in row) {
        let value = row[key];
        if (fields) {
            reactiveAddValue(fields, key, value);
        }
        if (cards) {
            cards.forEach(card => {
                reactiveAddValue(card.items, key, value);
            })
        }
    }
}