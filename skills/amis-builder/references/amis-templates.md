# amis 页面模板参考

## 核心模板方法

提供常用的 amis 页面生成模式和最佳实践。

## 1. CRUD 页面模板

### 新增按钮模板

```json
{
  "type": "button",
  "label": "新增",
  "icon": "fa fa-plus-circle",
  "className": "inline-block text-primary",
  "onEvent": {
    "click": {
      "actions": [
        {
          "actionType": "dialog",
          "dialog": {
            "type": "dialog",
            "title": "新增",
            "size": "lg",
            "closeOnEsc": false,
            "closeOnOutside": false,
            "showCloseButton": true,
            "resizable": true,
            "body": [
              {
                "type": "form",
                "api": {
                  "method": "post",
                  "url": "/api/create"
                },
                "body": [
                  // 表单字段
                ]
              }
            ]
          }
        }
      ]
    }
  }
}
```

### 编辑按钮模板

```json
{
  "type": "button",
  "label": "编辑",
  "level": "link",
  "onEvent": {
    "click": {
      "actions": [
        {
          "actionType": "dialog",
          "dialog": {
            "type": "dialog",
            "title": "编辑",
            "size": "lg",
            "body": [
              {
                "type": "form",
                "initApi": {
                  "method": "get",
                  "url": "/api/get?id=${id}"
                },
                "api": {
                  "method": "put",
                  "url": "/api/update"
                },
                "body": [
                  // 表单字段
                ]
              }
            ]
          }
        }
      ]
    }
  }
}
```

### 删除按钮模板

```json
{
  "type": "button",
  "label": "删除",
  "level": "link",
  "className": "text-danger",
  "confirmText": "确认删除？",
  "onEvent": {
    "click": {
      "actions": [
        {
          "actionType": "ajax",
          "api": {
            "method": "delete",
            "url": "/api/delete?id=${id}"
          }
        }
      ]
    }
  }
}
```

### 完整 CRUD 页面模板

```json
{
  "type": "page",
  "body": [
    {
      "type": "crud",
      "api": {
        "method": "get",
        "url": "/api/list"
      },
      "headerToolbar": [
        {
          "type": "button",
          "label": "新增",
          "icon": "fa fa-plus-circle",
          "actionType": "dialog",
          "dialog": {
            "title": "新增",
            "size": "lg",
            "body": {
              "type": "form",
              "api": "/api/create",
              "body": []
            }
          }
        },
        "bulkActions",
        "filter-toggler",
        "reload"
      ],
      "columns": [
        {
          "name": "id",
          "label": "ID",
          "sortable": true
        },
        {
          "type": "operation",
          "label": "操作",
          "buttons": [
            {
              "type": "button",
              "label": "编辑",
              "level": "link",
              "actionType": "dialog",
              "dialog": {
                "title": "编辑",
                "body": {
                  "type": "form",
                  "initApi": "/api/get?id=${id}",
                  "api": "/api/update",
                  "body": []
                }
              }
            },
            {
              "type": "button",
              "label": "删除",
              "level": "link",
              "className": "text-danger",
              "confirmText": "确认删除？",
              "actionType": "ajax",
              "api": "delete:/api/delete?id=${id}"
            }
          ]
        }
      ]
    }
  ]
}
```

## 2. 表单模板

### 基础表单模板

```json
{
  "type": "form",
  "mode": "horizontal",
  "labelWidth": 112,
  "columnCount": 2,
  "api": {
    "method": "post",
    "url": "/api/create"
  },
  "body": [
    // 表单字段
  ]
}
```

### 带初始化数据的表单

```json
{
  "type": "form",
  "mode": "horizontal",
  "labelWidth": 112,
  "columnCount": 2,
  "initApi": {
    "method": "get",
    "url": "/api/get?id=${id}"
  },
  "api": {
    "method": "put",
    "url": "/api/update"
  },
  "body": [
    // 表单字段
  ]
}
```

## 3. 卡片模板

### 卡片列表模板

```json
{
  "type": "cards",
  "api": {
    "method": "get",
    "url": "/api/list"
  },
  "columnsCount": 3,
  "card": {
    "header": {
      "title": "${name}",
      "subTitle": "${description}"
    },
    "body": [
      {
        "label": "状态",
        "name": "status"
      }
    ],
    "actions": [
      {
        "type": "button",
        "label": "查看详情",
        "level": "link"
      }
    ]
  }
}
```

## 4. Tab 视图模板

### Tab 页面模板

```json
{
  "type": "tabs",
  "tabs": [
    {
      "title": "基本信息",
      "body": [
        {
          "type": "form",
          "body": []
        }
      ]
    },
    {
      "title": "详细信息",
      "body": [
        {
          "type": "form",
          "body": []
        }
      ]
    }
  ]
}
```

## 5. 关键配置说明

### Dialog vs Drawer

- **Dialog（对话框）**：`actionType: 'dialog'`
  - 适合：简单表单、确认操作
  - 尺寸：`size: "sm" | "md" | "lg" | "xl"`

- **Drawer（抽屉）**：`actionType: 'drawer'`
  - 适合：复杂表单、详情展示
  - 位置：`position: "left" | "right" | "top" | "bottom"`

### 表单布局

- **水平布局**：`mode: "horizontal"`
  - 标签在左，输入框在右
  - 配合 `labelWidth: 112` 设置标签宽度

- **多列布局**：`columnCount: 2`
  - 字段分多列显示
  - 适合字段较多的表单

### API 配置规范

```json
{
  "api": {
    "method": "post",
    "url": "/api/create",
    "data": {
      // 额外参数
    }
  }
}
```

### 事件绑定

```json
{
  "onEvent": {
    "click": {
      "actions": [
        {
          "actionType": "dialog",
          "dialog": {...}
        }
      ]
    }
  }
}
```

## 6. 常用模式总结

### 新增操作
1. 按钮触发 Dialog/Drawer
2. Dialog/Drawer 中包含 Form
3. Form 的 api 指向 create 接口

### 编辑操作
1. 按钮触发 Dialog/Drawer
2. Form 的 initApi 获取数据
3. Form 的 api 指向 update 接口

### 删除操作
1. 按钮触发 ajax 请求
2. 添加 confirmText 确认
3. api 指向 delete 接口

### 列表操作
1. CRUD 组件的 api 获取列表
2. headerToolbar 配置顶部按钮
3. columns 配置列和操作按钮
