<!--<template>
  <div>
    <div v-if="config.cards">
      <el-input v-if="type==='text'"></el-input>
      <el-select v-else-if="type==='select'"></el-select>
    </div>
    <div v-else-if="!config.cards">
      <el-input v-if="type==='text'"></el-input>
      <el-select v-else-if="type==='select'"></el-select>
    </div>
  </div>
  一次性传递到位外部属性
  <el-xxx v-bind="配置对象"></el-xxx>
   template重点在于html+js的输出，强化的是html 
   JSX重点在于 XML(html)+js的输出, 强化的是js
</template>
-->

<script>
import { TEXT, PASSWORD, TEXTAREA, SELECT, RADIO } from "@/conf/form";
import { deepClone } from "@/utils";
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  name: "GFormCreator",
  data() {
    return {
      formData: {}
    };
  },
  created() {
    const { fields, cards,rules } = this.config;
    if (cards)
      cards.forEach(card => {
        this.bindProps(card.items);
      });
    if (fields) this.bindProps(fields);

    if (!fields && !cards)throw new Error('config传递的字段必须位cards或者fields')

    if (rules) {
      for(let k in rules) {
        rules[k].forEach(rule=>{
          if (rule.validator) {
            rule.validator = rule.validator.bind(this);
          }
        })
      }
    }


  },
  methods: {
    bindProps(items) {
      items.forEach(rowArr => {
        rowArr.forEach(item => {
          // this.formData[item.key] = item.value; // 响应式?1:2
          this.$set(this.formData, item.key, item.value);
        });
      });
    },
    renderFormItem(item) {
      switch (item.type) {
        case TEXT:
        case PASSWORD:
        case TEXTAREA:
          return (
            <el-input
              onInput={v => (this.formData[item.key] = v)}
              value={this.formData[item.key]}
              type={item.type}
              attrs={item.attrs}
            ></el-input>
          );
        case SELECT:
          return (
            <el-select v-model={this.formData[item.key]} attrs={item.attrs}>
              {/*保持原生属性⬆传递的入口 */}
              {item.options.map(opt => {
                return (
                  <el-option label={opt.text} value={opt.value}></el-option>
                );
              })}
            </el-select>
          );
        case "date":
          return (
            <el-date-picker
              v-model={this.formData[item.key]}
              attrs={item.attrs}
            ></el-date-picker>
          );
        case "radio":
          return (
            <el-radio-group
              v-model={this.formData[item.key]}
              attrs={item.attrs}>
              { 
                  item.radios.map(radio=>{
                    return <el-radio label={radio.label}>{radio.text}</el-radio>
                  })

               }

            </el-radio-group>
          );
      }
    },
    renderColumns(columns) {
      return columns.map(col => {
        return (
          <el-col span={col.colspan || Math.round(24 / columns.length)}>
            <el-form-item label={col.label} prop={col.key}>
              {this.renderFormItem(col)}
            </el-form-item>
          </el-col>
        );
      });
    },
    renderItems(items) {
      return items.map(rowArr => {
        return <el-row>{this.renderColumns(rowArr)}</el-row>;
      });
    },
    renderCards(cards) {
      return cards.map(card => {
        return (
          <el-card header={card.title}>{this.renderItems(card.items)}</el-card>
        );
      });
    },
    // 判断是否包含卡片或者普通渲染
    renderCardOrItems(items) {
      if (Array.isArray(items)) {
        return this.renderItems(items);
      } else {
        return this.renderCards(items.cards);
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("submit", this.getData());
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    renderBtn() {
      // 判断是否传递了 插槽
      const { default: defaultSlot } = this.$scopedSlots;
      if (defaultSlot) {
        return defaultSlot({ innerValue: "组件内部回传的" });
      } else {
        return (
          <div>
            <el-button type="primary" onClick={this.submitForm}>
              提交
            </el-button>
            <el-button onClick={this.resetForm}>重置</el-button>
          </div>
        );
        return (
          <el-button onClick={e => this.$emit("submit", this.getData())}>
            提交
          </el-button>
        );
      }
    },
    getData() {
      // JSON.parse(JSON.stringify()); // 丢失新属性和fn
      // _.deepclone();// 增加项目包的大小
      // 好不好? 1:2
      return deepClone(this.formData);
    }
  },
  render(h) {
    const { fields: items, cards, rules,labelDisable } = this.config;
    let attrs = { model: this.formData,labelWidth:'80px' };
    if (labelDisable) {
      // delete attrs.labelWidth;
      Reflect.deleteProperty(attrs,'labelWidth')
    }
    // 如果fields是一个数组
    return (
      <div>
        <el-form
          ref="form"
          rules={ rules }
          attrs={ attrs }
        >
          {cards ? this.renderCards(cards) : this.renderItems(items)}
        </el-form>
        {this.renderBtn()}
      </div>
    );

    const num = 9999;
    return (
      <h1>
        <h2>{num}</h2>
      </h1>
    );

    return h("h1", {}, [h("h2", {}, "大家好")]);
  }
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 100%;
}
.el-card {
  margin: 10px;
}
</style>