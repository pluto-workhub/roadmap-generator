/**
 * 默认示例数据
 */
export const defaultRoadmapData = {
  meta: {
    title: "产品开发路线图",
    subtitle: "Product Development Roadmap 2026 Q1",
    theme: "default",
    legend: [
      { label: "内测阶段", color: "amber" },
      { label: "正式上线", color: "emerald" },
      { label: "迭代开发", color: "blue" }
    ]
  },
  milestones: [
    {
      id: "m1",
      date: "2026.01.28",
      title: "用户内测开启",
      description: "Internal Beta Testing",
      status: "warning",
      icon: "fa-flask",
      blocks: [
        {
          id: "b1",
          type: "list",
          title: "用户手册功能覆盖",
          icon: "fa-book-open",
          items: [
            { text: "活动/商品创建", icon: "fa-check" },
            { text: "活动/商品 OA 审批流", icon: "fa-check" },
            { text: "任务管理系统", icon: "fa-check" },
            { text: "信息看板 (Dashboard) 数据查看", icon: "fa-check" },
            { text: "会员管理", icon: "fa-check" },
            { text: "商品状态变更", icon: "fa-check" }
          ]
        },
        {
          id: "b2",
          type: "alert",
          variant: "warning",
          icon: "fa-circle-exclamation",
          title: "待定项：",
          content: "微信直接登录功能。",
          subtitle: "取决于小程序审核是否通过。"
        }
      ]
    },
    {
      id: "m2",
      date: "2026.02.09",
      title: "V1.0 版本上线",
      description: "Official Launch",
      status: "success",
      icon: "fa-rocket",
      blocks: [
        {
          id: "b3",
          type: "section",
          title: "包含所有内测功能"
        },
        {
          id: "b4",
          type: "list",
          title: "新增核心功能",
          icon: "fa-link",
          items: []
        },
        {
          id: "b5",
          type: "complex-list",
          items: [
            {
              icon: "fa-tiktok",
              iconBg: "blue",
              title: "链接抖音号/公众号",
              description: "需重新设计链接页面（二维码形式）"
            },
            {
              icon: "fa-database",
              iconBg: "purple",
              title: "数据与商品导入",
              description: "历史数据迁移与初始化"
            },
            {
              icon: "fa-server",
              iconBg: "orange",
              title: "生产环境搭建 (AliCloud)",
              description: "Ali OSS 图片上传对接 | API 健康检查与报警系统"
            }
          ]
        }
      ]
    },
    {
      id: "m3",
      date: "2026.02.10 - 03.03",
      title: "下一阶段迭代",
      description: "Next Scope Development",
      status: "info",
      icon: "fa-code",
      blocks: [
        {
          id: "b6",
          type: "section",
          title: "商城与交易"
        },
        {
          id: "b7",
          type: "list",
          title: "",
          icon: "",
          items: [
            { text: "订单/商城功能完善", icon: "fa-credit-card" },
            { text: "法币支付测试", icon: "fa-yen-sign" },
            { text: "订单状态跟踪", icon: "fa-truck-fast" },
            { text: "C端页面集成", icon: "fa-mobile-screen" }
          ]
        },
        {
          id: "b8",
          type: "section",
          title: "运营与核销"
        },
        {
          id: "b9",
          type: "list",
          title: "",
          icon: "",
          items: [
            { text: "赞助商功能", icon: "fa-handshake" },
            { text: "线下核销系统", icon: "fa-qrcode" }
          ]
        },
        {
          id: "b10",
          type: "alert",
          variant: "danger",
          icon: "fa-id-card",
          title: "用户实名登记",
          badge: "前置依赖",
          content: "必须在票星球对接前完成，否则将阻塞对接流程。"
        },
        {
          id: "b11",
          type: "info",
          variant: "indigo",
          icon: "fa-ticket",
          title: "积分与票星球对接",
          badge: "6周周期",
          date: "2月10日 - 3月17日",
          description: "依赖于俱乐部与票星球的推动效率。"
        },
        {
          id: "b12",
          type: "tbd",
          variant: "orange",
          icon: "fa-file-invoice",
          title: "上传票根获积分重构",
          content: "需求待确认：需获取小票详细内容，以及是否有唯一二维码用于防重复扫描判断。"
        }
      ]
    }
  ]
}
