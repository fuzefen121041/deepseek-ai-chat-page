// 媒体资源配置文件
// 在这里添加你的视频和图片信息

export const mediaList = {
  // 视频列表
  videos: [
    // 示例配置（取消注释后使用）：
    // {
    //   id: 1,
    //   title: '产品演示视频',
    //   description: '展示产品核心功能和使用方法',
    //   url: '/media/videos/demo.mp4',
    //   thumbnail: '/media/images/demo-thumb.jpg', // 可选：视频缩略图
    // },
    // {
    //   id: 2,
    //   title: '教程视频',
    //   description: '详细的使用教程和最佳实践',
    //   url: '/media/videos/tutorial.mp4',
    // },
  ],

  // 图片列表
  images: [
    // 示例配置（取消注释后使用）：
    // {
    //   id: 1,
    //   title: '产品截图',
    //   description: '应用主界面截图',
    //   url: '/media/images/screenshot1.png',
    // },
    // {
    //   id: 2,
    //   title: '架构图',
    //   description: '系统架构设计图',
    //   url: '/media/images/architecture.jpg',
    // },
  ]
}

// 使用说明：
// 1. 将视频文件放到 public/media/videos/ 目录
// 2. 将图片文件放到 public/media/images/ 目录
// 3. 在上面的数组中添加对应的配置信息
// 4. url 路径格式：/media/videos/文件名.mp4 或 /media/images/文件名.jpg
// 5. 每个媒体项必须有唯一的 id

// 导出辅助函数
export const getAllMedia = () => {
  return [...mediaList.videos, ...mediaList.images]
}

export const getVideos = () => {
  return mediaList.videos
}

export const getImages = () => {
  return mediaList.images
}
