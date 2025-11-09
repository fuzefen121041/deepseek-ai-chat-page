# 媒体资源库使用指南

## 功能概述

媒体资源库是一个用于展示和管理视频、图片资源的页面，提供了：
- 分类浏览（全部、视频、图片）
- 搜索功能
- 预览功能
- 响应式设计

## 目录结构

```
react-frontend/
├── public/
│   └── media/           # 静态资源目录
│       ├── videos/      # 视频文件存放目录
│       ├── images/      # 图片文件存放目录
│       └── README.md    # 目录说明
├── src/
│   ├── pages/
│   │   ├── ChatPage.jsx      # AI 聊天页面
│   │   ├── ChatPage.css
│   │   ├── MediaGallery.jsx  # 媒体库页面
│   │   └── MediaGallery.css
│   ├── components/
│   │   └── Navigation.jsx    # 导航栏组件
│   └── data/
│       └── mediaList.js      # 媒体资源配置文件
```

## 如何添加媒体资源

### 步骤 1：添加文件

将你的媒体文件放到对应目录：
- 视频文件 → `public/media/videos/`
- 图片文件 → `public/media/images/`

**支持的文件格式：**
- 视频：MP4、WebM、OGG
- 图片：JPG、PNG、GIF、WebP

### 步骤 2：配置资源信息

打开 `src/data/mediaList.js`，添加资源配置：

```javascript
export const mediaList = {
  videos: [
    {
      id: 1,  // 唯一标识符
      title: '我的视频标题',
      description: '视频描述信息',
      url: '/media/videos/my-video.mp4',  // 文件路径
      thumbnail: '/media/images/video-thumb.jpg'  // 可选：视频缩略图
    },
  ],
  images: [
    {
      id: 1,
      title: '我的图片标题',
      description: '图片描述信息',
      url: '/media/images/my-image.jpg'
    },
  ]
}
```

**重要提示：**
- 每个资源必须有唯一的 `id`
- `url` 路径格式：`/media/类型/文件名`
- `thumbnail` 是可选的，用于视频预览图

### 步骤 3：访问媒体库

启动开发服务器：
```bash
npm run dev
```

点击导航栏的"媒体库"按钮，即可查看你添加的资源。

## 功能说明

### 1. 分类筛选
- **全部**：显示所有视频和图片
- **视频**：仅显示视频资源
- **图片**：仅显示图片资源

### 2. 搜索功能
在搜索框中输入关键词，可以搜索标题和描述中包含该关键词的资源。

### 3. 预览功能
点击任意媒体卡片，会弹出预览窗口：
- 视频会自动播放
- 图片会以大图展示
- 显示完整的标题、描述和链接

### 4. 查看链接
每个媒体卡片上都有"查看链接"按钮，点击可以在新标签页打开资源。

## 路由说明

- `/` - AI 聊天页面
- `/media` - 媒体资源库页面

## 示例配置

```javascript
export const mediaList = {
  videos: [
    {
      id: 1,
      title: '产品演示',
      description: '完整的产品功能演示视频',
      url: '/media/videos/demo.mp4',
      thumbnail: '/media/images/demo-thumb.jpg'
    },
    {
      id: 2,
      title: '使用教程',
      description: '从入门到精通的详细教程',
      url: '/media/videos/tutorial.mp4'
    }
  ],
  images: [
    {
      id: 1,
      title: '主界面',
      description: '应用主界面截图',
      url: '/media/images/main-screen.png'
    },
    {
      id: 2,
      title: '系统架构',
      description: '完整的系统架构设计图',
      url: '/media/images/architecture.jpg'
    }
  ]
}
```

## 常见问题

### Q: 为什么我添加的资源没有显示？
A: 请检查：
1. 文件是否正确放在 `public/media/` 目录下
2. `mediaList.js` 中的配置是否正确
3. `url` 路径是否以 `/media/` 开头
4. 是否给每个资源分配了唯一的 `id`

### Q: 视频不能播放怎么办？
A:
1. 确保视频格式是浏览器支持的（推荐 MP4）
2. 检查文件路径是否正确
3. 可以添加 `thumbnail` 缩略图作为预览

### Q: 如何删除资源？
A:
1. 从 `public/media/` 目录删除文件
2. 从 `src/data/mediaList.js` 中删除对应的配置项

## 技术栈

- React 18
- React Router v6
- Framer Motion（动画）
- Vite（构建工具）

## 开发说明

如需自定义页面样式，可以编辑：
- `src/pages/MediaGallery.css` - 媒体库页面样式
- `src/components/Navigation.css` - 导航栏样式
