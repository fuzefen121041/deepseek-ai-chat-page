import React from 'react';
import './HomeWork.css';

const HomeWork = () => {
  // \pnh
  const homeworks = [
    {
      id: 1,
      title: '2025-11-08作业-前端和Woker通信',
      linkArr: [
        {
            title: 'AI 聊天页面',
            url: 'https://deepseek-ai-chat-page.pages.dev/'
        },
        {
            title: '前端地址',
            url: 'https://github.com/fuzefen121041/deepseek-ai-chat-page'
        },
        {
            title: '后端地址',
            url: 'https://github.com/fuzefen121041/deepseek-ai-chat-serverless'
        },
      ],
      image: [
        {
            title: 'MCP截图',
            src: '/media/images/MCP.png',
        }
      ],
      video: 'https://example.com/video1'
    },
  ];

  return (
    <div className="homework-container">
      <h1>�\</h1>

      {homeworks.map((hw) => (
        <div key={hw.id} className="homework-item">
          <h2>{hw.title}</h2>

          {/* \�� */}
          <div className="homework-link">
            {hw.linkArr.map((link, index) => (
                <div key={index} className="link-item">
                    <h3>{link.title}</h3>
                    <a href={link.url} target="_blank">
                        {link.url}
                    </a>
                </div>
            ))}
          </div>

          {/* \�G */}
          <div className="homework-image">
            {
                hw.image.map((img, index) => (
                    <div key={index} className="image-item">
                        <h3>{img.title}</h3>
                        <img src={img.src} alt={img.title} />
                    </div>
                ))
            }
          </div>

          {/* U6Ƒ�� */}
          <div className="homework-video">
            <a href={hw.video} target="_blank" rel="noopener noreferrer">
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeWork;
