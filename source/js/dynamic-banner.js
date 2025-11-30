// 动态设置文章和首页的banner图片
(function() {
  'use strict';
  
  const DEFAULT_BANNER = '/img/桃夭笑.jpg';
  
  // 获取文章的封面图
  function getPostCoverImage() {
    // 方法1: 从首页封面图获取
    const indexImg = document.querySelector('.index-img img[src*="/img/"]');
    if (indexImg && indexImg.src && !indexImg.src.includes('loading.gif')) {
      return indexImg.src;
    }
    
    // 方法2: 从meta标签获取
    const metaCover = document.querySelector('meta[property="og:image"]');
    if (metaCover && metaCover.content && metaCover.content.includes('/img/')) {
      return metaCover.content;
    }
    
    // 方法3: 从文章内容第一张图片获取
    const firstImg = document.querySelector('.markdown-body img, .post-content img, article img');
    if (firstImg && firstImg.src && firstImg.src.includes('/img/')) {
      return firstImg.src;
    }
    
    return null;
  }
  
  // 设置文章页面的banner图片
  function setPostBanner() {
    if (!document.body.classList.contains('post')) {
      return;
    }
    
    const banner = document.querySelector('#banner.banner');
    if (!banner) return;
    
    const coverImg = getPostCoverImage();
    const bannerImg = coverImg || DEFAULT_BANNER;
    
    // 设置背景图片
    if (banner.style) {
      banner.style.background = `url(${bannerImg}) no-repeat center center`;
      banner.style.backgroundSize = 'cover';
    }
  }
  
  // 设置首页的banner图片（使用第一篇文章的封面图）
  function setIndexBanner() {
    if (!document.body.classList.contains('index')) {
      return;
    }
    
    const firstPostImg = document.querySelector('.index-card:first-child .index-img img');
    if (!firstPostImg) return;
    
    let coverImg = null;
    if (firstPostImg.src && !firstPostImg.src.includes('loading.gif')) {
      coverImg = firstPostImg.src;
    }
    
    const banner = document.querySelector('#banner.banner');
    if (banner && coverImg) {
      const bannerImg = coverImg || DEFAULT_BANNER;
      
      if (banner.style) {
        banner.style.background = `url(${bannerImg}) no-repeat center center`;
        banner.style.backgroundSize = 'cover';
      }
    }
  }
  
  // 页面加载完成后执行
  function init() {
    // 等待图片加载完成
    setTimeout(function() {
      setPostBanner();
      setIndexBanner();
    }, 1000);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 监听图片加载
  window.addEventListener('load', function() {
    setTimeout(function() {
      setPostBanner();
      setIndexBanner();
    }, 500);
  });
})();

