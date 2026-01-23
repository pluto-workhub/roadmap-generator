/**
 * 主题配置系统
 * 定义 4 个主题：default, tech-blue, vibrant-orange, dark-night
 */

export const themes = {
  default: {
    name: '默认主题',
    colors: {
      planning: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600' },
      warning: { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-800', icon: 'text-amber-600' },
      success: { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-800', icon: 'text-emerald-600' },
      danger: { bg: 'bg-rose-100', border: 'border-rose-500', text: 'text-rose-800', icon: 'text-rose-600' },
      info: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600' },
      header: { bg: 'bg-gradient-to-r from-slate-800 to-slate-900', text: 'text-white' },
      alert: {
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
        danger: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-800' },
        info: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800' }
      },
      infoBlock: {
        indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800' },
        orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800' }
      }
    }
  },
  'tech-blue': {
    name: '科技蓝',
    colors: {
      planning: { bg: 'bg-cyan-100', border: 'border-cyan-500', text: 'text-cyan-800', icon: 'text-cyan-600' },
      warning: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600' },
      success: { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-800', icon: 'text-teal-600' },
      danger: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', icon: 'text-red-600' },
      info: { bg: 'bg-sky-100', border: 'border-sky-500', text: 'text-sky-800', icon: 'text-sky-600' },
      header: { bg: 'bg-gradient-to-r from-blue-700 to-cyan-600', text: 'text-white' },
      alert: {
        warning: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
        danger: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800' },
        info: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-800' }
      },
      infoBlock: {
        indigo: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-800' },
        orange: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800' }
      }
    }
  },
  'vibrant-orange': {
    name: '活力橙',
    colors: {
      planning: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800', icon: 'text-orange-600' },
      warning: { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-800', icon: 'text-amber-600' },
      success: { bg: 'bg-lime-100', border: 'border-lime-500', text: 'text-lime-800', icon: 'text-lime-600' },
      danger: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', icon: 'text-red-600' },
      info: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', icon: 'text-yellow-600' },
      header: { bg: 'bg-gradient-to-r from-orange-600 to-amber-500', text: 'text-white' },
      alert: {
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
        danger: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800' },
        info: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800' }
      },
      infoBlock: {
        indigo: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800' },
        orange: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-800' }
      }
    }
  },
  'dark-night': {
    name: '暗夜黑',
    colors: {
      planning: { bg: 'bg-slate-700', border: 'border-slate-500', text: 'text-slate-200', icon: 'text-slate-300' },
      warning: { bg: 'bg-gray-700', border: 'border-gray-500', text: 'text-gray-200', icon: 'text-gray-300' },
      success: { bg: 'bg-green-800', border: 'border-green-600', text: 'text-green-200', icon: 'text-green-300' },
      danger: { bg: 'bg-red-900', border: 'border-red-700', text: 'text-red-200', icon: 'text-red-300' },
      info: { bg: 'bg-blue-800', border: 'border-blue-600', text: 'text-blue-200', icon: 'text-blue-300' },
      header: { bg: 'bg-gradient-to-r from-gray-900 to-black', text: 'text-white' },
      alert: {
        warning: { bg: 'bg-gray-800', border: 'border-gray-600', text: 'text-gray-200' },
        danger: { bg: 'bg-red-900', border: 'border-red-700', text: 'text-red-200' },
        info: { bg: 'bg-slate-800', border: 'border-slate-600', text: 'text-slate-200' }
      },
      infoBlock: {
        indigo: { bg: 'bg-slate-800', border: 'border-slate-600', text: 'text-slate-200' },
        orange: { bg: 'bg-gray-800', border: 'border-gray-600', text: 'text-gray-200' }
      }
    }
  }
}

/**
 * 获取主题颜色配置
 */
export const getThemeColors = (themeName = 'default') => {
  return themes[themeName] || themes.default
}

/**
 * 获取状态对应的颜色
 */
export const getStatusColors = (status, themeName = 'default') => {
  const theme = getThemeColors(themeName)
  const statusMap = {
    planning: theme.colors.planning,
    warning: theme.colors.warning,
    success: theme.colors.success,
    danger: theme.colors.danger,
    info: theme.colors.info
  }
  return statusMap[status] || theme.colors.planning
}

/**
 * 获取警告块颜色
 */
export const getAlertColors = (variant, themeName = 'default') => {
  const theme = getThemeColors(themeName)
  return theme.colors.alert[variant] || theme.colors.alert.warning
}

/**
 * 获取信息块颜色
 */
export const getInfoBlockColors = (variant, themeName = 'default') => {
  const theme = getThemeColors(themeName)
  return theme.colors.infoBlock[variant] || theme.colors.infoBlock.indigo
}
