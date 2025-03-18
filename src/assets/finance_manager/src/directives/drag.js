
export default {
    install(Vue) {
        Vue.directive('drag', {
            // 开始、更新、卸载
            inserted(el, binding, vnode) {
                // 0. 获取目标的class
                let selector = binding.value;
                if (!selector) throw new Error('必须传递容器的css选择器')
                let element = el.querySelector(selector)
                // 1. 让元素的corsor:grab  小手
                el.style.cursor = 'grab';
                // 禁止选中文字
                el.style.userSelect = 'none';

                // 处理元素的隐藏滚动条
                element.style.overflow = 'hidden';

                // 鼠标点击事件
                el.onmousedown = function (e) {
                    // x点位置
                    let start = e.clientX;// 852
                    // 上一轮的scrollLeft
                    let prevScrollLeft = element.scrollLeft;// 80
                    // 鼠标按下(document绑定是为了超出元素也能移动)
                    document.onmousemove = function (ee) {
                        // 当前的x点, 移动差距
                        let minus = start - ee.clientX;// 764 - 852 = 80
                        // 切换左边卷进去的部分, 先叠加上次的scrollLeft;
                        // 变更scollLeft
                        element.scrollLeft = prevScrollLeft + minus;
                    }
                    // 鼠标抬起 释放资源
                    document.onmouseup = function () {
                        document.onmouseup = document.onmousemove = null;
                    }
                }


            },
            unbind(el, binding) {
                // 释放资源
                el.onmousedown = null;
            }
        })
    }
}