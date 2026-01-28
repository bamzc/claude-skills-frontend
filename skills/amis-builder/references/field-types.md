# amis 字段类型配置

## 字段类型映射表

根据 `fieldType` 和 `fieldAttribute` 生成对应的 amis 组件配置。

| fieldType | fieldAttribute | 组件类型 | 说明 |
|-----------|---------------|---------|------|
| 1 | input-text | input-text | 文本输入 |
| 2 | input-number | input-number | 数字输入 |
| 3 | textarea | textarea | 多行文本 |
| 4 | select | select | 下拉选择 |
| 5 | input-date | input-date | 日期选择 |
| 6 | input-image | input-image | 图片上传 |
| 7 | input-file | input-file | 文件上传 |
| 8 | switch | switch | 开关 |
| 9 | input-city | input-city | 城市选择 |
| 10 | input-color | input-color | 颜色选择 |
| 11 | input-datetime | input-datetime | 日期时间选择 |
| 12 | input-date-range | input-date-range | 日期范围 |
| 13 | input-datetime-range | input-datetime-range | 日期时间范围 |
| 14 | tree-select | tree-select | 树形选择 |
| 15 | input-rich-text | input-rich-text | 富文本编辑器 |
| 16 | input-formula | input-formula | 公式编辑器 |
| 17 | json-editor | json-editor | JSON编辑器 |

## 组件配置模板

### input-text (文本输入)
```json
{
  "type": "input-text",
  "name": "username",
  "label": "用户名",
  "placeholder": "请输入内容",
  "required": false
}
```

### input-number (数字输入)
```json
{
  "type": "input-number",
  "name": "age",
  "label": "年龄",
  "placeholder": "请输入内容",
  "min": 0,
  "max": 120
}
```

### textarea (多行文本)
```json
{
  "type": "textarea",
  "name": "description",
  "label": "描述",
  "minRows": 3,
  "maxRows": 10
}
```

### input-rich-text (富文本)
```json
{
  "type": "input-rich-text",
  "name": "content",
  "label": "内容",
  "receiver": "/api/upload",
  "vendor": "tinymce"
}
```

### input-date (日期选择)
```json
{
  "type": "input-date",
  "name": "birthday",
  "label": "生日",
  "format": "YYYY-MM-DD",
  "inputFormat": "YYYY-MM-DD",
  "placeholder": "请选择日期"
}
```

### input-datetime (日期时间选择)
```json
{
  "type": "input-datetime",
  "name": "createdAt",
  "label": "创建时间",
  "format": "YYYY-MM-DD HH:mm:ss",
  "inputFormat": "YYYY-MM-DD HH:mm:ss",
  "placeholder": "请选择日期时间"
}
```

### input-date-range (日期范围)
```json
{
  "type": "input-date-range",
  "name": "dateRange",
  "label": "日期范围",
  "format": "YYYY-MM-DD",
  "inputFormat": "YYYY-MM-DD",
  "placeholder": "请选择日期范围",
  "clearable": true
}
```

### input-datetime-range (日期时间范围)
```json
{
  "type": "input-datetime-range",
  "name": "datetimeRange",
  "label": "日期时间范围",
  "format": "YYYY-MM-DD HH:mm:ss",
  "inputFormat": "YYYY-MM-DD HH:mm:ss",
  "placeholder": "请选择日期时间范围",
  "ranges": [
    "yesterday",
    "7daysago",
    "prevweek",
    "thismonth",
    "prevmonth",
    "prevquarter"
  ]
}
```

### select (下拉选择)
```json
{
  "type": "select",
  "name": "category",
  "label": "分类",
  "placeholder": "请选择",
  "searchable": true,
  "options": [
    {"label": "选项1", "value": "1"},
    {"label": "选项2", "value": "2"}
  ]
}
```

### select (下拉选择 - 接口数据源)
```json
{
  "type": "select",
  "name": "category",
  "label": "分类",
  "placeholder": "请选择",
  "searchable": true,
  "source": {
    "method": "get",
    "url": "/api/options"
  }
}
```

### tree-select (树形选择)
```json
{
  "type": "tree-select",
  "name": "department",
  "label": "部门",
  "placeholder": "请选择",
  "searchable": true,
  "multiple": false,
  "enableNodePath": false,
  "showIcon": true,
  "initiallyOpen": true,
  "source": {
    "method": "get",
    "url": "/api/departments"
  }
}
```

### switch (开关)
```json
{
  "type": "switch",
  "name": "enabled",
  "label": "启用",
  "option": "启用"
}
```

### input-city (城市选择)
```json
{
  "type": "input-city",
  "name": "city",
  "label": "城市",
  "placeholder": "请选择城市"
}
```

### input-color (颜色选择)
```json
{
  "type": "input-color",
  "name": "color",
  "label": "颜色"
}
```

### input-image (图片上传)
```json
{
  "type": "input-image",
  "name": "avatar",
  "label": "头像",
  "autoUpload": true,
  "proxy": true,
  "uploadType": "fileReceptor",
  "imageClassName": "r w-full",
  "receiver": "/api/upload",
  "multiple": false,
  "hideUploadButton": false,
  "fixedSize": false,
  "accept": ".jpeg,.jpg,.png,.gif"
}
```

### input-file (文件上传)
```json
{
  "type": "input-file",
  "name": "file",
  "label": "文件",
  "accept": "*",
  "btnLabel": "请选择文件",
  "receiver": "/api/upload",
  "maxLength": 1,
  "maxSize": 3145728,
  "hideUploadButton": false
}
```

### input-formula (公式编辑器)
```json
{
  "type": "input-formula",
  "name": "formula",
  "label": "公式",
  "variableMode": "tree",
  "evalMode": true,
  "variables": "${variables}",
  "required": false
}
```

### json-editor (JSON 编辑器)
```json
{
  "type": "json-editor",
  "name": "config",
  "label": "配置"
}
```

## 字段渲染逻辑

### 基础字段处理
```javascript
const commonObj = {
  name: fields.name,
  label: fields.displayName,
  required: !!fields.isRequired
}
```

### 根据 fieldType 选择组件
```javascript
// 根据 fieldAttribute 选择对应的组件类型
const formItemObj = formType[fields.fieldAttribute]
  ? formType[fields.fieldAttribute]
  : formType['input-text']

return { ...formItemObj, ...commonObj }
```

## 完整示例

输入字段：
```json
{
  "name": "username",
  "displayName": "用户名",
  "fieldType": 1,
  "fieldAttribute": "input-text",
  "isRequired": 1
}
```

输出配置：
```json
{
  "type": "input-text",
  "name": "username",
  "label": "用户名",
  "required": true,
  "placeholder": "请输入内容"
}
```
